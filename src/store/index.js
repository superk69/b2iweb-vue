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

//json-server --watch db.json
//https://medium.com/@takkamonpob/vue2-0-vuex-%E0%B8%AB%E0%B8%A1%E0%B8%94%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%81%E0%B8%9B%E0%B8%A3-e710a3be6592
const state = {
  isLogin: false,
  clickLogin: false,
  errors: '',
  userLogin: {},
  menuHeader: [
    {title: 'Home', path: '/', icon: 'home'},
    {title: 'Blog', path: '/Blog', icon: 'assignment'},
    {title: 'Register', path: '/Register', icon: 'person_add'},
    {title: 'Sign In', path: '/Signin', icon: 'face'},
  ],
  menuLeft: [],
  projects: []
}

const mutations = {

  mulLogIn:(state, input)=>{
    //console.log(input);
    var checkRole = 'student' //student admin user
    
    var checkLogin = input.length>0
    if(checkLogin){
      input = input[0]
      checkRole = input.role
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
      state.clickLogin = false
      router.push({name: '/'})

    }else{
      state.clickLogin = true
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
    state.projects= []
    router.push({name: '/'})
  },


  mulSetProject:(state,input)=>{
    input.forEach(element => {
      //console.log(element);
      state.projects.push(element)
    });
  }


}

const getters = {

}

const actions = {

  acLogIn: (state,input)=>{
    var url = 'http://localhost:3000/user';
    axios.get(url, {
      params: {
        email: input.email,
        password: input.password,
      }
    })
    .then(response =>{
      store.commit('mulLogIn',response.data)   
      if(response.data.length>0){
        var url_project_by_id ='http://localhost:3000/project';
        axios.get(url_project_by_id, {
          params: {
            // email: input.email,
            // password: input.password,
          }
        })
        .then(response =>{
          store.commit('mulSetProject',response.data);
        })
        .catch(e =>{
          state.errors = e
        })
      }//end if 
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

