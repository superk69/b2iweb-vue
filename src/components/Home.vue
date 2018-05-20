<template>
  <v-container fluid mb-5 class="grey lighten-4">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1>Home</h1>
      </v-flex>
      <v-flex xs12 sm8 offset-sm2 mt-3>
        <h1>
            ข่าวการรับสมัคร
        </h1>

        <v-flex
        v-for="post in postProject"
        :key="post.id"
        v-if="post.type==='project'"
        >
          <v-carousel>
            <v-carousel-item v-for="item in post.upload" v-if="item.uploadtype==='IMG'" :src="item.path" :key="item.id"></v-carousel-item>
          </v-carousel>

          <v-card>
            <v-card-title primary-title>
              <div class="headline text-xs-center">{{ post.title }}</div>
            </v-card-title>
            <v-card-text>
              {{ post.details }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn flat color="orange" @click="postDetail(post)">Read More...</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

          <v-flex xs12 mt-5>
            <div class="headline">ข่าว / ประชาสัมพัน / ประกาศผล</div>
          </v-flex>

        <v-layout mb-5 mt-3>
          <v-card class="grey lighten-4">
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm4
                  v-for="post in postProject"
                  :key="post.id"
                  v-if="post.type!=='project'"
                  >
                    <v-card>
                      <v-card-media :src="post.upload[0].path" height="200px"></v-card-media>
                      <v-card-title>
                        <div class="headline text-xs-center">{{ post.title}}</div>
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat round color="orange" @click="postDetail(post)" small>Read More...</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-layout>

        <v-btn @click='loadMore' block dark>Load More</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable */
export default {
  data () {
    return{
      items:[]
    }
  },
  methods:{
    loadMore(){
      this.$store.dispatch('acLoadMore',''); 
    },
    postDetail(input){
      this.$store.dispatch('acPostDetail',input); 
    }
  },
  computed:{
    postProject(){
      return this.$store.state.postAll
    }
  },
  
}
</script>



