// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
// for test with firebase
import firebase from 'firebase'

Vue.use(Vuetify)

firebase.initializeApp({
  apiKey: 'AIzaSyAzGeJc89-sbkxICqahAlmX8XShuW8iGBc',
  authDomain: 'b2iweb-vue.firebaseapp.com',
  databaseURL: 'https://b2iweb-vue.firebaseio.com',
  projectId: 'b2iweb-vue',
  storageBucket: 'b2iweb-vue.appspot.com'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
