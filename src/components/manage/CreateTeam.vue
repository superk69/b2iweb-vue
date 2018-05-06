<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Create Team</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 mt-3 pa-5 class="grey lighten-4">
        
        <v-layout row>
          <v-flex xs2>
            <v-subheader>ห้ัวข้อส่งเข้าประกวด</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-text-field
              name="input-1-3"
              label="Title"
              :value="projectName"
              single-line
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
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs2>
            <v-subheader>หัวหน้าทีม/ผู้คุมทีม</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-subheader>{{teacherData.name}} {{teacherData.surname}}</v-subheader>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs2>
            <v-subheader>สมาชิกในทีม</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-chip
             v-for="item in studentData"
             :key="item.id"
             @input="deleteStudent(item)"
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
                          <v-chip outline color="green" small @click="selectStudent(props.item)">
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
          <v-flex xs2>
            <v-subheader>เอกสารการสมัคร</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-chip
             v-for="item in documentData"
             :key="item.name"
             @input="deleteDoc(item)"
             close 
             label>
                {{item.name}}
            </v-chip>


            <!--  upload document -->
            <v-layout row>
              <v-chip outline color="blue" small>
                  <v-icon>attachment</v-icon>Upload
                </v-chip>
            </v-layout>



          </v-flex>
        </v-layout> 


        <v-layout row>
          <v-flex xs2>
            <v-subheader>ภาพประกอบการสมัคร</v-subheader>
          </v-flex>
          <v-flex xs10>


            <!--  upload image -->
            <v-layout row>
              <v-chip outline color="red" small>
                  <v-icon>file_upload</v-icon>Upload
                </v-chip>
            </v-layout>



          </v-flex>
        </v-layout> 

        <v-layout row>
          <v-flex xs12 class="text-xs-center">
            <v-btn round color="primary" dark small>Save</v-btn>
            <v-btn round color="error" dark small>Clear</v-btn>
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
        searchStudent: '',
        projectName: '',
        projectList: ['โครงการปีพัฒนาการศึกษา 2018', 'โครงการศึกษาผู้เรียน', 'โครงการ สสวท.'],
        teacherData:{
          id: 123,
          email: 'TProjectTest@gmail.com',
          name: 'ปรีชา',
          surname: 'แสนดี',
          school: 'UBU'
        },
        studentData:[
          {id: 1, email: 'somJai@gmail.com',name: 'สมใจ',surname: 'ใจดี', school: 'UBU'},
          {id: 2, email: 'somSuk@gmail.com',name: 'สมศักดิ์',surname: 'ใจสุข', school: 'UBU'},
          {id: 3, email: 'somChai@gmail.com',name: 'สมชัย',surname: 'ใจศรี', school: 'UBU'}
        ],
        studentHeadersTable: [
          { text: 'name', align: 'left', sortable: true, value: 'name'},
          { text: 'email', value: 'email' },
          { text: 'school', value: 'school' },
          { text: 'action', value: 'add' }
        ],
        studentAll: [
          {value: false,name: 'นายดี',surname: 'ใจดี', email: 'Dee@gmail.com' , school: 'UBU' , id: 1 },
          {value: false,name: 'นายมานะ',surname: 'ใจสุข', email: 'mana@gmail.com' , school: 'UBU' , id: 2 },
          {value: false,name: 'นายทำดี',surname: 'ใจกล้า', email: 'tamD@gmail.com' , school: 'UBU' , id: 3 },
          {value: false,name: 'นายปัญญา',surname: 'มงคล', email: 'PPYa@gmail.com' , school: 'UBU' , id: 4 },
          {value: false,name: 'น.ส.สมศรี',surname: 'สมใจ', email: 'SOMS@gmail.com' , school: 'UBU' , id: 5 },
          {value: false,name: 'นายบุญเติม',surname: 'กล้าหาญ', email: 'BT@gmail.com' , school: 'UBU' , id: 6 },
          {value: false,name: 'น.ส.ฤดี',surname: 'ทำดี', email: 'AADEE@gmail.com' , school: 'UBU' , id: 7 }
        ],
        documentData:[
          {name: 'เอกสารลงทะเบียน', path: '/doc/124552.pdf'},
          {name: 'เอกสารสมาชิก', path: '/doc/124552.pdf'},
          {name: 'เอกสารประกอบ', path: '/doc/124552.pdf'}
        ]
      }
    },
    methods: {
      deleteStudent(item){
        this.studentData.splice(this.studentData.indexOf(item), 1)
        this.studentData = [...this.studentData]
      },
      selectStudent(item){
        this.dialogSelectStudent = false;
        this.studentData.push({id: item.id, email: item.email,name: item.name,surname: item.surname, school: item.school});
        this.studentData = [...this.studentData]
      },
      deleteDoc(item){
        this.documentData.splice(this.documentData.indexOf(item), 1)
        this.documentData = [...this.documentData]
      },
    }
  }
</script>


