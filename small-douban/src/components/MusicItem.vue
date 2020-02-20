<template>
  <div class="item" @click="handleClick(data.id)">
      <slot name="header"></slot>
           <img class="pic" :src="data.coverImgUrl" alt />
           <p>{{data.name}}</p>
  </div>
</template>

<script>
export default {
  name: "MusicItem",
  props:{
      data:{
          type:Object,
          required:true
      }
  },
  methods:{
    handleClick(id){
      this.$router.push(`/musicDetail?id=${id}`)
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