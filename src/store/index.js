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
const state = {
  isLogin: false,
  clickLogin: false,
  errors: '',
  userLogin: {},
  menuHeader: [
    {title: 'Home', path: '/', icon: 'home'},
    {title: 'Register', path: '/Register', icon: 'person_add'},
    {title: 'Sign In', path: '/Signin', icon: 'face'},
  ],
  menuLeft: [],
  projects: [],
  forEditProject:{},
  users:[],
  forEditUser:{},
  editProjectStatus:'', //success , error ,df:''
  postAll:[],
  forEditPost:{},
}

const mutations = {

  mulPost:(state,input)=>{
   state.postAll = input
  },
  mulLoadMore:(state,input)=>{
    console.log(input)
    var index = 8;
    input.forEach(element => {
      element.id= index++
      state.postAll.push(element);
    });    
  },
  mulPostDetail:(state,input)=>{
    state.forEditPost = input
    router.push({path: '/Post'})
  },



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
        {title: input.username , path: '/Profile', icon: 'face'},
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
      if(checkRole==='admin'){
        router.push({path: '/ManageProject'})
      }else{
        router.push({path: '/ProjectList'})
      }
      

    }else{
      state.clickLogin = true
    }
    
    

  },

  mulLogOut:(state,input)=>{
    state.isLogin = false;
    state.errors='';
    state.userLogin = {};
    state.menuHeader = [
      {title: 'Home', path: '/', icon: 'home'},
      {title: 'Blog', path: '/Blog', icon: 'assignment'},
      {title: 'Register', path: '/Register', icon: 'person_add'},
      {title: 'Sign In', path: '/Signin', icon: 'face'},
    ];
    state.menuLeft= [];
    state.projects= [];
    state.forEditProject={};
    state.users=[];
    state.forEditUser={};


    router.push({path: '/'})
  },

  mulSetProject:(state,input)=>{
    input.forEach(element => {
      state.projects.push(element)
    });
  },

  mulSetUser:(state,input)=>{

    var user_all = [];
    input.forEach(element => {
      user_all.push({
        id: element.id,
        username: element.username,
        email: element.email,
        name: element.name,
        surname: element.surname,
        school: element.school.name,
        region: element.school.region,
        role: element.role
      });
    });
    state.users = user_all;

  },

  mulEditProfile:(state,input)=>{
    state.userLogin.username = input.username
    state.userLogin.email = input.email
    state.userLogin.name = input.name
    state.userLogin.surname = input.surname,
    state.userLogin.school = input.school,
    state.userLogin.region = input.region
  },

  mulForEditUser:(state,input)=>{
    state.forEditUser = input;
    router.push({path: '/ManageUserEdit'})
  },

  mulEditUser:(state,input)=>{

    state.users.forEach((user, index) => {
      if (user.id === input.id) {
          Vue.set(state.users, index, input);
      }
    });

  },

  mulDeleteUser:(state,input)=>{

    state.users.forEach((user, index) => {
      if (user.id === input.id) {
          Vue.delete(state.users,index);
      }
    });
    router.push({path: '/ManageUser'})

  },
  //-------- Team ------------
  mulForEditTeam:(state,input)=>{
    state.editProjectStatus = ''
    state.projects.forEach((project, index) => {
      if (project.id === input.id) {
        state.forEditProject=project
      }
    });
    router.push({path: '/ManageTeamsEdit'})
  },

  mulAddTeam:(state,input)=>{
    console.log(input);
  },

  mulDeleteTeam:(state,input)=>{
    console.log(input);
  },

  mulEditTeam:(state,input)=>{
    //console.log(input);
    state.editProjectStatus = 'success'
    state.projects.forEach((project, index) => {
      if (project.id === input.id) {
          Vue.set(state.projects, index, input);
      }
    });
  },

  mulCancelTeam:(state,input)=>{
    if(store.state.userLogin.role==='admin'){
      router.push({path: '/ManageTeams'})
    }else{
      router.push({path: '/ManageTeam'})
    }
  },
  //------------ project ----------
  mulForEditProject:(state,input)=>{
    state.forEditProject = input;
    if(state.userLogin.role==='admin'){
      router.push({path: '/ProjectManage'})
    }else{
      router.push({path: '/ProjectManage'})
    }
    
  },
  

}

const getters = {
  postAll: state => state.forEditProject,
}

/*  ===================================
    ===================================
            actions
    ===================================
    ===================================
*/
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
        //------------- projects ------------------
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
        //---------------------------------------

        //--------------- admin -----------------
        if(response.data[0].role=='admin' || response.data[0].role=='teacher'){
          var url_all_user ='http://localhost:3000/user';
          axios.get(url_all_user, {
            params: {
              // email: input.email,
              // password: input.password,
            }
          })
          .then(response =>{
            store.commit('mulSetUser',response.data);
          })
          .catch(e =>{
            state.errors = e
          })
        }


      }//end if 
    })
    .catch(e =>{
      state.errors = e
    })
    
  },
  acLogOut:(state)=>{
    store.commit('mulLogOut','')
  },
  //========= edit profile ==========
  acEditProfile:(state,input)=>{
    store.commit('mulEditProfile',input);
  },
  acForEditUser:(state,input)=>{
    store.commit('mulForEditUser',input);
  },
  acEditUser:(state,input)=>{
    store.commit('mulEditUser',input);
  },
  acDeleteUser:(state,input)=>{
    store.commit('mulDeleteUser',input);
  },
  //================ edit team ==========
  acForEditTeam:(state,input)=>{
    store.commit('mulForEditTeam',input);
  },
  acEditTeam:(state,input)=>{
    store.state.editProjectStatus=''
    store.commit('mulEditTeam',input);
  },
  acCancelTeam:(state,input)=>{
    store.state.forEditProject={}
    store.commit('mulCancelTeam',input);
  },
  acAddTeam:(state,input)=>{
    store.commit('mulAddTeam',input);
  },
  acDeleteTeam:(state,input)=>{
    store.commit('mulForDeleteTeam',input);
  },
  //================ edit Project ============
  acForEditProject:(state,input)=>{
    store.commit('mulForEditProject',input);
  },


  //================= post =================
  acPost:(state,input)=>{
    var url = 'http://localhost:3000/post';
    axios.get(url, {
      params: {
        // email: input.email,
        // password: input.password,
      }
    })
    .then(response =>{
      store.commit('mulPost',response.data);
    })
    .catch(e =>{
      state.errors = e
    })
  },
  acLoadMore:(state,input)=>{
    var url = 'http://localhost:3000/post';
    axios.get(url, {
      params: {
        // email: input.email,
        // password: input.password,
      }
    })
    .then(response =>{
      store.commit('mulLoadMore',response.data);
    })
    .catch(e =>{
      state.errors = e
    })
  },
  acPostDetail:(state,input)=>{
    store.commit('mulPostDetail',input);
  },


}




export const store = new Vuex.Store({
  state: state,
  plugins: [createPersistedState()],
  mutations: mutations,
  getters: getters,
  actions: actions
})

