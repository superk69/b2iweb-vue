<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Manage Project</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 mt-3 pa-5 class="grey lighten-4">
        
        <v-card>
          <v-card-title>
            <h3>ข้อมูลสมาชิก</h3>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="userAllHeadersTable"
            :items="userAll"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.school }}</td>
              <td class="text-xs-left">
                <v-btn color="orange" round dark><v-icon left>edit</v-icon>Edit</v-btn>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable */
export default {
  data () {
    return {
      search: '',
      userAllHeadersTable: [
          { text: 'name', align: 'left', sortable: true, value: 'name'},
          { text: 'email', value: 'email' },
          { text: 'school', value: 'school' },
          { text: 'action', value: 'add' }
        ],
      userAll:[
        {id:1 , name:"game", email:"xx@gmail.com", school:"ubu"},
        {id:1 , name:"game", email:"xx@gmail.com", school:"ubu"},
        {id:1 , name:"game", email:"xx@gmail.com", school:"ubu"}
      ]
    }
  }
}
</script>



