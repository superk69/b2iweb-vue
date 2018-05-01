<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" >
        <h1>Profile</h1>
      </v-flex>
      <v-flex xs12 sm8 offset-sm2 pa-5 class="grey lighten-2">
        
        <v-container fluid>
          <!-- email  -->
          <v-layout row>
            <v-flex xs2>
              <v-subheader>Email:</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                label="Label Text"
                name="input-email"
                id="email"
                :value="email"
                :disabled="!edit"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- password -->
          <v-layout row>
            <v-flex xs2>
              <v-subheader>Password:</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                label="Label Password"
                name="input-Password"
                id="password"
                :value="password"
                disabled
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- name -->
          <v-layout row>
            <v-flex xs2>
              <v-subheader>Name:</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                label="Label Text"
                name="input-name"
                id="name"
                :value="name"
                :disabled="!edit"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- surname -->
          <v-layout row>
            <v-flex xs2>
              <v-subheader>Email:</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                label="Label Text"
                name="input-surname"
                id="surname"
                :value="surname"
                :disabled="!edit"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- school -->
          <v-layout row>
            <v-flex xs2>
              <v-subheader>School:</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                label="Label Text"
                name="input-school"
                id="school"
                :value="school"
                :disabled="!edit"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 class="text-xs-center red--text">
              <v-btn v-if="!edit" round color="warning" @click="edit=!edit" dark>
                <v-icon left>create</v-icon>
                Edit
              </v-btn>
              <v-btn v-else round color="success" @click="edit=!edit" dark>
                <v-icon left>save</v-icon>
                Edit
              </v-btn>
            </v-flex>
          </v-layout>

        </v-container>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  data: () => ({
    edit: false,
    email: 'Cherry@gmail.com',
    password: '********',
    name: 'Cherry',
    surname: 'Angle',
    school: 'UBU',
  })
}
</script>