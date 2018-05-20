<template>
  <v-container fluid mb-5 class="grey lighten-4">
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 mt-3>
        
        <v-flex mb-5>
          <v-carousel>
            <v-carousel-item v-for="item in postProject.upload" v-if="item.uploadtype==='IMG'" :src="item.path" :key="item.id"></v-carousel-item>
          </v-carousel>

          <v-card>
            <v-card-title primary-title>
              <div class="headline text-xs-center">{{ postProject.title }}</div>
            </v-card-title>
            <v-card-text>
              {{ postProject.details }}
            </v-card-text>
            <v-card-actions>
              <a  v-for="item in postProject.upload" v-if="item.uploadtype!=='IMG'"
              :href="item.path" target="_blank">
                {{ item.namefile }}
               </a>
              <v-spacer></v-spacer>
               <div>{{ postProject.createAt }}</div>
            </v-card-actions>
          </v-card>
        </v-flex>
        
        <div class="headline">
          Comment
        </div>

        <v-flex  xs12 mb-5>
          <v-card class="grey lighten-4">
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex 
                xs12
                v-for="(item , index ) in postProject.comment"
                :key="index"
                >
                  <v-card>
                    <v-card-title primary-title class="grey lighten-1">
                      <div class="headline text-xs-center">{{item.user_id.username}}</div>
                    </v-card-title>
                    <v-card-text>
                      <div>
                      {{ item.details }}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <div>{{ item.createAt }}</div>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex >
                  <v-card class="">
                    <v-card-title primary-title>
                      <div class="headline text-xs-center">Comment</div>
                    </v-card-title>
                    <v-card-text >
                      <div class="grey lighten-3" mx-5>
                        <v-text-field                          
                          label="Comment"
                          multi-line
                        ></v-text-field>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat round color="primary">Comment</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>


              </v-layout>
            </v-container>
          </v-card>
        </v-flex>


      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable */
export default {
  computed:{
    postProject(){
      return this.$store.state.forEditPost
    },
    loin(){
      return this.$store.state.userLogin
    },
    user(){
      return this.$store.state.userLogin
    },
  },
  
}
</script>



