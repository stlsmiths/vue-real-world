import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './STORE/store'
import Vuelidate from 'vuelidate'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import DateFilter from '@/filters/date'
import 'nprogress/nprogress.css'

// - CONFIGURATION

Vue.filter('date', DateFilter)

Vue.use(Vuelidate)

Vue.config.productionTip = false

//  -  BASE COMPONENTS

// import BaseIcon from '@/components/BaseIcon.vue'
// Vue.component('BaseIcon', BaseIcon)

// Automatic registration of global components from;
// https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})


// -  VUE INSTANCE

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
