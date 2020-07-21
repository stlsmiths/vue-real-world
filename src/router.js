import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import EventCreate from './views/EventCreate.vue'
import User from './views/User.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'event-list',
            component: EventList
        },
        {
            path: '/event/create',
            name: 'event-create',
            component: EventCreate
        },
        {
            path: '/event/:id',
            name: 'event-show',
            component: EventShow,
            props: true
        },
        {
            path: '/user/:username',
            name: 'user',
            component: User,
            props: true
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})

export default router