<template>
<div class="container">
    <div class="item">
      <img :src="item.images.small" alt="">
      <div class="item-right">
      <p class="title">{{item.title}}/{{item.original_title}}</p>
      <p>导演：{{item.directors[0].name}}{{item.directors[0].name_en}}主演：{{item.casts[0].name}}{{item.casts[0].name_en}}</p>
      <P>{{item.year}}/{{item.genres[0]}}{{item.genres[1]}}</P>
      <span class="count">{{item.rating.average}}</span><span>{{item.collect_count}}人评价</span>
      </div>
      </div>
  </div>
</template>
<script>
export default {
    name:"MovieItem",
    props:{
        item:{
            type:Object
        }
    }
}
</script>
<style scoped>
.container{
    width:1050px;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    
}
.item{
    width:1050px;
    height:170px;
    font-size:14px;
    border-top: 1px dashed #aaa;
    padding-top:20px;
}
.item img{
    width:100px;
    height:140px;
    float: left;
    padding-right:30px;
}
.item-right{
    display:block;
}
.count{
    color:#FFAC2D;
    margin-right:10px;
}
</style>