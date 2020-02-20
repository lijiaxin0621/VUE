<template>
  <div class="container">
    <musicItem v-for="value of playlists" :key="value.id" :data="value"></musicItem>
  </div>
</template>

<script>
import MusicItem from "../../components/MusicItem";
export default {
  data() {
    return {
      playlists: []
    };
  },
  components: {
    MusicItem
  },
  mounted() {
    var url = "https://music.aityp.com/personalized/djprogram";
    this.axios.get(url).then(res => {
      this.playlists = res.data.result
       var playlists = [];
      this.playlists.forEach(item=>{
        var obj = {};
        obj.coverImgUrl = item.picUrl;
        obj.name = item.name;
        obj.id = item.id;
        playlists.push(obj)
      })
      this.playlists = playlists
    });
  }
};
</script>

<style scoped>
.container {
  padding:20px;
  display: grid;
  grid-template-columns: repeat(3, 120px);
}
</style>