## Vue mastery class - Mastering Vuex   Jul 2020

https://www.vuemastery.com/courses/mastering-vuex/intro-to-vuex

Vuex docs   https://vuex.vuejs.org/

#### Lesson 1 - Intro

state mgmt for Vue

Vuex - designed after Flux pattern

state changes hard to track / manage

```
const store = new Vuex.store({
	state: {

	},
	mutations: {
		SET_TODOS(state, todos) {
		}
	},
	actions: {

	 },
	getters: {
		doneTodos(state) : {

	}
});
```

mutations … modify state

actions … commit mutations against state

this.store.dispatch(‘fetchTodos’)
	* does mutations

this.store.getters.doneTodos

#### Lesson 2 - Mastering Vuex orientation

https://www.vuemastery.com/courses/mastering-vuex/mastering-vuex-orientation

Uses same app as from Real World class  (Vue cli )

can define computed props to access state, on this.$store.state … etc

or can use mapState from vuex 

#### Lesson 3 - Setters and Getters

https://github.com/Code-Pop/real-world-vue/tree/lesson11-vuex-start

use mapState to get state as computed props on component
can spread with local data to get combined computed data
can do catLength as computed in component
… BUT, a getter would be better on the store

getters can call other getters

getters can have param (id) for example … 
usage is weird, define as computed with NO param, then use in template with param

can also use mapGetters … to map getters desired to computed props


#### Lesson 4 - Mutations & Actions Part 1

https://www.vuemastery.com/courses/mastering-vuex/vuex-mutations-actions-1

GH https://github.com/Code-Pop/real-world-vue/releases/tag/lesson12-mutations%26actions1-start

convention … mutations are entered as ALL_CAPS, 
mutation can include a payload also

format is this.$store.commit( ‘MUTATION_NAME’, payload)

use actions to wrap business logic around mutations … incl async

actions have arguments of ( context, payload )
where context is current store object (state,commit,mutations,actions,getters, etc)

by convention, we normally don’t call mutations directly (via commit), but prefer to wrap
the mutations in actions.


MY BONUS
* look into lifecycle methods
    * https://vueschool.io/lessons/understanding-the-vuejs-lifecycle-hooks?friend=vuejs
* load data in “created” hook
* mounted similary to jq “ready”, access to $el 
* destroy … when element removed from DOM
* beforeDestroy, component is still functional 
    * turn off event listeners, firebase, etc… here
* updated, destroy hooks not often used

#### Lesson 5 - Mutations and Actions Part 2

https://www.vuemastery.com/courses/mastering-vuex/vuex-mutations-actions-2

GH.  https://github.com/Code-Pop/real-world-vue/tree/lesson13-mutations%26actions2-start

modify EventList to remove api call (from EventService) and update store to add 
calls to EventService here (SET_EVENTS)
… works well 

consider pagination
* json-server allows _page= and _limit= querystrings
    * _limit is page size

updated EventList, add Prev / Next and use router-link :to to go to new query params
changes url … but doesn’t reload page

force reload page when query changes 
* in App.vue, router-view … :key=“$route.fullPath”  fixes this

how about TOTAL pages, extra credit …
* json-server adds a x-total-count header to each call
* set in store state, create a mutation and getter

I did this, added pagination params to EventList, read state total items
* set page, perPage, pageChoices as data
* created a SELECT with some paging sizes and bound v-model
* created a computed prop to calculate last page number
* created a changePage  method
    * fires a this.$router.push call for each perPage call, reset page to 1
* add logic to NEXT router-link with v-if to check if list page

what about caching … ?
* some ways to do in Vue

update EventShow to read from store instead of service
* add event to store, SET_EVENT mutation, 
* update fetchEvent …
    * to first check if event (by id) is in events state
    * if it is … just return it, don’t make api call
    * if no … make api call


#### Lesson 6 - Modules

https://www.vuemastery.com/courses/mastering-vuex/vuex-modules
GH   https://github.com/Code-Pop/real-world-vue/tree/lesson14-modules-start
Vuex module docs   https://vuex.vuejs.org/guide/modules.html

organize code / namespacing

create user / event modules … data models, features

make /STORE directory, put store.js there and /modules

to access another module in a action, getter, etc… use rootState 

note … all module actions, getters, mutations are global, so naming must be unique 
* this is if “namespacing is turned off” … stay tuned

Namespacing:
* simply set “namespaced” in module configuration
* then refer to events as modulename/fireEvent
* also getters is store.getters[‘event/getTotalEvents’])

also … mapActions, can simply calls to this.$store.dispatch ( but I don’t like this)

call an action inside an action … 
* prefix with module name/ and include 3rd arg as {root: true}

#### Lesson 7 - Success and Error notifications

https://www.vuemastery.com/courses/mastering-vuex/success-error-notifications

GH https://github.com/Code-Pop/real-world-vue/tree/lesson15-notifications-start

white paper on memory leaks https://medium.com/outsystems-experts/beyond-memory-leaks-in-javascript-d27fd48ae67e

add new notification module to store
 * add dispatch notification/add to store fetchEvents and fetchEvent
 * disable json-server, 
 * check Vue console, it works ... shows eror
 
created NotificationBar and NotificationContainer
add container to App.vue

I am getting a strange error on createEvent, doesn't route to new event properly or
also get a "dispatch not found" error - like trying to find a new event without id

added dispatch(notification/add) to event.js store, fetchEvents, fetchEvent, createEvent
it displays properly

add a mounted() timeout timer for 5 seconds, and a beforeDestroy clearTimeout to avoid
memory leaks









