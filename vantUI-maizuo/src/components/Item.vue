<template>
    <div class="container">
      <div class="item"  @click="handleClick(data.id)">
      <div>
      <img class="pic" :src="data.images.small" alt="">
      </div>
      <div class="detail">
        <p class="title">{{data.title}}</p>
        <p>观众评分:{{data.rating.average}}</p>
        <p>导演:{{data.directors[0].name}}</p>
        <p>{{data.pubdates[0]}} | {{data.durations[0]}}</p>
      </div>
      <div class="buy">购票</div>
    </div>
    </div>
</template>

<script>
export default({
    props:{
        data:{
            type:Object,
            required:true
        }
    },
  methods:{
    handleClick(id){
      this.$router.push(`/detail?id=${id}`)
    }
  }
})
</script>

<style scoped>
*{margin:0;padding:0;}
.container{
    width:9.8rem;
}
.item{
    padding:0px;
    display: flex;
    justify-content: space-between;
    margin:20px;
}
.detail{
    width:180px;
    line-height: 25px;
    text-align: left;
    font-size:16px;
    color:#888;
}
.detail>p{
  width:200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title{
  color:#333;
  font-size: 20px;
}
.pic{
    width:80px;
    height:100px;
}
.buy{
    width:50px;
    height:20px;
    border:1px solid #FF5F16;
    margin-top:25px;
    color:#FF5F16;
    text-align: center;
    line-height: 20px;
}
.container{
    width:10rem;
    margin:0 auto;
}
</style>