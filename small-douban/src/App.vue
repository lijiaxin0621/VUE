<template>
  <div id="app">
    <div id="nav">
      <router-link to="/read" class="link"><i class="iconfont icon-yuedu"></i><p>文章</p></router-link>
      <router-link to="/movie" class="link"><i class="iconfont icon-dianying"></i><p>电影</p></router-link>
      <router-link to="/music" class="link"><i class="iconfont icon-CombinedShape"></i><p>音乐</p></router-link>
      <router-link to="/my" class="link"><i class="iconfont icon-my"></i><p>我的</p></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
*{margin:0;padding:0;}
#app {
  width:10rem;
  color: #2c3e50;
  font-size:15px;
}
#nav{
  background: #eee;
  height:50px;
  position: fixed;
  bottom: 0;
  left:0;
  width:100%;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  line-height: 20px;
  padding-top: 15px;
}
.iconfont{
  font-size:20px;
}
#nav a {
  color: #2c3e50;
}

#nav .router-link-exact-active {
  color: #42b983;
}
.link{
  text-decoration: none;
}
</style>
