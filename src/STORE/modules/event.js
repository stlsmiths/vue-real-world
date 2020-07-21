import EventService from '@/services/EventService'

export const namespaced = true

export default {
    namespaced: true,
    state: {
        count: 0,

        // Event store section
        events: [],
        event: {},
        totalEvents: 0,

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
            state.events = [ ...state.events,  event ]
        },
        SET_EVENTS(state,events) {
            state.events = [...events]
        },
        SET_EVENTS_TOTAL(state,total) {
            state.totalEvents = total
        },
        SET_EVENT(state,event) {
            state.event = {...event}
        },
        DROP_EVENT(state,id) {
            state.events = state.events.filter( e => e.id !== id)
        }
    },
    actions: {
        updateCount( { state, commit }, incrementBy) {
            if (state.user) {
                if ( incrementBy === 1) {
                    commit('INCREMENT_COUNT')
                } else {
                    commit('INCREMENT_COUNT_BY', incrementBy)
                }
            }
        },

        createEvent( { commit, dispatch, rootState }, event) {
            console.log('creating event for user ... ', rootState.user.user.name)
            EventService.postEvent(event).then( () => {
                commit('ADD_EVENT', event)
                commit('SET_EVENT', event)
                const note = {
                    type: 'success',
                    message: 'Event was created !',
                    content: event
                }
                dispatch('notification/add', note, {root: true})
            }).catch( err => {
                const note = {
                    type: 'error',
                    message: 'There was a problem creating event',
                    content: err
                }
                dispatch('notification/add', note, {root: true})
                throw err
            })
        },

        fetchEvents( {commit, dispatch}, {perPage, page}) {
            EventService.getEvents(perPage, page)
                .then(res => {
                    // console.log(res)
                    commit('SET_EVENTS_TOTAL', parseInt(res.headers['x-total-count']))
                    const events = res.data
                    commit('SET_EVENTS', events)
                })
                .catch(err => {
                    console.log(err)
                    const note = {
                        type: 'error',
                        message: 'There was a problem fetching events',
                        content: err
                    }
                    dispatch('notification/add', note, {root: true})
                })
        },

        fetchEvent( {commit, getters}, id) {
            const event = getters.getEventById(id);

            if (event) {
                commit('SET_EVENT', event)
            } else {
                EventService.getEvent( id )
                    .then( resp => {
                        commit('SET_EVENT', resp.data)
                    })
                    .catch( err => {
                        console.log(err)
                        const note = {
                            type: 'error',
                            message: 'There was a problem fetching event id=' + id,
                            content: err
                        }
                        dispatch('notification/add', note, {root: true})
                    })
            }
        },

        dropEvent({commit}, id) {
            EventService.deleteEvent( id )
                .then( resp => {
                    console.log('delete', resp, id)
                    commit('DROP_EVENT', id)
                    this.$router.push({
                        name: 'event-list'
                    })
                })
                .catch( err => {
                    console.log(err)
                })
        }
    },
    getters: {
        catLength: state => state.categories.length,
        doneTodos: state => state.todos.filter( todo => todo.done ),
        activeTodosCount: (state,getters) =>
            state.todos.length - getters.doneTodos.length,

        getEventById: state => id => state.events.find(evt => evt.id === id),
        getTotalEvents: state => state.totalEvents
    }

};
