import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import store from '@/STORE/store'

// Components and Pages ...
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import EventCreate from './views/EventCreate.vue'
import User from './views/User.vue'
import NotFound from './components/NotFound.vue'
import NetworkIssue from "./components/NetworkIssue";
import Example from "@/views/Example";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'event-list',
            component: EventList,
            props: true
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
            props: true,
            beforeEnter(routeTo, routeFrom, next) {
                store
                    .dispatch('event/fetchEvent', routeTo.params.id)
                    .then(event => {
                        routeTo.params.event = event
                        next()
                    })
                    .catch(error => {
                        if (error.response && error.response.status == 404) {
                            next({ name: '404', params: { resource: 'event' } })
                        } else {
                            next({ name: 'network-issue' })
                        }
                    })
            }
        },
        {
            path: '/user/:username',
            name: 'user',
            component: User,
            props: true
        },
        {
            path: '/example',
            component: Example
        },

        {
            path: '/404',
            name: '404',
            component: NotFound,
            props: true
        },
        {
            path: '/network-issue',
            component: NetworkIssue,
            props: true
        },
        {
            path: '*',
            redirect: { name: '404', params:{ resource: 'page' } }
        }
    ]
})

router.beforeEach( (routeTo,routeFrom,next) => {
    NProgress.start()
    next()
})

router.afterEach( () => {
    NProgress.done()

})

export default router
