require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
const serialize = require('serialize-javascript');

app.use('/public', express.static(path.join(__dirname, 'public')));

let renderer;

if (process.env.NODE_ENV === 'production') {
  let bundle = fs.readFileSync('./dist/node.bundle.js', 'utf8'); //load bundle
  renderer = require('vue-server-renderer').createBundleRenderer(bundle); //renderer will be defined
  app.use('/dist', express.static(path.join(__dirname, 'dist'))); //need to make whole dist folder available to the browser; make static folder, 
  //when browser is looking for web bundle, it's able to find it
}

let events =
  [
    { description: 'Random event 1', date: moment('2018-09-12', 'YYYY-MM-DD') },
    { description: 'Random event 2', date: moment('2018-09-13', 'YYYY-MM-DD') },
    { description: 'Random event 3', date: moment('2018-10-16', 'YYYY-MM-DD') }
  ];

let contentMarker = '<!--APP-->';

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  if (renderer) {
    renderer.renderToString({ events }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(template.replace(contentMarker, `<script>var __INITIAL_STATE__ = ${serialize(events)}</script>\n${html}`));//html is what we've generated with our server-side renderer
      }
    });
  } else {
    res.send('<p>Loading...</p><script src="/reload/reload.js"></script>') //need to ues reload module so don't have to reload the page after compilation
  }

});


app.use(require('body-parser').json());
app.post('/add_event', (req, res) => {
  events.push({
    description: req.body.description,
    date: moment(req.body.date)
  });
  res.sendStatus(200);
})

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init(function (bundle) {
    let needsReload = (renderer === undefined);
    renderer = require('vue-server-renderer').createBundleRenderer(bundle)
    if (needsReload) {
      reloadServer.reload();
    }



  })
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
});
