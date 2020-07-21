import Vue from "vue";
import Vuex from "vuex";

import EventService from '../services/EventService'

import * as user from './modules/user.js'
import event from './modules/event';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event
  },
  state: {
    categories: ['sustainability', 'nature',
      'animal welfare', 'housing', 'education', 'food', 'community'
    ],
  }
});
