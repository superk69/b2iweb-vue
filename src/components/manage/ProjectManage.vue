<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Manage Project</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 mt-3 class="grey lighten-4">
        

        <v-stepper v-model="stepIndex">
          <v-stepper-header>
            <v-stepper-step step="1" 
              :editable ="1 <= stepSet" 
              :complete="1 <= stepSet"
              >
                Register
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="2"  
              :editable ="2 <= stepSet" 
              :complete="2 <= stepSet">
                {{step2.title}}
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="3"  
              :editable ="3 <= stepSet" 
              :complete="3 <= stepSet">
                {{step3.title}}
            </v-stepper-step>
            <v-divider></v-divider>

          </v-stepper-header>

          <v-stepper-items>
            
            <v-stepper-content step="1"
              v-for="pitem in projectAll.phasedata"
              :key="pitem.phase"
              v-if="pitem.phase==1"
            >

              <v-flex mb-3>
                <v-alert v-if="pitem.result==='PASS'" :value="true" type="success">
                  ห้วข้อโปรเจค ผ่านการตรวจสอบแล้ว
                </v-alert>
                <v-alert v-if="pitem.result==='FAIL'" :value="true" type="error">
                  หัวข้อโปรเจค ไม่ผ่านการตรวจสอบ
                </v-alert>
              </v-flex>
            
              <v-flex pl-5 pr-5 pb-5>
                <!-- code here -->

                <v-layout row mb-5>
                  <v-flex xs12 class="text-xs-center">
                    <h1>Register</h1>
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>โครงการ</p>
                  </v-flex>
                  <v-flex xs10>
                    <h3>{{ projectAll.projectsetup.project }}</h3>
                  </v-flex>
                </v-layout>
             
                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>หัวข้อส่งเข้าประกวด</p>
                  </v-flex>
                  <v-flex xs10>
                    <h4>{{ projectAll.projectsetup.name }}</h4>
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>หัวหน้าทีม</p>
                  </v-flex>
                  <v-flex xs10>
                    <p v-for="uitem in projectAll.member"
                    :key="uitem.id"
                    v-if="uitem.role=='teacher'">
                      อาจารย์ {{ uitem.name }} {{ uitem.surname }}
                    </p>
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>สมาชิกในทีม</p>
                  </v-flex>
                  <v-flex xs10>
                    <p v-for="uitem in projectAll.member"
                    :key="uitem.id"
                    v-if="uitem.role=='student'">
                      {{ uitem.name }} {{ uitem.surname }}
                    </p>
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>เอกสาร(.pdf)</p>
                  </v-flex>
                  
                  <v-flex xs10>

                    <v-layout row >
                      <v-chip 
                        v-for="item in pitem.upload"
                        :key="item.name"  
                        v-if="item.type=='PDF'"
                        @input="deleteDoc1(item)"
                        close 
                        label>
                        <a :href="item.path" target="_blank">{{item.name}}</a>
                          
                      </v-chip>                   
                    </v-layout>

                    <v-layout row >
                      <v-text-field
                        id="testing"
                        name="input-1"
                        label="ชื่อเอกสาร"
                      ></v-text-field>
                    </v-layout>
                    <v-layout row >
                      pdf-20-32-34.pdf
                      <v-btn round  color="primary" small>
                        <v-icon>attachment</v-icon>Upload
                      </v-btn>
                    </v-layout>
                    
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>ภาพ(.png/.jpg)</p>
                  </v-flex>
                  
                  <v-flex xs10>

                    <v-layout column >
                       <v-card>
                        <v-container fluid grid-list-md>
                          <v-layout>
                            <v-flex
                              v-for="card in pitem.upload"
                              v-if="card.type=='IMG'"
                              v-bind="{ [`xs4`]: true }"
                              :key="card.name"
                            >
                              <v-card>
                                <v-card-media
                                  :src="card.path"
                                  height="200px"
                                >
                                </v-card-media>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="error" icon @click="deleteImg1(card)">
                                    <v-icon>block</v-icon>
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>

                    </v-layout>

                    <v-layout row >
                      test.jpg
                      <v-btn round  color="success" small>
                        <v-icon>group</v-icon>Upload
                      </v-btn>
                    </v-layout>
                    
                  </v-flex>
                </v-layout>

                <v-layout row md-2>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="step1.showLog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-btn slot="activator" color="primary" round small dark>Log History</v-btn>
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>Log History</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark flat @click.native="step1.showLog = false">
                            <v-icon>close</v-icon>
                            Close
                          </v-btn>
                        </v-toolbar-items>
                      </v-toolbar>
                      
                      <v-card>
                        <v-card-title>
                          <h2>ข้อมูลการทำงานของสมาชิก</h2>
                          <v-spacer></v-spacer>
                          <v-text-field
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                            v-model="step1.logSearch"
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="step1.logHeaders"
                          :items="step1.logs"
                          :search="step1.logSearch"
                        >
                          <template slot="items" slot-scope="props">
                            <td>{{ props.item.createAt }}</td>
                            <td class="text-xs-left">{{ props.item.name }} {{ props.item.surname }}</td>
                            <td class="text-xs-left">{{ props.item.logDetail }}</td>
                          </template>
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ step1.logSearch }}" found no results.
                          </v-alert>
                        </v-data-table>
                      </v-card>

                    </v-card>
                  </v-dialog>


                </v-layout>



                <!-- end code -->
              </v-flex>
            </v-stepper-content>

            <v-stepper-content step="2">

              <v-flex mb-3>
                <v-alert v-if="step2.result==='pass'" :value="true" type="success">
                  {{ step2.resultMessage }}
                </v-alert>
                <v-alert v-if="step2.result==='fail'" :value="true" type="error">
                  {{ step2.resultMessage }}
                </v-alert>
              </v-flex>

              <v-flex pl-5 pr-5 pb-5>
                <!-- code here -->

                <v-layout row mb-5>
                  <v-flex xs12 class="text-xs-center">
                    <h1>{{project.topicsName}}</h1>
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>เอกสาร(.pdf)</p>
                  </v-flex>
                  
                  <v-flex xs10>

                    <v-layout row >
                      <v-chip 
                        v-for="item in step2.documentData"
                        :key="item.name"  
                        @input="deleteDoc2(item)"
                        close 
                        label>
                        <router-link :to="item.path">{{item.name}}</router-link>
                          
                      </v-chip>                   
                    </v-layout>

                    <v-layout row >
                      <v-text-field
                        id="testing"
                        name="input-1"
                        label="ชื่อเอกสาร"
                      ></v-text-field>
                    </v-layout>
                    <v-layout row >
                      pdf-20-32-34.pdf
                      <v-btn round  color="primary" small>
                        <v-icon>attachment</v-icon>Upload
                      </v-btn>
                    </v-layout>
                    
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>ภาพ(.png/.jpg)</p>
                  </v-flex>
                  
                  <v-flex xs10>

                    <v-layout column >
                       <v-card>
                        <v-container fluid grid-list-md>
                          <v-layout>
                            <v-flex
                              v-for="card in step2.imageData"
                              v-bind="{ [`xs${card.flex}`]: true }"
                              :key="card.title"
                            >
                              <v-card>
                                <v-card-media
                                  :src="card.src"
                                  height="200px"
                                >
                                </v-card-media>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="error" icon @click="deleteImg2(card)">
                                    <v-icon>block</v-icon>
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>

                    </v-layout>

                    <v-layout row >
                      test.jpg
                      <v-btn round  color="success" small>
                        <v-icon>group</v-icon>Upload
                      </v-btn>
                    </v-layout>
                    
                  </v-flex>
                </v-layout>



                <v-layout row md-2>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="step2.showLog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-btn slot="activator" color="primary" round small dark>Log History</v-btn>
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>Log History</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark flat @click.native="step2.showLog = false">
                            <v-icon>close</v-icon>
                            Close
                          </v-btn>
                        </v-toolbar-items>
                      </v-toolbar>
                      
                      <v-card>
                        <v-card-title>
                          <h2>ข้อมูลการทำงานของสมาชิก</h2>
                          <v-spacer></v-spacer>
                          <v-text-field
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                            v-model="step2.logSearch"
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="step2.logHeaders"
                          :items="step2.logs"
                          :search="step2.logSearch"
                        >
                          <template slot="items" slot-scope="props">
                            <td>{{ props.item.createAt }}</td>
                            <td class="text-xs-left">{{ props.item.name }} {{ props.item.surname }}</td>
                            <td class="text-xs-left">{{ props.item.logDetail }}</td>
                          </template>
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ step2.logSearch }}" found no results.
                          </v-alert>
                        </v-data-table>
                      </v-card>

                    </v-card>
                  </v-dialog>


                </v-layout>



                <!-- end code -->
              </v-flex>

            </v-stepper-content>

            <v-stepper-content step="3">
              
              <v-flex mb-3>
                <v-alert v-if="step3.result==='pass'" :value="true" type="success">
                  {{ step3.resultMessage }}
                </v-alert>
                <v-alert v-if="step3.result==='fail'" :value="true" type="error">
                  {{ step3.resultMessage }}
                </v-alert>
              </v-flex>



              <v-card>
                  <v-card-title>
                    <h2>ประกาศผลการแข่งขัน</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                      v-model="step3.search"
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="step3.headers"
                    :items="step3.projectRank"
                    :search="step3.search"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.rank }}</td>
                      <td class="text-xs-left">{{ props.item.projectName }}</td>
                      <td class="text-xs-left">{{ props.item.school }}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ step3.search }}" found no results.
                    </v-alert>
                </v-data-table>
              </v-card>



            </v-stepper-content>


          </v-stepper-items>


        </v-stepper>
        


  
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
  export default {
    data () {
      return {
         stepSet: 3, //step set
         stepIndex: 1, //step click
         projectAll: this.$store.state.forEditProject,
         project: {
           projectId: 1,
           projectName: 'Bridge Stone 2 Inventors',
           topicsId: 1,
           topicsName: 'โครงงานปลาจากต้นกลัวย'
         },
         step1:{
          title: 'Register',
          result: 'pass',//pass , fail , ....
          resultMessage:'หัวข้อโปรเจค ผ่านการตรวจสอบแล้ว',
          teacher:{
            id: 1,
            email: 'TProjectTest@gmail.com',
            name: 'ปรีชา',
            surname: 'แสนดี',
            school: 'UBU'
          },
          student:[
            {id: 1, email: 'somJai@gmail.com',name: 'สมใจ',surname: 'ใจดี', school: 'UBU'},
            {id: 2, email: 'somSuk@gmail.com',name: 'สมศักดิ์',surname: 'ใจสุข', school: 'UBU'},
            {id: 3, email: 'somChai@gmail.com',name: 'สมชัย',surname: 'ใจศรี', school: 'UBU'}
          ],
          document:[
            {name: 'ใบสมัครโคงการ', path: '/'},
            {name: 'เอกสารโครงการ', path: '/'},
            {name: 'ใบสมัครทีม', path: '/'}
          ],
          imageData:[
            { title: 'img', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 },
            { title: 'img', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 },
            { title: 'img', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 }
          ],
          showLog: false,
          logSearch: '',
          logHeaders: [
            { text: 'date', value: 'createAt', align: 'left',},
            { text: 'user', value: 'user' },
            { text: 'action', value: 'action' },
          ],
          logs:[
            { logDetail:'upload image 12563.png', name: 'สังคม' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'สังคม' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'สังคม' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'สังคม' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'สังคม' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'สังคม' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'สังคม' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'}
          ]
         },
         step2:{
          title: 'Present',
          result: '....',//pass , fail , ....
          resultMessage:'กำลังดำเนินการ',
          documentData:[
            {name: 'วัตถุประสงค์โครงการ', path: '/'},
            {name: 'ขอบเขตโครงการ', path: '/'},
            {name: 'ขั้นตอนการปฏิบัติ', path: '/'}
          ],
          imageData:[
            {title:'img',src: 'https://img3.stockfresh.com/files/k/krisdog/m/21/6241931_stock-vector-bookworm-education-concept.jpg', flex: 4 },
            {title:'img',src: 'https://img3.stockfresh.com/files/k/krisdog/m/21/6241931_stock-vector-bookworm-education-concept.jpg', flex: 4 },
            {title:'img',src: 'https://img3.stockfresh.com/files/k/krisdog/m/21/6241931_stock-vector-bookworm-education-concept.jpg', flex: 4 }
          ],
          showLog: false,
          logSearch: '',
          logHeaders: [
            { text: 'date', value: 'createAt', align: 'left',},
            { text: 'user', value: 'user' },
            { text: 'action', value: 'action' },
          ],
          logs:[
            { logDetail:'upload pdf 265.pdf', name: 'มานะ' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'มานะ' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'มานะ' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'มานะ' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'มานะ' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'มานะ' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'},
            { logDetail:'upload image 12563.png', name: 'มานะ' , surname: 'แซ่ด่วง' , createAt: '2018-05-13 25:35:25'}
          ]

         },
         step3:{
          title: 'Present',  
          result: 'pass',//pass , fail , ....
          resultMessage:'หัวข้อโปรเจคได้อันดับรองชนะเลิศอันดับที่ 1',    
          search: '',
          title: 'Announce',
          headers: [
            { text: 'อันดับที่', value: 'rank', align: 'left', sortable: false},
            { text: 'หัวข้อส่งเข้าประกวด', value: 'name', sortable:false },
            { text: 'โรงเรียน', value: 'school', sortable:false },
          ],
          projectRank:[
            {id:23, rank: 'ชนะเลิศ' , projectName: "โครงการรถไฟฟ้า" ,school: "โรงเรียนบ้านนามน"},
            {id:25, rank: 'รองชนะเลิศอันดับที่ 1' , projectName: "โครงการดอกไม้จากกระดาษ" ,school: "โรงเรียนบ้านหนองแสง"},
            {id:64, rank: 'รองชนะเลิศอันดับที่ 2' , projectName: "โครงการผักตบชวาสร้างไฟฟ้า" , school: "โรงเรียนบ้านม่วงสามสิบ"},
            {id:36, rank: 'ชมเชย 1' , projectName: "โครงการเครื่องบำบัดน้ำด้วยต้นกก" , school: "โรงเรียนบ้านบ้านศรีไคร"},
            {id:85798, rank: 'ชมเชย 2' , projectName: "โครงการโปรแกรมหุ้นยนต์ขุดดิน" , school: "โรงเรียนบ้านมาเมือง"},
            {id:5848, rank: 'ชมเชย 3' , projectName: "โครงการหุ่นยนต์ชำระเงิน" , school: "โรงเรียนบ้านบ้านดอน"}
          ]     
         }
      }
    },
    methods: {
      deleteDoc1(item){
        this.step1.document.splice(this.step1.document.indexOf(item), 1)
        this.step1.document = [...this.step1.document]
      },
      deleteImg1(item){
        this.step1.imageData.splice(this.step1.imageData.indexOf(item), 1)
        this.step1.imageData = [...this.step1.imageData]
      },
      deleteDoc2(item){
        this.step2.documentData.splice(this.step2.documentData.indexOf(item), 1)
        this.step2.documentData = [...this.step2.documentData]
      },
      deleteImg2(item){
        this.step2.imageData.splice(this.step2.imageData.indexOf(item), 1)
        this.step2.imageData = [...this.step2.imageData]
      }
    }
  }
</script>


