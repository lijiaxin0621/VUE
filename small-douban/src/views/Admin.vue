<template>
    <div class="container">
        <img class="logo" src="../assets/images/avatar/4.png" alt="">
        <div class="hi">Hello world</div>
        <button class="btn" @click="handleClick()">开启我的vue之旅</button>
    </div>
</template>

<script>
    export default {
        methods:{
            handleClick(){
                this.$router.push({name:'read'})
            }
        }
    }
</script>

<style scoped>
.container{
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background: #b3d4db;
    text-align: center;
}
.logo{
    margin-top:100px;
    width:150px;
    height:150px;
}
.hi{
    margin:50px;
    font-weight: bold;
    font-size:20px;
}
.btn{
    text-align: center;
    width:200px;
    height:40px;
    line-height: 20px;
    border:1px solid rgb(255, 255, 255);
    color:rgb(248, 248, 248);
    background: none;
    outline: none;
}
</style>