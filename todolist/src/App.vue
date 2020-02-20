<template>
  <div id="app">
    <div class="nav">
      <div class="wx">
        <span>ToDoList</span>
          <input type="text" placeholder="添加ToDo" v-model="input" @keyup.enter="clickEnter" />
      </div>
    </div>
    <div class="container">
    <div class="content">
     <h2>正在进行</h2>
      <item v-for="(item,index) of doings" :key="item.id" @del="handleDel" :index="index" :datas="item"></item>
      <h2>已经完成</h2>
       <item v-for="(item,index) of done" :key="item.id" @del="handleDel" :index="index" :datas="item"></item>
    </div>
    </div>
  </div>

</template>

<script>
import Item from '@/components/Item'
export default {
  name: "app",
  components:{
    Item
  },
  data() {
    return {
      input:"",
      datas:[]
    };
  },
  methods:{
    clickEnter(){
      this.datas.push({name:this.input,isChecked:false});
      var keywords = JSON.parse(localStorage.getItem("words"));
      keywords.push({name:this.input,isChecked:false});
      localStorage.setItem("words",JSON.stringify(keywords))
    },
    handleDel(items){
      console.log(items)
      this.datas=this.datas.filter(item=>item!=items)
    }
  },
  computed:{
    doings(){
      return this.datas.filter(item=>!item.isChecked)
    },
    done(){
      return this.datas.filter(item=>item.isChecked)
    }
  },
  mounted(){
    let words = localStorage.getItem("words");
    if(words){
      this.datas=JSON.parse(words)
    }else{
      localStorage.setItem("words","[]")
    }
  },
  updated(){
    localStorage.setItem("words",JSON.stringify(this.datas))
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body{
  background: #CDCDCD;
}
.nav {
  width: 100%;
  height: 40px;
  background: #323232;
  padding-top:10px;
}
span {
  font-size: 23px;
  color: #eee;
}
.wx {
  width: 600px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
}
input{
  width:360px;
  height:25px;
  border-radius: 8px;
  border:none;
  padding-left:10px;
  background: #eee;
}
.content{
  width:600px;
  margin:30px auto;
}
</style>
