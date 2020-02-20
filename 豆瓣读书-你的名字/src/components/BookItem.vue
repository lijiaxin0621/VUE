<template>
    <div class="container">
        <div class="item">
        <img :src="item.images.small" alt="">
        <P class="title">{{item.title}}</P>
        <p class="count">{{item.rating.average}}<span>({{item.rating.numRaters}}人评价)</span></p>
        <span>{{item.author[0]}}/</span>
        <span>{{item.translator[0]}}/</span>
        <span>{{item.publisher}}/</span>
        <span>{{item.pubdate}}/</span>
        <span>{{item.price}}</span>
        </div>
    </div>
</template>
<script>
export default{
    name:"BookItem",
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
}
.item{
    width:1050px;
    height:150px;
    font-size:15px;
    border-bottom: 1px solid #ccc;
}
.item img{
    width:90px;
    height:120px;
    float:left;
    padding-right:10px;
}
.title{
    color:rgb(111, 73, 172);
}
.count{
    color:#FFAC2D;
}
.item span{
    color:rgb(150, 150, 150);
}
</style>