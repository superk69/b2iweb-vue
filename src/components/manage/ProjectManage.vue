
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
                Present
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="3"  
              :editable ="3 <= stepSet" 
              :complete="3 <= stepSet">
                Announce
            </v-stepper-step>
            <v-divider></v-divider>

          </v-stepper-header>




          <v-stepper-items>
            
            <v-stepper-content step="1"
              v-for="pitem in projectAll.phasedata"
              :key="pitem.phase"
              v-if="pitem.phase==1">

              <v-flex mb-3>
                <v-alert v-if="pitem.result==='PASS'" :value="true" type="success">
                  {{ messagePass }}
                </v-alert>
                <v-alert v-if="pitem.result==='FAIL'" :value="true" type="error">
                  {{ messageFail }}
                </v-alert>
                <v-alert v-if="pitem.result==='WAIT'" :value="true" type="info">
                  {{ messageWait }}
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
                    v-if="uitem.role==='teacher'">
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
                    v-if="uitem.role==='student'">
                      {{ uitem.name }} {{ uitem.surname }}
                    </p>
                  </v-flex>
                </v-layout>

                <v-layout row mb-5>
                  <v-flex xs2>
                    <p>เอกสาร(.pdf)</p>
                  </v-flex>
                  
                  <v-flex xs10>

                    <v-layout row >
                      <v-chip 
                        v-for="item in pitem.upload"
                        :key="item.id"  
                        v-if="item.type==='PDF'"
                        @input="deleteDoc1(item)"
                        close 
                        label>
                        <a :href="item.path" target="_blank">{{item.name}}</a>  
                      </v-chip>                   
                    </v-layout>

                    <v-layout row mt-2>    

                      <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <v-text-field v-if="p1UpDocName"  :label="p1UpDocName" v-model='p1UpDocReName' prepend-icon='attach_file'></v-text-field>
                        <v-btn @click='pickDocP1' round small color="primary">
                          <v-icon left>file_copy</v-icon>
                          Select File
                        </v-btn> 
                        <v-btn v-if="p1UpDocReName" @click="upDocP1" round small color="success">
                          <v-icon left>cloud_upload</v-icon>Upload
                        </v-btn> 

                      </v-flex>

                    </v-layout>
                    
                  </v-flex>
                </v-layout>

                <v-layout row mb-5>
                  <v-flex xs2>
                    <p>ภาพ(.png/.jpg)</p>
                  </v-flex>
                  
                  <v-flex xs10>

                    <v-layout column >
                       <v-card>
                        <v-container fluid grid-list-md>
                          <v-layout row wrap>
                            <v-flex
                              v-for="card in pitem.upload"
                              :key="card.id" 
                              v-if="card.type==='IMG'"
                              v-bind="{ [`xs4`]: true }"
                            >
                              <v-card>
                                <v-card-media
                                  :src="card.path"
                                  height="200px"
                                >
                                </v-card-media>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn icon @click="deleteImg1(card)">
                                    <v-icon>cancel</v-icon>
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>

                    </v-layout>

                    <v-layout row mt-5>

                      <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                        
                        <img :src="p1UpImgUrl" height="150" v-if="p1UpImgUrl"/>
                        <v-text-field v-if="p1UpImgName" :label="p1UpImgName" v-model='p1UpImgReName' prepend-icon='attach_file'></v-text-field>
                        
                        <v-btn @click="pickImgP1" round small color="primary">
                          <v-icon left>image</v-icon>
                          Select Img
                        </v-btn> 
                        <v-btn v-if="p1UpImgReName" @click="upImgP1" round small color="success">
                          <v-icon left>cloud_upload</v-icon>
                          Upload
                        </v-btn> 

                      </v-flex>

                    </v-layout>
                    
                  </v-flex>
                </v-layout>

                <v-layout row md-2>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="showlogPhase1" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-btn slot="activator" color="primary" round small dark>Log History</v-btn>
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>Log History</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark flat @click.native="showlogPhase1 = false">
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
                            v-model="searchPhase1"
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="headersLogPhase"
                          :items="logPhase1"
                          :search="searchPhase1"
                        >
                          <template slot="items" slot-scope="props">
                            <td>{{ props.item.createAt }}</td>
                            <td class="text-xs-left">{{ props.item.fullName }}</td>
                            <td class="text-xs-left">{{ props.item.email }}</td>
                            <td class="text-xs-left">{{ props.item.role }}</td>
                            <td class="text-xs-left">{{ props.item.action }}</td>
                          </template>
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ searchPhase1 }}" found no results.
                          </v-alert>
                        </v-data-table>
                      </v-card>

                    </v-card>
                  </v-dialog>


                </v-layout>



                <!-- end code -->
              </v-flex>
            </v-stepper-content>

            <v-stepper-content step="2"
              v-for="pitem in projectAll.phasedata"
              :key="pitem.phase"
              v-if="pitem.phase===2">

              <v-flex mb-3>
                <v-alert v-if="pitem.result==='PASS'" :value="true" type="success">
                  {{ messagePass }}
                </v-alert>
                <v-alert v-if="pitem.result==='FAIL'" :value="true" type="error">
                  {{ messageFail}}
                </v-alert>
                <v-alert v-if="pitem.result==='WAIT'" :value="true" type="info">
                  {{ messageWait }}
                </v-alert>
              </v-flex>

              <v-flex pl-5 pr-5 pb-5>
                <!-- code here -->

                <v-layout row mb-5>
                  <v-flex xs12 class="text-xs-center">
                    <h1>Present</h1>
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
                        :key="item.id"  
                        v-if="item.type==='PDF'"
                        @input="deleteDoc2(item)"
                        close 
                        label>
                        <a :href="item.path" target="_blank">{{item.name}}</a>  
                      </v-chip>                   
                    </v-layout>

                    <v-layout row mt-3>    

                      <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <v-text-field v-if="p2UpDocName"  :label="p2UpDocName" v-model='p2UpDocReName' prepend-icon='attach_file'></v-text-field>
                        <v-btn @click='pickDocP2' round small color="primary">
                          <v-icon left>file_copy</v-icon>
                          Select File
                        </v-btn> 
                        <v-btn v-if="p2UpDocReName" @click="upDocP2" round small color="success">
                          <v-icon left>cloud_upload</v-icon>Upload
                        </v-btn> 

                      </v-flex>

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
                          <v-layout row wrap>
                            <v-flex
                              v-for="card in pitem.upload"
                              :key="card.id" 
                              v-bind="{ [`xs4`]: true }"
                              v-if="card.type==='IMG'"
                            >
                              <v-card>
                                <v-card-media
                                  :src="card.path"
                                  height="200px"
                                >
                                </v-card-media>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn icon @click="deleteImg2(card)">
                                    <v-icon>cancel</v-icon>
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>

                    </v-layout>

                    <v-layout row mt-5>

                      <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                        
                        <img :src="p2UpImgUrl" height="150" v-if="p2UpImgUrl"/>
                        <v-text-field v-if="p2UpImgName" :label="p2UpImgName" v-model='p2UpImgReName' prepend-icon='attach_file'></v-text-field>
                        
                        <v-btn @click="pickImgP2" round small color="primary">
                          <v-icon left>image</v-icon>
                          Select Img
                        </v-btn> 
                        <v-btn v-if="p2UpImgReName" @click="upImgP2" round small color="success">
                          <v-icon left>cloud_upload</v-icon>
                          Upload
                        </v-btn> 

                      </v-flex>

                    </v-layout>
                    
                  </v-flex>
                </v-layout>



                <v-layout row md-2>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="showlogPhase2" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-btn slot="activator" color="primary" round small dark>Log History</v-btn>
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>Log History</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <v-btn dark flat @click.native="showlogPhase2 = false">
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
                            v-model="searchPhase2"
                          ></v-text-field>
                        </v-card-title>
                        <v-data-table
                          :headers="headersLogPhase"
                          :items="logPhase2"
                          :search="searchPhase2"
                        >
                          <template slot="items" slot-scope="props">
                            <td>{{ props.item.createAt }}</td>
                            <td class="text-xs-left">{{ props.item.fullName }}</td>
                            <td class="text-xs-left">{{ props.item.email }}</td>
                            <td class="text-xs-left">{{ props.item.role }}</td>
                            <td class="text-xs-left">{{ props.item.action }}</td>
                          </template>
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ searchPhase2 }}" found no results.
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
                  {{ messagePass }}
                </v-alert>
                <v-alert v-if="step3.result==='fail'" :value="true" type="error">
                  {{ messageFail }}
                </v-alert>
                <v-alert v-if="step3.result==='wait'" :value="true" type="info">
                  {{ messageWait }}
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

    <input
      type="file"
      style="display: none"
      ref= "docP1"
      accept=".pdf"
      @change="onDocP1"
    >
    <input
      type="file"
      style="display: none"
      ref= "imgP1"
      accept="image/*"
      @change="onImgP1"
    >
    <input
      type="file"
      style="display: none"
      ref= "docP2"
      accept=".pdf"
      @change="onDocP2"
    >
    <input
      type="file"
      style="display: none"
      ref= "imgP2"
      accept="image/*"
      @change="onImgP2"
    >
  </v-container>
