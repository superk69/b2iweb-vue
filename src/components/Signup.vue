<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Register</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
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
          <v-text-field
            label="Confirm Password"
            v-model="confirmPassword"
            :append-icon="confirmPasswordCheck ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (confirmPasswordCheck = !confirmPasswordCheck)"
            :type="confirmPasswordCheck ? 'text' : 'password'"
            :rules="[comparePassword]"
            required
          ></v-text-field>

          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            required
          ></v-text-field>

          <v-text-field
            label="Surname"
            v-model="surname"
            :rules="surnameRules"
            required
          ></v-text-field>

          <v-text-field
            label="School(University)"
            v-model="school"
            :rules="schoolRules"
            required
          ></v-text-field>

          <v-flex class="text-xs-center" mt-5>
            <v-btn color="info"  @click="submit">Register</v-btn>
            <v-btn color="error" @click="clear">clear</v-btn>
          </v-flex>
          

        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

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
    ],
    confirmPassword: '',
    confirmPasswordCheck: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    surname: '',
    surnameRules: [
      v => !!v || 'Surname is required'
    ],
    school: '',
    schoolRules: [
      v => !!v || 'School is required'
    ]
  }),
  computed: {
    comparePassword(){
      return this.password===this.confirmPassword?true:'Password and confirm password don\'t match'
    },
    error () {
        return this.$store.state.loading
    }
  }, 
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          // axios.post('/api/submit', {
          //   email: this.email,
          //   password: this.password,
          //   name: this.name,
          //   surname: this.surname,
          //   school: this.school,
          //   rold: 'teacher'
          // })
        this.$store.dispatch('userSignUp', { email: this.email, password: this.password, name: this.name, surname: this.surname, school: this.school, roId: 'teacher'})
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>