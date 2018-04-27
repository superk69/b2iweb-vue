import Vue from 'vue'
import Vuex from 'vuex'
// for firebase
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    title: 'Bridgestone 2 Inventors',
    drawer: false,
    user: null,
    roId: '',
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setRoId (state, payload) {
      state.roId = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
    //    commit('setUser', {email: firebaseUser.email, name: firebaseUser.name, surname: firebaseUser.surname, school: firebaseUser.school, roId: 'teacher'})
        commit('setRoId', 'teacher')
        // have to save to database too
        commit('setLoading', false)
        router.push('/')
      }).catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        commit('setLoading', false)
        commit('setError', null)
        router.push('/')
      }).catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})
