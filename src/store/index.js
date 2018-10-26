import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC'); //this is important to have time consistency across the world

import Axios from 'axios';

const currentMonth = moment().format('MM')
const currentYear = moment().format('YYYY')
export default new Vuex.Store({
    //state properties
    state: {
        currentYear: 2018,
        currentMonth: 10,
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        eventFormDate: moment(),
        events: []
    },
    mutations: {
        setCurrentMonth(state, payload) { //mutations always have these two properties
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        eventFormPos(state, payload) {
            state.eventFormPosX = payload.x;
            state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        },
        addEvent(state, payload) {
            state.events.push(payload);
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        }
    },
    actions: {
        addEvent(context, payload) { //actions always have these two properties. Context is whole store (actions need access to state and mutations)
            return new Promise((resolve, reject) => {
                let obj = {
                    description: payload,
                    date: context.state.eventFormDate
                }
                context.commit('addEvent', obj)
                Axios.post('/add_event', obj).then(response => {
                    if (response.status === 200) {
                        context.commit('addEvent, obj');
                        resolve(); //everything works, return resolve()
                    } else {
                        reject(); //some problem, return reject()
                    }
                })
            }); //with an action you can return a promise
        }
    }
})