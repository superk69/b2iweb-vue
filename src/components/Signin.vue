<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3 pa-5 class="grey lighten-2">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            label="Enter your password"
            v-model="password"
            :append-icon="passwordCheck ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passwordCheck = !passwordCheck)"
            :type="passwordCheck ? 'text' : 'password'"
            :rules="passwordRules"
            required
          ></v-text-field>

          <v-flex class="text-xs-center" mt-5>
            <p v-if="this.$store.state.clickLogin" class="red--text"> Login fail.. Plesas Check E-mail or Password</p>
            <v-btn color="info"  @click="submit">Sign in</v-btn>
            <v-btn color="error" @click="clear">clear</v-btn>
          </v-flex>
          

        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordCheck: false,
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be more than 8 characters'
    ]
  }),

  computed: {
  },


  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('acLogIn',{email:this.email,password:this.password});
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>