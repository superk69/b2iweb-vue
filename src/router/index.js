/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  {path: '/', component: 'Home'},
  {path: '/Profile', component: 'Profile'},
  {path: '/Register', component: 'Register'},
  {path: '/Signin', component: 'Signin'},
  {path: '/Signup', component: 'Signup'},
  {path: '/ManageTeam', component: 'manage/ManageTeam'},
  {path: '/CreateTeam', component: 'manage/CreateTeam'},
  {path: '/ProjectList', component: 'manage/ProjectList'},
  {path: '/ProjectManage', component: 'manage/ProjectManage'},
  {path: '/ManageUser', component: 'admin/ManageUser'},
  {path: '/ManageUserEdit', component: 'admin/ManageUserEdit'},
  {path: '/ManageProject', component: 'admin/ManageProject'},
  {path: '/ManageNews', component: 'admin/ManageNews'},
  {path: '/ProjectSend', component: 'admin/ProjectSend'},
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

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const isAuthenticated = firebase.auth().currentUser
//   if (requiresAuth && !isAuthenticated) {
//     next('/Signin')
//   } else {
//     next()
//   }
// })

export default router
