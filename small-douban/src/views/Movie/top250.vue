<template>
<div class="container">
  <movieItem v-for="value of subjects" :key="value.id" :data="value"></movieItem>
  </div>
</template>

<script>
import MovieItem from '../../components/MovieItem'
export default {
    data(){
        return{
            subjects:[]
        }
    },
     components:{
        MovieItem
    }, 
    mounted(){
        var url = "https://douban.uieee.com/v2/movie/top250";
        this.axios.get(url).then(res=>{
            this.subjects = res.data.subjects,
            console.log(res.data)
        })
    }
};
</script>

<style scoped>
.item{
    width:120px;
}
.container{
  padding:20px;
  display: grid;
  grid-template-columns: repeat(3, 120px);
}
</style>