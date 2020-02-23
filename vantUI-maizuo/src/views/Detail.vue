<template>
  <div class="container">
    <div class="item" v-for="item of movies" :key="item.id">
      <div class="topPic">
        <img :src="item.images.small" alt />
      </div>
      <div class="navTop" :style="{opacity:opacity}">
      <button @click="toggle">&lt;返回</button><p class="topMovie">{{item.title}}</p>
      </div>
      <div class="detail">
        <div class="bigTitle">
          <p class="name">{{item.title}}</p>
          <p class="count">{{item.rating.average}}</p>
        </div>
        <div>
          <p>{{item.genres[0]}} | {{item.genres[1]}}</p>
          <p>{{item.pubdates[0]}}</p>
          <p>{{item.countries[0]}} | {{item.durations[0]}}</p>
        </div>
        <div class="summary">{{item.summary}}</div>
      </div>
      <div class="actor">
        <p class="title">演职人员</p>
        <div class="wrapper">
          <div class="Allpic">
            <div class="photo">
              <img :src="item.directors[0].avatars.small" alt />
              <p>{{item.directors[0].name}}</p>
              <p>导演</p>
            </div>
            <!-- <div class="photo">
              <img :src="item.directors[1].avatars.small" alt />
              <p>{{item.directors[1].name}}</p>
              <p>导演</p>
            </div>-->
            <div class="photo">
              <img :src="item.casts[0].avatars.small" alt />
              <p>{{item.casts[0].name}}</p>
              <p>{{item.casts[0].name_en}}</p>
            </div>
            <div class="photo">
              <img :src="item.casts[1].avatars.small" alt />
              <p>{{item.casts[1].name}}</p>
              <p>{{item.casts[1].name_en}}</p>
            </div>
            <div class="photo">
              <img :src="item.casts[2].avatars.small" alt />
              <p>{{item.casts[2].name}}</p>
              <p>{{item.casts[2].name_en}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="moviePic">
        <p class="title">剧照</p>
        <div class="moviePicWarp">
          <div class="picContainer">
            <div class="moviePicUrl" v-for="img of item.clips" :key="img.id">
              <img :src="img.small" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      opacity:0
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    }
  },
  mounted() {
    this.axios.get(`subject/${this.id}`).then(res => {
      this.movies = [res.data];
    });
    window.addEventListener("scroll",this.handle)
  },
  methods:{
    toggle(){
      this.$router.back()
    },
    handle(){
      var height = document.documentElement.scrollTop;
      /* 达到350完全显示 */
      var opacity = height /100;
      if(opacity >1){
        opacity = 1
      }
      this.opacity = opacity
    }
  },
  destroyed(){
    window.removeEventListener("scroll",this.handle)
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
}
.topPic {
  /* width: 10rem; */
  height: 200px;
  overflow: hidden;
  position: relative;
}
.topPic img {
  width: 100%;
  position: absolute;
  top: -140px;
}
.name {
  font-size: 25px;
  font-weight: bold;
}
.count {
  font-size: 30px;
  color: #ff5f16;
}
.bigTitle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.detail {
  padding: 20px;
  line-height: 30px;
  background: #fff;
  font-size: 15px;
}
.wrapper {
  overflow-x: auto;
  overflow-y: hidden;
}
.photo {
  text-align: center;
  font-size:15px;
}
.photo > img {
  width: 90px;
  height: 110px;
  margin: 10px;
}
.Allpic {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  gap: 10px;
}
.title {
  font-size: 20px;
  margin: 20px 0;
}
.actor {
/*   margin: 15px 0; */
  padding: 10px;
  background: #fff;
}
.moviePic {
  background: #fff;
  padding: 10px;
}
.moviePicWarp{
  overflow-x: auto;
  overflow-y: hidden;
}
.moviePicUrl > img {
  width: 200px;
  height: 100px;
}
.picContainer {
  width:10rem;
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 10px;
}
.navTop{
  width:10rem;
  height:50px;
  line-height: 50px;
  background: #fff;
  text-align: left;
  border-bottom: 1px solid #666;
}
.navTop button{
  margin-right:70px;
  border: none;
  background: none;
  float: left;
}
.summary{
  height:120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>