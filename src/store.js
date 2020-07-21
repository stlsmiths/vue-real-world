import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Han Solo' },
    categories: ['sustainability', 'nature',
      'animal welfare', 'housing', 'education', 'food', 'community'
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: state => state.categories.length
  },
  modules: {}
});
