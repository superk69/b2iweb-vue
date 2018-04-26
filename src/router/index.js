import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  {path: '/', component: 'HelloWorld'},
  { path: '/Blog', component: 'Blog', meta: { requiresAuth: true } },
  {path: '/Signin', component: 'Signin'},
  {path: '/Signup', component: 'Signup'},
  {path: '*', component: 'NotFound'}
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/Signin')
  } else {
    next()
  }
})

export default router
