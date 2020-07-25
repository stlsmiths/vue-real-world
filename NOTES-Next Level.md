## Vue mastery class - Mastering Vuex   Jul 2020

[Vue Mastery - Next Level Vue](https://www.vuemastery.com/courses/next-level-vue/progress-bar-axios-interceptors)

GH https://github.com/Code-Pop/real-world-vue/tree/progress-bar-start

#### Lesson 2 - Progress Bar Axios interceptors

`npm i nprogress`

https://github.com/rstacruz/nprogress

Can set spinner ... instead of bar ? 
`NProgress.configure({ showSpinner: false })`

Make changes to EventService.js
`apiClient.interceptors.request.use` or response.use to set configuration

For multiple API calls (in parallel), this solution doesn't scale well
bc it doesn't track overall progress, does individual call progress

One way would be to create a Loading Vuex module to track this;
 * create loading.js
 * set StartLoading on NProgress.start and add 1 to apiWaitingCount
 * doneLoading to fire when NProgress.done
 * apiWaitingCount includes how many calls are fired
 
Interceptors are great to use;
 * to set request Authorization tokens
 * to process response formatting / filter of data before in app
 * to response catch 401 unauth responses
 
 #### Lesson 3 - In-Component route guards
 
 Run progress and end when data returns
 Only render template when data is done.
 
 Vue router "hooks"
 beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave
 must call "next" to continue route (can include false to cancel, named route to redirect)
 
 beforeRouteEnter ... no "this", hasn't created
 
 beforeRouteUpdate ... has access to "this"

EventShow.vue
 * make some changes
 * add beforeRouteEnter
    * add NProgress.start()
    * make store.dispatch('fetchEvent') call
    * in .then from fetchEvent (had to give a return to store fetchEvent), then set NProgress.done
    and call next()
 * some cleanup on created() and methods ...
 
 On /event/1 refresh browser ... it pauses 1.5 secs showing progress
 
#### Lesson 4 - Global and Per-Route Guards

https://www.vuemastery.com/courses/next-level-vue/progress-bar-global-and-per-route-guards



 
    



