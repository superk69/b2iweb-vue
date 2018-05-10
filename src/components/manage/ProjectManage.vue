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

            <v-stepper-step step="4"  
              :editable ="4 <= stepSet" 
              :complete="4 <= stepSet">
                {{step4.title}}
            </v-stepper-step>

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
                    <p>เอกสารการสมัคร</p>
                  </v-flex>
                  <v-flex xs10>
                    <p v-for="item in step1.document" :key="item.name">
                      <v-icon>attachment</v-icon>
                      <router-link :to="item.path">{{ item.name }}</router-link>
                    </p>
                  </v-flex>
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
                        @input="deleteDoc(item)"
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
                                  <v-btn color="error" icon @click="deleteImg(card)">
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
                  <h2>ประกาศผลทีมผ่านการคัดเลือก</h2>
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
                      <td class="text-xs-left">{{ props.item.projectName }}</td>
                      <td class="text-xs-left">{{ props.item.school }}</td>
                      <td class="text-xs-left">
                        
                        <v-chip v-if="props.item.status=='pass'" color="green" text-color="white">
                          <v-avatar class="green darken-4">
                            <v-icon>check_circle_outline</v-icon>
                          </v-avatar>
                          Pass
                        </v-chip>
                        <v-chip v-else-if="props.item.status=='fail'" color="red" text-color="white">
                          <v-avatar class="red darken-4">
                            <v-icon>check_circle_outline</v-icon>
                          </v-avatar>
                          Fail
                        </v-chip>
                        <v-chip v-else color="orange" text-color="white">
                          <v-avatar class="orange darken-4">
                            <v-icon>check_circle_outline</v-icon>
                          </v-avatar>
                          Wait
                        </v-chip>


                      </td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ step3.search }}" found no results.
                    </v-alert>
                </v-data-table>
              </v-card>



            </v-stepper-content>

            <v-stepper-content step="4">
              
              <v-card>
                  <v-card-title>
                    <h2>ประกาศผลการแข่งขัน</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                      v-model="step4.search"
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="step4.headers"
                    :items="step4.projectRank"
                    :search="step4.search"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.rank }}</td>
                      <td class="text-xs-left">{{ props.item.projectName }}</td>
                      <td class="text-xs-left">{{ props.item.school }}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ step4.search }}" found no results.
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
         stepSet: 4, //step set
         stepIndex: 4, //step click
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
          ]
         },
         step2:{
          title: 'Send Doc',
          result: '....',//pass , fail , ....
          resultMessage:'กำลังดำเนินการ',
          documentData:[
            {name: 'วัตถุประสงค์โครงการ', path: '/'},
            {name: 'ขอบเขตโครงการ', path: '/'},
            {name: 'ขั้นตอนการปฏิบัติ', path: '/'}
          ],
          imageData:[
            { title: 'img', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 },
            { title: 'img', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 },
            { title: 'img', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 }
          ]

         },
         step3:{
          title: 'Present',  
          result: 'pass',//pass , fail , ....
          resultMessage:'หัวข้อได้ผ่านการตรวจสอบจากคณะกรรมแล้วให้ผ่านเข้าสู่รอบการนำเสนอโครงการ',
          search:'',     
          headers: [
            { text: 'หัวข้อส่งเข้าประกวด', value: 'name'},
            { text: 'โรงเรียน', value: 'school'},
            { text: 'ผลการตรวจสอบ', value: 'status'},
          ],
          projectRank:[
            {id:23, projectName: "โครงการรถไฟฟ้า" ,school: "โรงเรียนบ้านนามน" ,status: 'fail'},
            {id:25, projectName: "โครงการดอกไม้จากกระดาษ" ,school: "โรงเรียนบ้านหนองแสง" , status: 'pass'},
            {id:64, projectName: "โครงการผักตบชวาสร้างไฟฟ้า" , school: "โรงเรียนบ้านม่วงสามสิบ" , status: 'wait'},
            {id:36, projectName: "โครงการเครื่องบำบัดน้ำด้วยต้นกก" , school: "โรงเรียนบ้านบ้านศรีไคร" , status: 'pass'},
            {id:85798, projectName: "โครงการโปรแกรมหุ้นยนต์ขุดดิน" , school: "โรงเรียนบ้านมาเมือง" , status: 'fail'},
            {id:5848, projectName: "โครงการหุ่นยนต์ชำระเงิน" , school: "โรงเรียนบ้านบ้านดอน" , status: 'pass'}
          ]     
         },
         step4:{
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
      deleteDoc(item){
        this.step2.documentData.splice(this.step2.documentData.indexOf(item), 1)
        this.step2.documentData = [...this.step2.documentData]
      },
      deleteImg(item){
        this.step2.imageData.splice(this.step2.imageData.indexOf(item), 1)
        this.step2.imageData = [...this.step2.imageData]
      }
    }
  }
</script>


