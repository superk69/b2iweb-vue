<template>
  <v-app>
    
    <!-- sub menu  -->
    <v-navigation-drawer v-if="this.$store.state.isLogin"
      clipped
      fixed
      v-model="drawer" app
      >
      <v-list dense>
        <v-list-tile
          v-for="item in this.$store.state.menuLeft"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer> <!-- end sub menu -->

    <!-- main menu  -->
    <v-toolbar app fixed clipped-left color="amber accent-3" height="40">
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
          v-for="item in this.$store.state.menuHeader"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>


        <!-- log out  -->
        <v-btn flat v-if="this.$store.state.isLogin" @click="signOut" >
          <v-icon left dark>exit_to_app</v-icon>
          sign Out
        </v-btn>


      </v-toolbar-items>
    </v-toolbar> <!-- end main menu -->
   
    <!-- coding here -->
    <v-content style="background: linear-gradient(#0375b4, #007849 160%);">
      <router-view/>
    </v-content> <!-- end coding here -->

    <!-- footer  -->
    <v-footer color="amber accent-3" fixed>
      <v-layout row wrap align-center>
         <v-flex xs12>
           <div class="ml-3">
              Cherry
              <v-icon class="red--text">favorite</v-icon>
              by <a href="https://vuetifyjs.com" target="_blank">Vuetify</a>
           </div>
         </v-flex>
       </v-layout>
    </v-footer> <!-- end footer  -->
     

  </v-app>
</template>


<script>
/* eslint-disable */
export default {
  data () {
    return {
      drawer: true,
      title: 'Bridge Stone 2 Inventors',
    }
  },

  methods: {
    signOut () {
      this.$store.dispatch('acLogOut','');
    }
  }

  
  
}
</script>
