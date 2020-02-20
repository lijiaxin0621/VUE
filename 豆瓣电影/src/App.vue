<template>
  <div id="app">
    <MovieItem :item="value" v-for="value of movies" :key="value.id"></MovieItem>
  </div>
</template>
<script>
import axios from 'axios-jsonp-pro';
import MovieItem from './components/MovieItem';
export default {
  name: 'app',
  data(){
     return{
       movies:[]
     }
  },
  components:{
    MovieItem
  },
  mounted(){
    var url = "https://douban.uieee.com/v2/movie/top250"
    axios.jsonp(url).then(res=>{
       this.movies = res.subjects;
    })
  }
}
</script>

<style>

</style>
