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
    var url = "https://music.aityp.com/top/playlist?cat=日语";
    this.axios.get(url).then(res => {
      this.playlists = res.data.playlists
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