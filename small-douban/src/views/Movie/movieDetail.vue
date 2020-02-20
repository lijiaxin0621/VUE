<template>
  <div class="conatiner">
    <div class="bg">
      <img :src="movies.images.small" alt="">
    </div>
    <div class="blur"></div>
    <div class="content">
        <div class="title">{{movies.title}}</div>
        <div class="place">{{movies.countries[0]}}·{{movies.year}}</div>
        <div class="count">
            <p>{{movies.collect_count}}<span>人喜欢</span>{{movies.ratings_count}}<span>条评论</span></p>
        </div>
    </div>
    <img class="img" :src="movies.images.small" alt="">

    <div class="name">
        <div class="name-title">{{movies.original_title}}</div>
        <div class="mark">
            <p>评分
                <img src="../../assets/images/icon/star.png" alt=""><img src="../../assets/images/icon/none-star.png" alt="">
                <span>{{movies.rating.average}}</span>
            </p>
            <p>导演 {{movies.directors[0].name}}</p>
            <p>影人 {{movies.casts[0].name}} {{movies.casts[1].name}}</p>
            <p>类型 {{movies.genres[0]}}{{movies.genres[1]}}</p>
        </div>
    </div>
    <div class="info">
          <p class="bigTitle">剧情简介</p>
          <p>{{movies.summary}}</p>
        </div>
        <div class="at">
          <p class="bigTitle">影人</p>
           <scroll-view scroll-x="true" class="scroll">
           <!--  <view v-for=" img of movies.casts.avatars.small" :key="img">
                <img :src="img">
            </view> -->
            <view>{{movies.name}}</view>
        </scroll-view>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies:{}
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    }
  },
  mounted() {
    var url = `https://douban.uieee.com/v2/movie/subject/${this.id}`;
    this.axios.get(url).then(res => {
      this.movies = res.data;
    });
  }
};
</script>

<style scoped>
.bg{
    width:100%;
    height:200px;
    display:flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
}
.blur{
    position: absolute;
    width:100%;
    height:200px;
    background: rgba(94, 93, 93, 0.1);
    left:0;
    top:0;
    backdrop-filter: blur(10px);
}
.content{
    position: absolute;
    height:100px;
    left:5%;
    top:5%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color:#fff;
    line-height: 30px;
}
.title{
    letter-spacing:5px;
    font-weight: bolder;
    font-size: 25px;
}
.place{
    letter-spacing: 5px;
    font-size: 18px;
}
.count span{
    margin-right: 15px;
    font-size: 15px;
    color:rgb(218, 99, 99);
}
.img{
    width:100px;
    height:140px;
    position: absolute;
    right:15px;
    top:140px
}
.name{
    padding:20px;
    font-size: 25px;
    border-bottom: 1px solid rgb(197, 196, 196);
}
.name div{
    margin-top: 10px;
    font-size: 20px;
}
.name .name-title{
    margin-bottom: 15px;
    color:#666666;
    font-weight: bolder;
}
.info{
    padding:20px;
    border-bottom: 1px solid rgb(197, 196, 196);
}
.scroll{
    white-space: nowrap;
}
.scroll div{
    display: inline-block;
}
.item{
    width:100px;
    height:140px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
}
.star img{
    width:20px;
    height:20px
}
.mark p{
  font-size:16px;
  line-height: 25px;
}
</style>