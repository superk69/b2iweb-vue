import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  {path: '/', component: 'HelloWorld'},
  { path: '/Blog', component: 'Blog', meta: { requiresAuth: true } },
  {path: '/Signin', component: 'Signin'},
<<<<<<< HEAD
  {path: '/RegisterStudent', component: 'RegisterStudent'},
  {path: '/RegisterTeacher', component: 'RegisterTeacher'},
  {path: '/ProjectOpen', component: 'ProjectOpen'},
  {path: '/ProjectControl', component: 'ProjectControl'}
=======
  {path: '/Signup', component: 'Signup'},
  {path: '*', component: 'NotFound'}
>>>>>>> a37f946b8b44ff5b16f55de17536951d1cd3ceb4
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
