<template>
  <div id="app">
    <p class="navTop">电影</p>
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="scrollPic" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <router-link to="/city" class="city">{{city}}</router-link>
    <van-tabs class="vanTabs">
      <van-tab title="正在热映" to="/films/nowPlaying">
        </van-tab>
      <van-tab title="即将上映" to="/films/comingSoon">
        </van-tab>
    </van-tabs>
    <p class="loading" v-if="this.$store.state.isLoading">加载中</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://static.maizuo.com/v5/upload/13777d69b0b94fc99e78b1a467913296.jpg?x-oss-process=image/quality,Q_70",
        "https://static.maizuo.com/v5/upload/6dbadcf2e05692ee95f234215ebd0aad.jpg?x-oss-process=image/quality,Q_70",
        "https://static.maizuo.com/v5/upload/044c29d00a2fad92adc62bcf24e44837.jpg?x-oss-process=image/quality,Q_70",
        "https://static.maizuo.com/v5/upload/d31fdf1d15375467130b5a52eff8a47a.jpg?x-oss-process=image/quality,Q_70"
      ],
    };
  },
  computed:{
    city(){
      return this.$store.state.city
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 10rem;
  margin: 0 auto;
  font-size:16px;
}
.navTop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  font-size: 20px;
  background: #fff;
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #666;
}
.scrollPic {
  width: 10rem;
}
.city{
  position:absolute;
  top:30px;
  left:10px;
  width:40px;
  padding:10px 20px;
  border-radius: 50px;
  background: rgba(0,0,0,.2);
  color:#fff;
}
.van-tab{
  color:#333;
}
.van-tabs__nav--line{
  z-index: 0; 
  height: 100px;
}
.loading {
  text-align: center;
}
</style>
