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
              :complete="1 <= stepSet">
                {{step1.title}}
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
            
            <v-stepper-content step="1">

              <v-flex mb-3>
                <v-alert v-if="step1.result==='pass'" :value="true" type="success">
                  {{ step1.resultMessage }}
                </v-alert>
                <v-alert v-if="step1.result==='fail'" :value="true" type="error">
                  {{ step1.resultMessage }}
                </v-alert>
              </v-flex>
            
              <v-flex pl-5 pr-5 pb-5>
                <!-- code here -->

                <v-layout row mb-5>
                  <v-flex xs12 class="text-xs-center">
                    <h1>{{step1.title}}</h1>
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>โครงการ</p>
                  </v-flex>
                  <v-flex xs10>
                    <h3>{{ project.projectName }}</h3>
                  </v-flex>
                </v-layout>
             
                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>หัวข้อส่งเข้าประกวด</p>
                  </v-flex>
                  <v-flex xs10>
                    <h4>{{ project.topicsName }}</h4>
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>หัวหน้าทีม</p>
                  </v-flex>
                  <v-flex xs10>
                    <p>อาจารย์ {{ step1.teacher.name }} {{ step1.teacher.surname }}</p>
                  </v-flex>
                </v-layout>

                <v-layout row mb-2>
                  <v-flex xs2>
                    <p>สมาชิกในทีม</p>
                  </v-flex>
                  <v-flex xs10>
                    <p v-for=" item in step1.student" :key="item.id">
                      {{ item.name}} {{ item.surname}}
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
                        v-for="item in step1.document"
                        :key="item.name"  
                        @input="deleteDoc1(item)"
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
                              v-for="card in step1.imageData"
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
            { title: 'img', src: 'data:image/jpeg;base64,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', flex: 4 },
            { title: 'img', src: 'data:image/jpeg;base64,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', flex: 4 },
            { title: 'img', src: 'data:image/jpeg;base64,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', flex: 4 }
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


