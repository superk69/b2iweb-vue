<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Project List</h1>
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
                  <v-btn color="warning" round small to="/ProjectManage" ><v-icon>create</v-icon>Edit</v-btn>
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
        ],
        items: [
          {value: false,project: 'Bridgstone 2018',name: 'สิ่งประดิษฐ์จากยางพารา',
            teacher: 'นายอาจาย์ หวังดี',student: 'นายดี ใจกล้า,นายมานะ ใจดี,นายสุที ใจสุข',
            status: 'ส่งเอกสารการสมัคร',id: 1
          },
          {value: false,project: 'Bridgstone 2018',name: 'สิ่งประดิษฐ์จากผักตบชวา',
            teacher: 'นายสอง',student: 'นายดี ใจกล้า,นายมานะ ใจดี,นายสุที ใจสุข',
            status: 'ส่งเอกสารการสมัคร',id: 2
          },
          {value: false,project: 'Bridgstone 2018',name: 'สิ่งประดิษฐ์จากต้นยางพารา',
            teacher: 'นางสาม',student: 'นายดี ใจกล้า,นายมานะ ใจดี,นายสุที ใจสุข',
            status: 'ส่งเอกสารการสมัคร',id: 3
          },
          {value: false,project: 'Bridgstone 2018',name: 'สิ่งประดิษฐ์จากต้นกล้วย',
            teacher: 'อาจารย์สี่',student: 'นายดี ใจกล้า,นายมานะ ใจดี,นายสุที ใจสุข',
            status: 'ส่งเอกสารการสมัคร',id: 4
          },
          {value: false,project: 'Bridgstone 2018',name: 'สิ่งประดิษฐ์จากต้นตาล',
            teacher: 'อาจารย์เกรียง',student: 'นายดี ใจกล้า,นายมานะ ใจดี,นายสุที ใจสุข',
            status: 'ส่งเอกสารการสมัคร',id: 5
          }
        ]
      }
    }
  }
</script>


