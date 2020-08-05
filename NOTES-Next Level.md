## NOTES Vue mastery class - Next Level Vue    Jul 2020

[Vue Mastery - Next Level Vue](https://www.vuemastery.com/courses/next-level-vue/progress-bar-axios-interceptors)

[GH](https://github.com/Code-Pop/real-world-vue/tree/progress-bar-start)

#### Lesson 2 - Progress Bar Axios interceptors

Demonstrated on `EventList.vue` and `EventService.js` components;

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
 
 Demonstrate on `EventShow.vue` component ...
 
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

May want to remove Vuex from all of our components, just use routing for data ...

Two more global routing hooks
 * router.beforeEach ... 
 * router.afterEach ... just before component is created 

Put in `router.js` beforeEach, and also per-route beforeEnter functions  
then, consider passing the retrieved data as a "prop" 
 * this way, we can remove all vuex calls in the component completely

@7:40 time

have to make changes to EventService (to return data and not promise) and 
update EventShow, remove computed property (state.event.event)

Note:  I couldn't completely remove Vuex from EventShow bc I use deleteEvent from the store

#### Lesson 5 - Completing the Progress Bar

[video](https://www.vuemastery.com/courses/next-level-vue/completing-our-progress-bar)

Making `EventList` progress bar work okay ... 

Move created ... fetchEvents into route guard
we should probably use beforeRouteUpdate

@4:35 editing `EventList`, I had added perPage as a prop, but they 
don't in the example ...

My perPage changes in EventList might not work properly.

Changes to `EventCreate` ... @7:00, hmmm - mine doesn't work right

#### Lesson 6 -  Error Handling

404 error pages ... also Network error page

Also Network-Issue code ... add timeout to axios setup.

[FINISH CODE](https://github.com/Code-Pop/real-world-vue/tree/error-handling-finish)

#### Lesson 7 -  Reusable Form, BaseInput

[Video](https://www.vuemastery.com/courses/next-level-vue/reusable-form-components-baseinput)

Base Form components.

EventCreate has lots of elements ... lets make them base components.

Note:  v-model is syntactic sugar for
```vue
:value="vmodelName"
@input="(val) => modelName = val"
```
Vue 2 by default applies inherited attrs to the enclosing element, i.e. the DIV in this case.

To get around this ... add `inheritAtts: false` to the component definition and use `v-bind="$attrs"` on the target element.

Also important: In order to pass BaseXXX element events up to the parent component (i.e. `@blur`) you 
need to define `v-on="$listeners"` (or similar) on the element to pass up.  

**NOTE:**  In this class (lesson 10) they introduce a bug where "$listeners" actually needs to be
appended with "updateValue" to make this work okay !!

#### Lesson 8 -  Reusable Form, BaseSelect

Base `<select>` component.

Define the internal select event as `@change` and use `:selected` to assign the initial value.

Note:  For options as Objects, much more complicated.  

They recommend [vue-multiselect library](https://vue-multiselect.js.org/).


#### Lesson 9 -  Reusable Form, BaseButton

Button is basic ... uses inheritAttrs to inherit type and disabled, etc..  
_Note: The $attrs behavior for class / style may change in Vue 3._

Added `v-on="$listeners"` to pass @click, etc.. down.

[Final GH](https://github.com/Code-Pop/real-world-vue/releases/tag/baseButton-finish)

#### Lesson 10 - Form Validation with Vuelidate

Form validation ... [Vuelidate](https://vuelidate.js.org/)  
npm i -S vuelidate  
add vuelidate / Vue.use in main.js.  

To use in a component, add to component;  
```
validations: {
    email: {
        email, required
    }
}
```

Check status as;  `$v.email.$invalid` or $dirty, can use `$vm.email.$touch()` to 
touch it.  

In Vuelidate;  if `$error true, if $dirty and $invalid`  

On entire component, can check `$vm.$anyDirty, $vm.$invalid, $vm.$anyError` and also
can run `$vm.$touch()`

[final gh](https://github.com/Code-Pop/real-world-vue/tree/form_validation1_finish)

#### Lesson 11 - Form Validation with Vuelidate Pt 2

Add vuelidation to EventCreate form. 

Steps to validation;
 * Add an error message that triggers when field is not filled in
 * Listen to blur, which then does $touch ... and and $error we can use
 * Use $error state to show/hide error messages
 * Style our error message 

_NOTE: I was getting an error after his stated edits to `BaseSelect` where they add `$listeners` to 
v-on.  This [GH issue](https://github.com/Code-Pop/real-world-vue/issues/18) fixes this_

Stage final [GH](https://github.com/Code-Pop/real-world-vue/tree/vuelidateP2-finish)

#### Lesson 12 - Mixins

Can add component mixins (in config, mixins:[]) or at global level on Vue instance.

Mixins ... data, methods, props, etc... if duplicated, the component's wins.

Very similar to a TS "base" Class which is extended.

Can create an app-wide mixing as (in main.js);
```vue
Vue.mixin({
  mounted() {
    // do stuff
  }
})
``` 

Also can include a mixin in a component ... as `mixins: []`, the example here  
is for `BaseInput` and `BaseSelect` to share the updateValue and props stuff.
 

#### Lesson 13 - Filters

Basically "pipes" in angular ... can have params or modifiers.

Can define on component config ... filters: { funcs(), func(value)  }

Can also define global filters ... `Vue.filter('date', DateFilter)`


Argument:  Some say use a "method" or "computed" instead of a "filter", for performance reasons.
Also Newer JS standards proposals may use "|" symbol in some fashion.


FINAL [GH CODE](https://github.com/Code-Pop/real-world-vue/tree/filters_FINISH)

 




 
    



