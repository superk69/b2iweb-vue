<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Edit Team</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 mt-3 pa-5 class="grey lighten-4">
        
        <v-layout row>
          <v-flex xs2>
            <v-subheader>ห้ัวข้อส่งเข้าประกวด</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-text-field
              label="หัวข้อ"
              v-model="projectAll.projectsetup.name"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs2>
            <v-subheader>โครงการที่เข้าร่วม</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-select
              label="โครงการ"
              :items="projectList"
              v-model="projectAll.projectsetup.project"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs2>
            <v-subheader>หัวหน้าทีม/ผู้คุมทีม</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-subheader v-for="item in projectAll.member"
             :key="item.id"
             v-if="item.role=='teacher'"
             >
                {{item.name}} {{item.surname}}
             </v-subheader>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs2>
            <v-subheader>สมาชิกในทีม</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-chip
             v-for="item in projectAll.member"
             :key="item.id"
             @input="deleteStudent(item)"
             v-if="item.role=='student'"
             close 
             label>
              {{item.name}} {{item.surname}}
             </v-chip>


            <!-- select student -->
            <v-layout row>
              <v-dialog v-model="dialogSelectStudent" persistent max-width="800px">
                <v-chip outline color="green" slot="activator" small>
                  <v-icon>add</v-icon>add
                </v-chip>
                <v-card>  

                  <v-card>
                    <v-card-title>
                      <span class="headline">Student List</span>
                      <v-spacer></v-spacer>
                      <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="searchStudent"
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="studentHeadersTable"
                      :items="studentAll"
                      :search="searchStudent"
                    >
                      <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.email }}</td>
                        <td class="text-xs-left">{{ props.item.school }}</td>
                        <td class="text-xs-left">
                          <v-chip outline color="green" small @click="selectStudent(props.item.data)">
                            <v-icon>add</v-icon>Add
                            </v-chip>
                        </td>
                      </template>
                      <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ searchStudent }}" found no results.
                      </v-alert>
                    </v-data-table>
                  </v-card>
                  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialogSelectStudent = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>



          </v-flex>
        </v-layout>   

        <v-layout row>
          <v-flex xs12 class="text-xs-center">
            <v-btn round @click="saveProject" color="primary" dark small>Save</v-btn>
            <v-btn to="/ManageTeams" round color="error" dark small>Clear</v-btn>
          </v-flex>
        </v-layout>


      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
  export default {
    data () {
      return {
        dialogSelectStudent: false,
        searchStudent:'',
        projectList: ['Bridge Stone 2 Inventors'],
        studentHeadersTable: [
          { text: 'name', align: 'left', sortable: true, value: 'name'},
          { text: 'email', value: 'email' },
          { text: 'school', value: 'school' },
          { text: 'action', value: 'add' }
        ],
        projectAll: this.$store.state.forEditProject,
      }
    },
    methods: {
      deleteStudent(item){
        console.log(this.projectAll.member.indexOf(item))
        this.projectAll.member.splice(this.projectAll.member.indexOf(item), 1)
      },
      selectStudent(item){
        this.dialogSelectStudent = false;
        var _check = true;
        this.projectAll.member.forEach((user)=>{
          if(user.id===item.id){
            _check=false;
          }
        });
        if(_check){
          this.projectAll.member.push(item);
        }
      },
      saveProject(){
        this.$store.dispatch('acEditTeam',this.projectAll);
      }
    },
    computed:{
      studentAll: function(){
        var data_return = [];
        this.$store.state.users.forEach(element => {
          if(element.role=='student'){
            data_return.push({
              value: false,
              name: element.name,
              surname: element.surname, 
              email: element.email , 
              school: element.school , 
              id: 1,
              data:element
            });
          }
        });
        return data_return;
      }
    }
  }
</script>


