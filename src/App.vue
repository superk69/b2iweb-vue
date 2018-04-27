<template>
  <v-app>
    <v-toolbar app >
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ title }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        
        <v-btn flat @click="userSignOut" v-if="isAuthenticated">
          <v-icon left>exit_to_app</v-icon>
            Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
   
    <v-content>
      <router-view/>
    </v-content>

     <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
              and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huang</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>

  </v-app>
</template>

<script>
export default {
  computed: {
    title () {
      return this.$store.state.title
    },
    drawer () {
      return this.$store.state.drawer
    },
    roId () {
      return this.$store.state.roId
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    menuItems () {
      if (this.isAuthenticated) {
        if (this.roId === 'teacher') {
          return [
            {title: 'News', path: '/Blog', icon: 'assign'},
            {title: 'CreateTeam', path: '/Create', icon: 'build'},
            {title: 'ManageTeam', path: '/ManageTeam', icon: 'face'}
          ]
        } else if (this.roId === 'student') {
          return [
            {title: 'News', path: '/Blog', icon: 'assign'},
            {title: 'ManageTeam', path: '/ManageTeam', icon: 'face'}
          ]
        } else if (this.roId === 'admin') {
          return [
            {title: 'News', path: '/Blog', icon: 'assign'},
            {title: 'Statistic', path: '/Statistic', icon: 'poll'}
          ]
        }
      } else {
        return [
            {title: 'News', path: '/Blog', icon: 'assign'},
          {title: 'Sign In', path: '/Signin', icon: 'face'},
          {title: 'Sign Up', path: '/Signup', icon: 'lock_open'}
        ]
      }
    }
  },
  methods: {
    userSignOut () {
      this.$store.dispatch('userSignOut')
    }
  },
  name: 'App'
}
</script>
