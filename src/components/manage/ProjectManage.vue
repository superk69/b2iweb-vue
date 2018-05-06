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

                    <v-layout row >

                       <v-card>
                        <v-container fluid grid-list-md>
                          <v-layout row wrap>
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
                                  <v-container fill-height fluid>
                                    <v-layout fill-height>
                                      <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text" v-text="card.title"></span>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-media>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn icon></v-btn>
                                  <v-btn icon></v-btn>
                                  <v-btn icon>
                                    <v-icon>favorite</v-icon>
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
              xxx3
            </v-stepper-content>

            <v-stepper-content step="4">
              xxx4
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
         stepSet: 2, //step set
         stepIndex: 2, //step click
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
            { title: '', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 },
            { title: '', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 },
            { title: '', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FL2gZkq9wT_LuwQYCDTEpj7BXe1oVCS8YGuTT9C4Xt8sySgs1A', flex: 4 }
          ]

         },
         step3:{
          title: 'Present'          
         },
         step4:{
          title: 'Announce'            
         }
      }
    },
    methods: {
      deleteDoc(item){
        this.step2.documentData.splice(this.step2.documentData.indexOf(item), 1)
        this.step2.documentData = [...this.step2.documentData]
      }
    }
  }
</script>


