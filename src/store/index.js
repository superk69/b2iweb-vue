/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
// for firebase
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

//https://medium.com/@takkamonpob/vue2-0-vuex-%E0%B8%AB%E0%B8%A1%E0%B8%94%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%81%E0%B8%9B%E0%B8%A3-e710a3be6592
const state = {
  isLogin: false,
  errors: '',
  userLogin: {},
  menuHeader: [
    {title: 'Home', path: '/', icon: 'home'},
    {title: 'Blog', path: '/Blog', icon: 'assignment'},
    {title: 'Register', path: '/Register', icon: 'person_add'},
    {title: 'Sign In', path: '/Signin', icon: 'face'},
  ],
  menuLeft: []
}

const mutations = {

  mulLogIn:(state, input)=>{
    var checkRole = 'student' //student admin user
    if(input.id==1){
      checkRole = 'teacher'
    }else if(input.id==3){
      checkRole = 'admin'
    }
    
    var checkLogin = true;
    if(checkLogin){

      state.isLogin= true
      state.userLogin = {
        id: input.id,
        username: input.username,
        email: input.email,
        name: input.name,
        surname: input.surname,
        school: input.school.name,
        region: input.school.region,
        role: input.role
      }

      state.menuHeader = [
        {title: 'Home', path: '/', icon: 'home'},
        {title: 'Blog', path: '/Blog', icon: 'assignment'},
      ]

      if(checkRole=='admin'){
        state.menuLeft= [
          {title: 'Profile(All)', path: '/Profile', icon: 'account_circle'},
          {title: 'Manage User(Admin)', path: '/ManageUser', icon: 'group_add'},
          {title: 'Manage Team(Admin)', path: '/ManageTeams', icon: 'group_add'},
          {title: 'Manage Project(Admin)', path: '/ManageProject', icon: 'playlist_add_check'},
          {title: 'Manage News(Admin)', path: '/ManageNews', icon: 'playlist_add'},
        ]
      }else if(checkRole=='teacher'){
        state.menuLeft= [
          {title: 'Profile(All)', path: '/Profile', icon: 'account_circle'},
          {title: 'Manage Teams(Student,Teacher)', path: '/ManageTeam', icon: 'build'},
          {title: 'Project List(Student,Teacher)', path: '/ProjectList', icon: 'assignment'},
        ]
      }else{
        state.menuLeft= [
          {title: 'Profile(All)', path: '/Profile', icon: 'account_circle'},
          {title: 'Project List(Student,Teacher)', path: '/ProjectList', icon: 'assignment'},
        ]
      }

      router.push({name: '/'})

    }
    
    

  },


  mulLogOut:(state,input)=>{
    state.isLogin = false
    state.errors=''
    state.userLogin = {}
    state.menuHeader = [
      {title: 'Home', path: '/', icon: 'home'},
      {title: 'Blog', path: '/Blog', icon: 'assignment'},
      {title: 'Register', path: '/Register', icon: 'person_add'},
      {title: 'Sign In', path: '/Signin', icon: 'face'},
    ]
    state.menuLeft= []
    router.push({name: '/'})
  }


}

const getters = {

}

const actions = {

  acLogIn: (state,input)=>{
    var url = 'https://my-json-server.typicode.com/superk69/myjsonserver/user/2';
    if(input.email=='t@gmail.com'){
      url = 'https://my-json-server.typicode.com/superk69/myjsonserver/user/1';
    }else if(input.email=='a@gmail.com'){
      url = 'https://my-json-server.typicode.com/superk69/myjsonserver/user/3';
    }
    axios.get(url, {
      email: input.email,
      password: input.password,
    })
    .then(response =>{
      store.commit('mulLogIn',response.data)
    })
    .catch(e =>{
      state.errors = e
    })
    
  },

  acLogOut:(state)=>{
    store.commit('mulLogOut','')
  }
}




export const store = new Vuex.Store({
  state: state,
  plugins: [createPersistedState()],
  mutations: mutations,
  getters: getters,
  actions: actions
})

