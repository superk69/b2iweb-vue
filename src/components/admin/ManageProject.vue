<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Manage Project</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 mt-3>

        <v-card>
            <v-card-title>
              รายการโครงงานที่ส่งเข้าประกวดแข่งขัน
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
              :headers="headers"
              :items="items"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.project }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.teacher }}</td>
                <td class="text-xs-left">{{ props.item.student }}</td>
                <td class="text-xs-left">{{ props.item.status }}</td>
                <td class="text-xs-left">
                  <v-btn color="orange" round small dark @click="editProject(props.item.data)" ><v-icon>create</v-icon>Edit</v-btn>
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
        headers: [
          { text: 'โครงการ', align: 'left', sortable: true, value: 'project'},
          { text: 'หัวข้อส่งเข้าประกวด', value: 'name' },
          { text: 'หัวหน้าทีม', value: 'teacher' },
          { text: 'สมาชิกในทีม', value: 'student' },
          { text: 'status', value: 'status' },
          { text: 'action', value: 'id' }
        ]
      }
    },
    computed:{
      items: function(){
        var data_return = [];
        var _project = '';
          var _name = '';
          var _teacher='';
          var _student='';
          var _status = '';
          var _id = 0;
        this.$store.state.projects.forEach(element => {
          _project = element.projectsetup.project;
          _name = element.projectsetup.name;
          _teacher='';
          _student='';
          _status = 'register';
          _id = element.id;
          
          element.member.forEach(ele =>{
            if(ele.role=='teacher'){
              _teacher += " "+ele.name+" "+ele.surname; 
            }
          });
          element.member.forEach(ele =>{
            if(ele.role=='student'){
              _student += " "+ele.name+" "+ele.surname; 
            }
          });

          data_return.push({value: false,project:_project,name:_name,
            teacher: _teacher,student: _student,
            status: _status,id: _id,data:element
          });

        });
        return data_return;
      }
    },
    methods:{
      editProject (input) {
        this.$store.dispatch('acForEditProject',input);
      }
    }
  }
</script>