<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Create Team</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 mt-3 pa-5 class="grey lighten-2">
        
        <v-layout row>
          <v-flex xs2>
            <v-subheader>ห้ัวข้อส่งเข้าประกวด</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-text-field
              name="input-1-3"
              label="Title"
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
        projectList: ['โครงการปีพัฒนาการศึกษา 2018', 'โครงการศึกษาผู้เรียน', 'โครงการ สสวท.'],
        teacherData:{
          email: 'TProjectTest@gmail.com',
          name: 'ปรีชา',
          surname: 'แสนดี',
          school: 'UBU'
        },
        studentData:[
          {id: 1, email: 'somJai@gmail.com',name: 'สมใจ',surname: 'ใจดี', school: 'UBU'},
          {id: 2, email: 'somSuk@gmail.com',name: 'สมศักดิ์',surname: 'ใจสุข', school: 'UBU'},
          {id: 3, email: 'somChai@gmail.com',name: 'สมชัย',surname: 'ใจศรี', school: 'UBU'}
        ]
      }
    },

    methods: {
      deleteStudent(item){
        this.studentData.splice(this.studentData.indexOf(item), 1)
        this.studentData = [...this.studentData]
      }
    }
  }
</script>