</template>

<script>
/* eslint-disable */
  export default {
    data () {
      return {
          stepSet: 3, //step set
          stepIndex: 2, //step click
          messagePass: 'ผ่าน ห้วข้อโปรเจคได้ผ่านการตรวจพิจารณาจากคณะกรรมการแล้ว',
          messageFail: 'ไม่ผ่าน หัวข้อโปรเจคได้รับการตรวจสอบจากคณะกรรมการแล้วว่าไม่ผ่าน',
          messageWait: 'อยู่ในขั้นตอนดำเนินการ',
          projectAll: this.$store.state.forEditProject,
          showlogPhase1:false,
          searchPhase1: '',

          p1UpDocReName: '',
          p1UpDocName: '',
          p1UpDocUrl: '',
          p1UpDocFile: '',

          p1UpImgReName: '',
          p1UpImgName: '',
          p1UpImgUrl: '',
          p1UpImgFile: '',

          p2UpDocReName: '',
          p2UpDocName: '',
          p2UpDocUrl: '',
          p2UpDocFile: '',
          
          p2UpImgReName: '',
          p2UpImgName: '',
          p2UpImgUrl: '',
          p2UpImgFile: '',

          showlogPhase2:false,
          searchPhase2: '',
          headersLogPhase: [
            { text: 'date', value: 'createAt', align: 'left',},
            { text: 'name', value: 'fullName' },
            { text: 'email', value: 'email' },
            { text: 'role', value: 'role' },
            { text: 'action', value: 'action' },
          ],
         step3:{
          title: 'Present',  
          result: 'wait',//pass , fail , ....
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
         },

        imageName: '',
        imageUrl: '',
        imageFile: ''

      }
    },
    methods: {
      //------ phase 1 ---------
      pickDocP1 () {
        this.$refs.docP1.click();
      },
      onDocP1(e){
        const files = e.target.files
        if(files[0] !== undefined) {
          this.p1UpDocName = files[0].name
          if(this.p1UpDocName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.p1UpDocUrl = fr.result
            this.p1UpDocFile = files[0] // this is an image file that can be sent to server...
            this.p1UpDocReName = this.p1UpDocName.substring(0,this.p1UpDocName.lastIndexOf('.'))
          })
        } else {
          this.p1UpDocReName= ''
          this.p1UpDocName = ''
          this.p1UpDocFile = ''
          this.p1UpDocUrl = ''
        }
      },
      upDocP1(){
        this.p1UpDocReName= ''
        this.p1UpDocName = ''
        this.p1UpDocFile = ''
        this.p1UpDocUrl = ''
      },
      
      pickImgP1 () {
        this.$refs.imgP1.click();
      },
      onImgP1(e){
        const files = e.target.files
        if(files[0] !== undefined) {
          this.p1UpImgName = files[0].name
          if(this.p1UpImgName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.p1UpImgUrl = fr.result
            this.p1UpImgFile = files[0] // this is an image file that can be sent to server...
            this.p1UpImgReName = this.p1UpImgName.substring(0,this.p1UpImgName.lastIndexOf('.'))
          })
        } else {
          this.p1UpImgReName= ''
          this.p1UpImgName = ''
          this.p1UpImgFile = ''
          this.p1UpImgUrl = ''
        }
      },
      upImgP1(){
        this.p1UpImgReName= ''
        this.p1UpImgName = ''
        this.p1UpImgFile = ''
        this.p1UpImgUrl = ''
      },
      //------ phase 2 ----------
      pickDocP2 () {
        this.$refs.docP2.click();
      },
      onDocP2(e){
        const files = e.target.files
        if(files[0] !== undefined) {
          this.p2UpDocName = files[0].name
          if(this.p2UpDocName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.p2UpDocUrl = fr.result
            this.p2UpDocFile = files[0] // this is an image file that can be sent to server...
            this.p2UpDocReName = this.p2UpDocName.substring(0,this.p2UpDocName.lastIndexOf('.'))
          })
        } else {
          this.p2UpDocReName= ''
          this.p2UpDocName = ''
          this.p2UpDocFile = ''
          this.p2UpDocUrl = ''
        }
      },
      upDocP2(){
        this.p2UpDocReName= ''
        this.p2UpDocName = ''
        this.p2UpDocFile = ''
        this.p2UpDocUrl = ''
      },

      pickImgP2 () {
        this.$refs.imgP2.click();
      },
      onImgP2(e){
        const files = e.target.files
        if(files[0] !== undefined) {
          this.p2UpImgName = files[0].name
          if(this.p2UpImgName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.p2UpImgUrl = fr.result
            this.p2UpImgFile = files[0] // this is an image file that can be sent to server...
            this.p2UpImgReName = this.p2UpImgName.substring(0,this.p2UpImgName.lastIndexOf('.'))
          })
        } else {
          this.p2UpImgReName= ''
          this.p2UpImgName = ''
          this.p2UpImgFile = ''
          this.p2UpImgUrl = ''
        }
      },
      upImgP2(){
        this.p2UpImgReName= ''
        this.p2UpImgName = ''
        this.p2UpImgFile = ''
        this.p2UpImgUrl = ''
      },


      deleteDoc1(item){
        // this.step1.document.splice(this.step1.document.indexOf(item), 1)
        // this.step1.document = [...this.step1.document]
      },
      deleteImg1(item){
        // this.step1.imageData.splice(this.step1.imageData.indexOf(item), 1)
        // this.step1.imageData = [...this.step1.imageData]
      },
      deleteDoc2(item){
        // this.step2.documentData.splice(this.step2.documentData.indexOf(item), 1)
        // this.step2.documentData = [...this.step2.documentData]
      },
      deleteImg2(item){
        // this.step2.imageData.splice(this.step2.imageData.indexOf(item), 1)
        // this.step2.imageData = [...this.step2.imageData]
      }
    },
    computed:{

      logPhase1: function(){
        var data_return = [];
        this.projectAll.phasedata.forEach(element => {
          if(element.phase===1){
            element.log.forEach(ele=>{
              data_return.push({
                createAt: ele.createAt,
                username: ele.member.username,
                fullName: ele.member.name+' '+ele.member.username,
                email: ele.member.email,
                role: ele.member.role,
                action: ele.action,
              });
            });
          }
        });
        return data_return;
      },
      logPhase2: function(){
        var data_return = [];
        this.projectAll.phasedata.forEach(element => {
          if(element.phase===2){
            element.log.forEach(ele=>{
              data_return.push({
                createAt: ele.createAt,
                username: ele.member.username,
                fullName: ele.member.name+' '+ele.member.username,
                email: ele.member.email,
                role: ele.member.role,
                action: ele.action,
              });
            });
          }
        });
        return data_return;
      }


    }
  }
</script>


