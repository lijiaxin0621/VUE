<template>
  <div class="container">
    <div class="nav">
      <img class="close" src="../assets/images/错误.png" alt @click="toggle" />
      <p>当前城市 -</p>
      <div class="search">
        <img class="look" src="../assets/images/search.png" alt />
        <input type="text" placeholder="输入城市名或拼音" />
      </div>
    </div>
    <div class="allCity">
      <div class="gpsCity">
        <p>GPS定位你所在的城市</p>
        <p class="localCity">定位失败</p>
      </div>
      <div class="hotCity">
        <p>热门城市</p>
        <router-link
          to="/"
          v-for="item of cities"
          :key="item"
          tag="button"
          @click.native="handleClick(item)"
          class="cityItem"
        >{{item}}</router-link>
      </div>
      <van-index-bar>
        <van-index-anchor index="A" />
        <van-cell title="鞍山" />
        <van-cell title="安庆" />
        <van-cell title="安阳" />
        <van-cell title="安顺" />
        <van-cell title="安康" />

        <van-index-anchor index="B" />
        <van-cell title="北京" />
        <van-cell title="保定" />
        <van-cell title="包头" />
        <van-cell title="白山" />
        <van-cell title="白银" />
        <van-cell title="蚌埠" />
        <van-cell title="巴彦淖尔" />
        <van-cell title="巴音郭楞" />
        <van-cell title="北海" />
        <van-cell title="本溪" />
        <van-cell title="毕节" />

        <van-index-anchor index="C" />
        <van-cell title="重庆" />
        <van-cell title="长春" />
        <van-cell title="长沙" />
        <van-cell title="常州" />
        <van-cell title="成都" />
        <van-cell title="沧州" />
        <van-cell title="常德" />
        <van-cell title="昌都" />
        <van-cell title="朝阳" />
        <van-cell title="潮州" />
        <van-cell title="承德" />

        <van-index-anchor index="D" />
        <van-cell title="大连" />
        <van-cell title="东莞" />
        <van-cell title="大理" />
        <van-cell title="丹东" />
        <van-cell title="大庆" />
        <van-cell title="大同" />
        <van-cell title="大兴安岭" />
        <van-cell title="达州" />
        <van-cell title="德宏" />
        <van-cell title="德州" />
        <van-cell title="定西" />
      </van-index-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: ["上海", "北京", "广州", "深圳"]
    };
  },
  methods: {
    handleClick(city) {
      this.$store.dispatch("changeCity", city);
    },
    toggle() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #eee;
  font-size:17px;
}
.nav {
  width: 100%;
  height: 50px;
  position: fixed;
  background: #fff;
  top: 0;
  line-height: 50px;
  text-align: center;
}
.close {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 15px;
  left: 10px;
}
.look {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 8px;
  left: 5px;
}
.search {
  position: relative;
  width: 7.5rem;
  height: 30px;
  background: #fff;
  margin: 10px 20px;
}
.search input {
  position: absolute;
  width: 6rem;
  height: 20px;
  border: none;
  top: 5px;
  left: 50px;
  font-size: 15px;
  background: #fff;
}
.localCity{
  width:80px;
  line-height: 30px;
  background:#eee;
  margin: 10px;
}
.allCity {
  background: #fff;
}
.gpsCity {
  height: 70px;
  margin-top: 100px;
  padding:10px 20px;
}
.hotCity {
  padding-left: 20px;
}
button {
  background: #eee;
  border: none;
  margin: 20px;
}
.van-index-bar{
  padding:0 20px;
 
}
.van-cell{
 font-size: 18px;
}
</style>