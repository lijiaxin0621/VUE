<template>
  <div>
   <!--  <img :src="coverImgUrl" alt class="coverImgUrl" /> -->
    <p class="list">播放列表</p>
    <div class="item" v-for="item of playlist" :key="item.id">
      <div class="playlist">
        <img class="pic" :src="item.al.picUrl" alt />
        <p class="name">{{item.name}}<br>{{item.ar[0].name}}</p>
        <img src="../../assets/images/icon/pause.png" class="playIcon" @click="handleClick(item.id)" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          playlist:[]
      }
  },
  computed:{
      id(){
          return this.$route.query.id
      }
  },
  mounted(){
      var url = `https://music.aityp.com/playlist/detail?id=${this.id}`
      this.axios.get(url).then(res=>{
          console.log(url)
          this.playlist = res.data.playlist.tracks
          console.log(res.data)
      })
  },
  methods:{
      handleClick(id){
          console.log(id)
          this.$router.push(`/musicPlay?id=${id}`)
      }
  }
};
</script>

<style scoped>
.coverImage{
    vertical-align: bottom;
}
.item{
    border-bottom: 1px solid #eee;
    padding:20px;
}
.pic{
    width:100px;
    height:130px;
}
.name{
    margin-left: 10px;
    width:450px;
    line-height: 30px;
    font-size: 17px;
}
.playlist{
    display: flex;
    align-items: center;
}
.list{
    padding-left: 10px;
    background: #eee;
    line-height: 40px;
    font-size: 20px;
}
.playIcon{
    width:30px;
    height:30px;
}
</style>