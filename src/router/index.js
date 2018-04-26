import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  {path: '/', component: 'HelloWorld'},
  {path: '/Blog', component: 'Blog'},
  {path: '/Signin', component: 'Signin'},
  {path: '/Signup', component: 'Signup'}
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes
})
