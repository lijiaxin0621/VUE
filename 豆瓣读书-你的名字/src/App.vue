<template>
  <div id="app">
    <BookItem :item="value" v-for="value of list" :key="value.id"></BookItem>
  </div>
</template>

<script>
import axios from 'axios-jsonp-pro';
import BookItem from './components/BookItem';
export default {
  name: 'app',
  data(){
    return{
      list:[]
    }
  },
  components:{
     BookItem
  },
  mounted(){
  var url = "https://douban.uieee.com/v2/book/search?q=你的名字"
  axios.jsonp(url).then(res=>{
     this.list = res.books;
  })
  }
}
</script>

<style>
</style>
