<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>News</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 mt-3>

         <v-card>
            <v-card-title>
              โครงการ / ข่าว / ประกาศ
              <v-btn to="/ManageNewsEdit" color="success" round small ><v-icon>add</v-icon>create</v-btn>
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
                <td class="text-xs-left">{{ props.item.createAt }}</td>
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.type }}</td>
                <td class="text-xs-left">
                  <v-btn color="orange" to="/ManageNewsEdit" round small dark><v-icon>create</v-icon>Edit</v-btn>
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
          { text: 'วันที่', value: 'createAt' },
          { text: 'หัวข้อข่าว', value: 'title'},
          { text: 'ประเภทข่าว', value: 'type' },
          { text: 'Action', value: 'action' }
        ],
        items: [
          {value: false,_id: 1  ,title:'เปิดรับสมัครโครงการ',type: "project" , createAt: '2018-05-20 23:27:20'},
          {value: false,_id: 2  ,title:'ข่าวอบรมเพิ่มเติมการเขียนโครงการ',type: "news" , createAt: '2018-05-20 23:25:20'},
          {value: false,_id: 3  ,title:'ประกาศผลการสมัครโครงการ',type: "announce" , createAt: '2018-05-20 23:26:20'},
        ]
      }
    }
  }
</script>



