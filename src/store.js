import Vue from "vue";
import Vuex from "vuex";
import EventService from './services/EventService'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Han Solo' },
    categories: ['sustainability', 'nature',
      'animal welfare', 'housing', 'education', 'food', 'community'
    ],
    count: 0,
    events: [],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ]
  },
  mutations: {
    INCREMENT_COUNT(state) {
      state.count += 1
    },
    INCREMENT_COUNT_BY(state,value) {
      state.count += value
    },
    ADD_EVENT(state,event) {
      state.events.push( event )
    }
  },
  actions: {
    createEvent( {commit}, event) {
      EventService.postEvent(event)
      commit('ADD_EVENT', event)
    },
    updateCount( { state, commit }, incrementBy) {
      if (state.user) {
        if ( incrementBy === 1) {
          commit('INCREMENT_COUNT')
        } else {
          commit('INCREMENT_COUNT_BY', incrementBy)
        }
      }
    }
  },
  getters: {
    catLength: state => state.categories.length,
    doneTodos: state => state.todos.filter( todo => todo.done ),
    activeTodosCount: (state,getters) =>
      state.todos.length - getters.doneTodos.length
  },
  modules: {}
});
