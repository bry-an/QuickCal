import Vue from 'vue'

import store from './store';


import moment from 'moment-timezone';
moment.tz.setDefault('UTC'); //this is important to have time consistency across the world
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })
//above will add moment as an instance method -- defining property on Vue prototype; all components can access moment lib -- see data object below

import App from './components/App.vue'



export default function(events) {

let initialState = Object.assign({}, store.state, { events });
store.replaceState(initialState) //Vuex allows you to set state to whatever you want on page reload

return new Vue({
  data: {
    moment
  },
  components: {
    App
  },
  store, 
  render(createElement) {//this will replace the <div id = app> in HTML
   return createElement(
      'div',
      { attrs: {id: 'app' }},
      [
        createElement('app')
      ]
    )
  }
});

}