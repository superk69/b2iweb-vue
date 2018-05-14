/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
// for firebase
import axios from 'axios'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

//https://medium.com/@takkamonpob/vue2-0-vuex-%E0%B8%AB%E0%B8%A1%E0%B8%94%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%81%E0%B8%9B%E0%B8%A3-e710a3be6592
const state = {
  errors:[],
  userLogin: {id:0,username:'',email:'',name:'',surname:'',school:'',role:''},
  menuHeader: [
    {title: 'Home', path: '/', icon: 'home'},
    {title: 'Blog', path: '/Blog', icon: 'assignment'},
    {title: 'Register', path: '/Register', icon: 'person_add'},
    {title: 'Sign In', path: '/Signin', icon: 'face'},
    {title: 'sign Out', path: '/Signout', icon: 'exit_to_app'}
  ],
  menuLeft: [
    {title: 'Profile(All)', path: '/Profile', icon: 'account_circle'},
    {title: 'Manage Teams(Student,Teacher)', path: '/ManageTeam', icon: 'build'},
    {title: 'Project List(Student,Teacher)', path: '/ProjectList', icon: 'assignment'},
    {title: 'Manage User(Admin)', path: '/ManageUser', icon: 'group_add'},
    {title: 'Manage Team(Admin)', path: '/ManageTeams', icon: 'group_add'},
    {title: 'Manage Project(Admin)', path: '/ManageProject', icon: 'playlist_add_check'},
    {title: 'Manage News(Admin)', path: '/ManageNews', icon: 'playlist_add'},
  ]
}

const mutations = {
  addText: (state, name) => {
    state.todos.push({ name: name })
  },
  addNum: (state, num) => {
    state.number += num
  },
  logIn:(state, input)=>{
    
    axios.get('https://my-json-server.typicode.com/superk69/myjsonserver/user/2', {
      email: input.email,
      password: input.password,
    })
    .then(response =>{
      console.log(response.data)
      //this.$set(state.userLogin,response.data)
      state.userLogin.name =  respones.data.name
      //console.log(state.userLogin)
      return state.userLogin
    })
    .catch(e =>{
      state.errors.push(e)
    })



  }
}

const getters = {

}

const actions = {
  addTodo: (state, name) => {
    store.commit('addText', name)
  },
  addNumber: (state, num) => {
    store.commit('addNum', num)
  },
  logIn: (state,input)=>{
    store.commit('logIn',input)
  }
}




global.store = store
export let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})

