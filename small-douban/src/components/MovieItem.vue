<template>
  <div class="item" @click="handleClick(data.id)">
      <slot name="header"></slot>
          <img class="pic" :src="data.images.small" alt />
           <p>{{data.title}}</p> 
          <p>{{data.rating.average}}</p>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  data(){
    return{

    }
  },
  props:{
      data:{
          type:Object,
          required:true
      }
  },
  methods:{
    handleClick(id){
      this.$router.push(`/movieDetail?id=${id}`)
    }
  }
};
</script>

<style scoped>
.pic {
  width: 100px;
  height: 130px;
}
</style>