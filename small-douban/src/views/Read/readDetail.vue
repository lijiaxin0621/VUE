<template>
  <div>
      <img class="music" :src="isPlay?require('../../assets/images/music/music-stop.png'):require('../../assets/images/music/music-start.png')" alt="">
      <img :src="item.imgSrc" class="bg" alt="">
      
    <div class="detail">
        <img :src="item.avatar" alt="">
        <span>知乎 发表于：{{item.dateTime}}</span>
    </div>
    <p class="content">{{item.title}}</p>
    <div class="collect-share">
        <img class="collection" :src="isCollected?require('../../assets/images/icon/collection.png'):require('../../assets/images/icon/collection-anti.png')" alt="">
        <img class="share" src="../../assets/images/icon/share-anti.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
      item:'',
      isCollected:false,
      isPlay:false
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    }
  },
  mounted() {
    var url = "http://yapi.demo.qunar.com/mock/36046/read";
    this.axios.get(url).then(res => {
      this.postList = res.data
      this.item = this.postList[this.id]
    });
  }
};
</script>

<style scoped>
.collection,.share{
    width:50px;
    height: 50px;
}
.bg{
    width:100%;
    height: 250px;
}
.music{
    width:40px;
    height: 40px;
    position: absolute;
    top:100px;
    left:50%;
    transform: translateX(-50%); 
}
.detail{
    height: 70px;
    display: flex;
    align-items: center;
}
.detail img{
    width:60px;
    height: 60px;
}
</style>