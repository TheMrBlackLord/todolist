import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import './scss/app.scss'
import store from './store/store.js'
import router from './vue-router.js'

Vue.use(BootstrapVue)
Vue.use(Router)

new Vue({
   el: '#app',
   render: h => h(App),
   store,
   router
})