let nextId = 1;

export default {
    namespaced: true,
    state: {
        notifications: []
    },
    mutations: {
        PUSH(state,notification) {
            state.notifications = [
                ...state.notifications,
                {...notification,
                    id: nextId++
                }]
        },
        DELETE(state,notification) {
            state.notifications = state.notifications.filter( n =>
                n.id !== notification.id)
        }
    },
    actions: {
        add({commit},notification) {
            commit('PUSH',notification)
        },
        remove({commit},notification) {
            commit('DELETE',notification)
        }
    }
}
