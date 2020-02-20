<template>
  <div class="container">
    <van-swipe class="swipe" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="item" v-for="item of postList" :key="item.id" @click="handleClick(item.postId)">
      <div class="head">
        <img :src="item.avatar" alt />
        <p>{{item.date}}</p>
      </div>
      <div class="title">{{item.title}}</div>
      <img class="pic" :src="item.imgSrc" alt />
      <div class="content">{{item.content}}</div>
      <div class="end">
        <img class="icon" src="../../assets/images/icon/chat1.png" alt />
        <p>{{item.collection}}</p>
        <img class="icon" src="../../assets/images/icon/view.png" alt />
        <p>{{item.reading}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Read",
  data() {
    return {
      postList: [],
      images: [
        "http://p1.music.126.net/gP9CZztmBED2A29BBqPFOA==/109951164514499657.jpg?imageView&quality=89",
        "http://p1.music.126.net/V4Ti07-73oInFAP_eR67kA==/109951164514501849.jpg?imageView&quality=89",
        "http://p1.music.126.net/13OiY0Vhs9R_US5mhgubKQ==/109951164514503577.jpg?imageView&quality=89",
        "http://p1.music.126.net/MOYvMu4_cfaTo62_EThyrQ==/109951164514419921.jpg?imageView&quality=89"
      ]
    };
  },
  mounted() {
    var url = "http://yapi.demo.qunar.com/mock/36046/read";
    this.axios.get(url).then(res => {
      this.postList = res.data;
    });
  },
  methods:{
    handleClick(id){
      this.$router.push(`/readDetail?id=${id}`)
      console.log(id)
    }
  }
};
</script>
<style scoped>
.container {
  background: #eee;
}
.swipe {
  width: 10rem;
}
.swipe img {
  width: 10rem;
  height: 250px;
}
.head {
  display: flex;
  align-items: center;
  height: 40px;
}
.head img {
  width: 50px;
  height: 50px;
}
.head p {
  font-size: 14px;
  margin-left: 10px;
  color: #666;
}
.pic{
  width: 9.5rem;
  height: 200px;
}
.icon {
  width: 15px;
  height: 15px;
}
.content {
  font-size: 17px;
  color: #666;
}
.title {
  padding: 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  line-height: 40px;
}
.end {
  font-size: 14px;
  display: flex;
  align-items: center;
  height: 50px;
  color: #666;
}
.end p {
  margin: 0 10px;
}
.item {
  width:9.4rem;
  padding:10px;
  margin-top: 20px;
  background: #fff;
}
</style>