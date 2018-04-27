<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!-- action menu  -->
      <v-list>

        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-group
        :prepend-icon="iconProject"
        no-action
        value="false"
        >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{titleProject}}</v-list-tile-title>
        </v-list-tile>
            <v-list-tile
              v-for="item in menuProject" 
              :key="item.title" 
              :to="item.path"
            >
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
        </v-list-group>
        

        <v-list-tile @click="userSignOut" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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

        <v-menu offset-y>
          <v-btn slot="activator">
            <v-icon left dark>{{iconProject}}</v-icon>
            {{titleProject}}
            <v-icon left dark>keyboard_arrow_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in menuProject" :key="item.title" :to="item.path">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>      
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>

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
/* eslint-disable */
export default {
  data () {
    return {
      drawer: false,
      title: 'Bridge Stone 2 Inventors',
      menuItems: [
        {title: 'Home', path: '/', icon: 'home'},
        {title: 'Blog', path: '/Blog', icon: 'assignment'},
        {title: 'Sign In', path: '/Signin', icon: 'face'}
      ],
      titleProject: 'Project',
      iconProject: 'content_paste',
      menuProject: [
        {title: 'โครงการเปิดรับลงทะเบียน', path: '/ProjectOpen', icon: 'content_copy'},
        {title: 'โครงการที่กำลังดำเนินการ', path: '/ProjectControl', icon: 'local_library'},
        {title: 'ประวัติ', path: '/ProjectHistory', icon: 'inbox'}
      ]
    }
  },
  computed: {
    title () {
      return this.$store.state.title
    },
    drawer () {
      return this.$store.state.drawer
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    menuItems () {
      if (this.isAuthenticated) {
        return [
          {title: 'Home', path: '/', icon: 'home'},
          {title: 'Blog', path: '/Blog', icon: 'assignment'}
        ]
      } else {
        return [
          {title: 'Home', path: '/', icon: 'home'},
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
