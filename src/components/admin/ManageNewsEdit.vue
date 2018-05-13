<template>
  <v-container fluid mb-5>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Edit News</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 mt-3 pa-5 class="grey lighten-4">

        <v-layout row mb-2>
          <v-flex xs2>
            <v-subheader>หัวข้อ</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-text-field
              name="input-title"
              label="หัวข้อข่าว ประกาศ โปรเจค"
              :value="title"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row mb-2>
          <v-flex xs2>
            <v-subheader>ประเภท</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-select
              label="ประเภท"
              :items="typeList"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row mb-2>
          <v-flex xs2>
            <p>เอกสาร(.pdf)</p>
          </v-flex>
                  
          <v-flex xs10>

            <v-layout row >
              <v-chip 
                v-for="item in document"
                :key="item.nameFile"  
                @input="deleteDoc(item)"
                close 
                label>
                  <router-link :to="item.path">{{item.nameFile}}</router-link>
                      
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
                    v-for="card in image"
                    v-bind="{ [`xs${card.flex}`]: true }"
                    :key="card.title"
                    >
                      <v-card>
                        <v-card-media
                        :src="card.src"
                        height="200px">
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
       
        <v-layout row mb-2>
          <p>
            Detail
          </p>   
          <v-text-field
          name="input-detail"
          label="Detail"
          multi-line
          ></v-text-field>
        </v-layout>

        <v-layout row mb-2>
          <v-flex xs12 class="text-xs-center red--text">
              <v-btn round color="success" @click="edit=!edit" dark>
                <v-icon left>save</v-icon>
                Save
              </v-btn>
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
      title: '',
      typeList: ['news','announce','project'],
      detail: '',
      image:[
        {}
      ],
      document:[
        {nameFile:"เอกสารใบสมัคร" ,path: '/'}
      ],
      image:[
        {title:'img',src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzthftpLn_QaCKMjJlcXhKDslSqoCCG5vkiadcBb7c8H7WbLt1w', flex: 4 },
        {title:'img',src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzthftpLn_QaCKMjJlcXhKDslSqoCCG5vkiadcBb7c8H7WbLt1w', flex: 4 },
        {title:'img',src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzthftpLn_QaCKMjJlcXhKDslSqoCCG5vkiadcBb7c8H7WbLt1w', flex: 4 }
      ]
    }
  },
  methods: {
    deleteDoc(item){
      this.document.splice(this.document.indexOf(item), 1)
      this.document = [...this.document]
    }
  }
}
</script>



