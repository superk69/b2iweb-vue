<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" >
        <h1>Edit User</h1>
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
                
                <v-btn v-if="!edit" round color="error" @click.native.stop="dialog = true" dark>
                  <v-icon left>delete</v-icon>
                  Delete
                </v-btn>
                <v-dialog v-model="dialog" max-width="500">
                  <v-card>
                    <v-card-title class="headline">Confirm Delete User</v-card-title>
                    <v-card-text>Delete User</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn round color="error" @click.native="deleteUser">Delete</v-btn>
                      <v-btn round color="warning" @click.native="dialog = false">Cancle</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-btn v-if="edit" round color="success" @click="saveEdit" dark>
                  <v-icon>save</v-icon>
                  Save
                </v-btn>
                <v-btn v-if="edit" round color="info" @click="edit=!edit" dark>
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
    dialog: false,
    password: '********',
    regions: ['ภาคเหนือ','ภาคตะวันออกเฉียงเหนือ','ภาคตะวันออก','ภาคกลาง','ภาคใต้'],
    textRules: [
      v => !!v || 'Input is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    user: function(){

      var data_return = {
        id: this.$store.state.forEditUser.id,
        username: this.$store.state.forEditUser.username,
        email: this.$store.state.forEditUser.email,
        name: this.$store.state.forEditUser.name,
        surname: this.$store.state.forEditUser.surname,
        school: this.$store.state.forEditUser.school,
        region: this.$store.state.forEditUser.region,
        role: this.$store.state.forEditUser.role,
      }

      return data_return;
    }
  },
  methods:{
    saveEdit () {
      if (this.$refs.form.validate()) {
        this.edit = false
        this.$store.dispatch('acEditUser',this.user);
      }
    },
    deleteUser(){
      this.dialog=false
      this.$store.dispatch('acDeleteUser',this.user);
    }
  }
}
</script>