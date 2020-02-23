<template>
  <div class="container">
    <div v-for="item of movies" :key="item.id">
      <item :data="item"></item>
    </div>
  </div>
</template>

<script>
import Item from '../components/Item'
export default {
  data(){
    return{
      movies:[]
    }
  },
  components:{
    Item
  },
  mounted(){
    this.axios.get('/coming_soon ').then(res=>{
      this.movies = res.data.subjects
    })
  }
}
</script>
<style scoped>
  
</style>

