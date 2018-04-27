<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2 mt-12>
        <h1 id="introduction" class="display-1 primary--text">
          <div><p>โครงการที่กำลังดำเนินการ</p></div>
        </h1>
        <div>
          <p> โครงการที่ท่านได้ลงทะเบียนและกำลังอยู่ในขั้นตอนดำเนินการ ท่านสามารถส่ง แก้ไข ลบ ข้อมูลโครงการของท่านได้ตามต้องการ</p>
        </div>
      </v-flex>
    </v-layout>

    <v-layout row mt-2>
      <v-flex xs12 sm8 offset-sm2 mt-12>

         <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
          >
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.teacher }}</td>
              <td class="text-xs-right" v-html="props.item.student">{{ props.item.student }}</td>
              <td class="text-xs-right">{{ props.item.status }}</td>
              <td class="text-xs-right">{{ props.item.date }}</td>
              <td class="text-xs-right">
                <v-btn flat :to="'/ProjectEdit?id='+props.item.id" ><a>จัดการโครงการ</a></v-btn>
                </td>
            </template>
          </v-data-table>

      </v-flex>   
    </v-layout>


  </v-container>
</template>

<script>
/* eslint-disable */ 
export default {
    data () {
      return {
        headers: [
          {text: 'โครงการ', align: 'center', sortable: false,value: 'name'},
          { text: 'อาจารย์', align: 'right', value: 'teacher' },
          { text: 'นักเรียน/นักศึกษา', align: 'right', value: 'student' },
          { text: 'สถานะโครงการ', align: 'center', value: 'status' },
          { text: 'date', align: 'center', value: 'date' },
          { text: 'action', align: 'center', value: 'id' }
        ],
        items: [
          {
            value: false, name: 'โครงการ 1',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข<br>นายสอง ใจดี<br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20', id: 1
          },
          {
            value: false, name: 'โครงการ 2',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20', id: 2 
          },
          {
            value: false, name: 'โครงการ 3',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร' , date: '2017-01-20',id: 3
          },
          {
            value: false, name: 'โครงการ 4',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20', id: 4 
          },
          {
            value: false, name: 'โครงการ 5',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 5 
          },
          {
            value: false, name: 'โครงการ 6',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 6 
          },
          {
            value: false, name: 'โครงการ 7',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 7 
          },
          {
            value: false, name: 'โครงการ 8',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 8 
          },
          {
            value: false, name: 'โครงการ 9',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 9 
          },
          {
            value: false, name: 'โครงการ 10',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 10 
          },
          {
            value: false, name: 'โครงการ 11',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 11 
          },
          {
            value: false, name: 'โครงการ 12',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 12 
          },
          {
            value: false, name: 'โครงการ 13',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 13 
          },
          {
            value: false, name: 'โครงการ 14',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20',id: 14 
          },
          {
            value: false, name: 'โครงการ 15',teacher: 'อาจารย์ 1',
            student: 'นายหนึ่ง ใจสุข <br>นายสอง ใจดี <br>นายสาม ใจงาม',
            status: 'ส่งเอกสารการสมัคร', date: '2017-01-20' ,id: 15 
          }
          
        ]
      }
    }
  }
</script>