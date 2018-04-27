<template>
 <v-navigation-drawer permanent class="blue lighten-3" dark>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" > 
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <router-view name="side"></router-view>
  </v-navigation-drawer> 

</template>

<script>
export default {
  computed: {
    roId () {
      return this.$store.state.roId
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    items () {
      if (this.roId === 'teacher') {
        return [
          {title: 'Home', path: '/', icon: 'home'},
          {title: 'Blog', path: '/Blog', icon: 'assignment'},
          {title: 'Manage', path: '/Manage', icon: 'build'}
        ]
      } else {
        return [
          {title: 'Home', path: '/', icon: 'home'},
          {title: 'Blog', path: '/Blog', icon: 'assignment'},
          {title: 'Sign In', path: '/Signin', icon: 'face'},
          {title: 'Sign Up', path: '/Signup', icon: 'lock_open'}
        ]
      }
    }
  }
}
</script>