<template>
  <div class="container">
    <div class="title"  v-for="list of movies" :key="list.id">
      <p>{{list.title}}</p>
      <router-link class="link" to="/in_theaters">更多&gt;</router-link>
   </div>
    <router-view></router-view>
    <div class="content">
      <div class="item" v-for="value of list" :key="value.id">
        <movieItem :data="value"></movieItem>
      </div>
    </div>
     
    <!--   <div class="title">
      <p>即将上映</p>
      <router-link class="link" to="/coming_soon">更多&gt;</router-link>
    </div>
    <div class="content">
      <div class="item" v-for="value of comingSoon" :key="value.id">
        <movieItem :data="value"></movieItem>
      </div>
    </div>
    <div class="title">
      <p>豆瓣Top250</p>
      <router-link class="link" to="/top250">更多&gt;</router-link>
    </div>
    <div class="content">
      <div class="item" v-for="value of top250" :key="value.id">
        <movieItem :data="value"></movieItem>
      </div>
    </div> -->
  </div>
</template>
<script>
import MovieItem from "../../components/MovieItem";
export default {
  name: "movie",
  data() {
    return {
      /* inTheaters: [],
      comingSoon: [],
      top250: [], */
      movies:{},
      list:[]
    };
  },
  components: {
    MovieItem
  },
  mounted() {
     var baseUrl = "https://douban.uieee.com/v2/movie";
     var urlIn = "/in_theaters";
   /* var urlSoon = "/coming_soon";
    var urlTop = "/top250";
    this.axios.get(baseUrl + urlIn).then(res => {
      this.inTheaters = res.data.subjects.slice(0, 3);
    });
    this.axios.get(baseUrl + urlSoon).then(res => {
      this.comingSoon = res.data.subjects.slice(0, 3);
    });
    this.axios.get(baseUrl + urlTop).then(res => {
      this.top250 = res.data.subjects.slice(0, 3);
    }); */
    var movies=[];
    this.axios.get(baseUrl + urlIn).then(res => {
    var inTheaters = {};
    inTheaters.title="正在热映";
    inTheaters.subTitle="in_theaters"
    inTheaters.data = res.data.subjects.slice(0, 3);
    movies.push(inTheaters)
    console.log(movies)
    });
    this.movies  = movies ;
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