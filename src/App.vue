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
        prepend-icon="group"
        no-action
        value="false"
        >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{titleRegister}}</v-list-tile-title>
        </v-list-tile>
            <v-list-tile
              v-for="item in menuRegister" 
              :key="item.title" 
              :to="item.path"
            >
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
        </v-list-group>
        
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
            <v-icon left dark>group</v-icon>
            {{titleRegister}}
            <v-icon left dark>keyboard_arrow_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in menuRegister" :key="item.title" :to="item.path">
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
  data () {
    return {
      drawer: false,
      title: 'Bridge Stone 2 Inventors',
      menuItems: [
        {title: 'Home', path: '/', icon: 'home'},
        {title: 'Blog', path: '/Blog', icon: 'assignment'},
        {title: 'Sign In', path: '/Signin', icon: 'face'}
      ],
      titleRegister: 'Register',
      menuRegister: [
        {title: 'Student', path: '/RegisterStudent', icon: 'person'},
        {title: 'Teacher', path: '/RegisterTeacher', icon: 'school'}
      ]
    }
  },
  name: 'App'
}
</script>
