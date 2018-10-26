//just includes stuff we need for browser version of app

import './style.scss'

import moment from 'moment-timezone';
moment.tz.setDefault('UTC'); //this is important to have time consistency across the world

let events = window.__INITIAL_STATE__.map(event => {
  return {
    description: event.description, 
    date: moment(event.date)
  }
});

import VueCalendar from './entry';


VueCalendar(events).$mount('#app');