<template>
  <div class="container">
    <div class="title">
      <p>热门歌曲</p>
      <router-link class="link" to="/hotSongs">更多&gt;</router-link>
    </div>
    <div class="content">
      <div class="item" v-for="value of hotSongs" :key="value.id">
        <musicItem :data="value"></musicItem>
      </div>
    </div>
    <div class="title">
      <p>日语</p>
      <router-link class="link" to="/japanSongs">更多&gt;</router-link>
    </div>
    <div class="content">
      <div class="item" v-for="value of japanSongs" :key="value.id">
        <musicItem :data="value"></musicItem>
      </div>
    </div>
    <div class="title">
      <p>主播电台</p>
      <router-link class="link" to="/recommendDj">更多&gt;</router-link>
    </div>
    <div class="content">
      <div class="item" v-for="value of recommendDj" :key="value.id">
        <musicItem :data="value"></musicItem>
        </div>
    </div>
  </div>
</template>
<script>
import MusicItem from "../../components/MusicItem";
export default {
  name: "movie",
  data() {
    return {
      hotSongs: [],
      japanSongs: [],
      recommendDj: []
    };
  },
  components: {
    MusicItem
  },
  mounted() {
    var baseUrl = "https://music.aityp.com";
    var urlHot = "/top/playlist/hot";
    var urlJapan = "/top/playlist?cat=日语";
    var urlDj = "/personalized/djprogram";
    this.axios.get(baseUrl + urlHot).then(res => {
      this.hotSongs = res.data.playlists.slice(0, 3);
    });
    this.axios.get(baseUrl + urlJapan).then(res => {
      this.japanSongs = res.data.playlists.slice(0, 3);
    });
    this.axios.get(baseUrl + urlDj).then(res => {
      this.recommendDj = res.data.result.slice(0, 3);
      var recommendDj = [];
      this.recommendDj.forEach(item=>{
        var obj = {};
        obj.coverImgUrl = item.picUrl;
        obj.name = item.name;
        obj.id = item.id;
        recommendDj.push(obj)
      })
      this.recommendDj = recommendDj
    });
  }
};
</script>
<style scoped>
.container {
  background: #eee;
}
.content {
  width: 10rem;
  display: grid;
  grid-template-columns: repeat(3, 120px);
}
.item {
  padding: 10px;
}
.title {
  height: 30px;
  width: 9rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  line-height: 50px;
  color: royalblue
}
.link{
  color:royalblue;
}
</style>