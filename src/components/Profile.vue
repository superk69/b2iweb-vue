<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" >
        <h1>Profile</h1>
      </v-flex>
      <v-flex xs12 sm8 offset-sm2 pa-5 class="grey lighten-2">       
        <v-container fluid>
          
          <v-form ref="form" lazy-validation>

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
                  v-model="user.email"
                  :disabled="!edit"
                  :rules="emailRules"
                  required
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
                  :value="user.password"
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
                  v-model="user.name"
                  :disabled="!edit"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- surname -->
            <v-layout row>
              <v-flex xs2>
                <v-subheader>Surname:</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  label="Label Text"
                  name="input-surname"
                  id="surname"
                  v-model="user.surname"
                  :disabled="!edit"
                  :rules="textRules"
                  required
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
                  v-model="user.school"
                  :disabled="!edit"
                  :rules="textRules"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <!-- region  -->
            <v-layout row>
              <v-flex xs2>
                <v-subheader>Region:</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-select
                  :items="regions"
                  v-model="user.region"
                  label="Select"
                  :disabled="!edit"
                  :rules="textRules"
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12 class="text-xs-center red--text">
                <v-btn v-if="!edit" round color="orange" @click="edit=!edit" dark>
                  <v-icon>create</v-icon>
                  Edit
                </v-btn>
                <v-btn v-if="edit" round color="success" @click="saveEdit" dark>
                  <v-icon>save</v-icon>
                  Save
                </v-btn>
                <v-btn v-if="edit" round color="error" @click="edit=!edit" dark>
                  <v-icon>close</v-icon>
                  Cancle
                </v-btn>
              </v-flex>
            </v-layout>

          </v-form>


        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    edit: false,
    regions: ['ภาคเหนือ','ภาคตะวันออกเฉียงเหนือ','ภาคตะวันออก','ภาคกลาง','ภาคใต้'],
    textRules: [
      v => !!v || 'Input is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
    // user:{
    //   email: 'Cherry@gmail.com',
    //   password: '********',
    //   name: 'Cherry',
    //   surname: 'Angle',
    //   school: 'UBU',
    // }
  }),
  computed: {
    user: function(){

      var data_return = {
        email: this.$store.state.userLogin.email,
        password: '********',
        name: this.$store.state.userLogin.name,
        surname: this.$store.state.userLogin.surname,
        school: this.$store.state.userLogin.school,
        region: this.$store.state.userLogin.region
      }

      return data_return;
    }
  },
  methods:{
    saveEdit () {
      if (this.$refs.form.validate()) {
        this.edit = false
        this.$store.dispatch('acEditProfile',this.user);
      }
    }
  }
}
</script>