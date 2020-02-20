<template>
  <div id="app">
    <div class="item">
      <input class="cbx" type="checkbox" v-model="datas.isChecked"/>
      <div class="name">{{datas.name}}</div>
      <img class="del" src="../assets/delete.png" @click="handleDel(datas)"/>
    </div>
  </div>
</template>

<script>
export default {
    name:"item",
    props:{
        datas:{
            type:Object,
            value:""
        },
        index:{
            type:Number,
            value:""
        }
    },
    methods:{
        handleDel(name){
        this.$emit("del",name)
    }
    }
};
</script>

<style scoped>
.item {
    display: flex;
    padding: 3px 0;
    background: #fff;
    border-radius: 5px;
    border-left: 5px solid #1fa9adea;
    position: relative;
    width: 100%;
    margin: 10px 0;
}
.del {
  width: 15px;
  height: 15px;
}
.cbx {
  width: 22px;
  height: 22px;
  background: #ccc;
  margin-left:10px;
  margin-right:10px;
}
.name{
    display: flex;
    align-items: center;
}
img{
    display: flex;
    align-items: center;
    margin-top: 5px;
    position: absolute;
    right:10px;
}
</style>