<template>
  <div id="app">
    <modal v-show="isShow" @del="handleDelete()"></modal>
    <h2>购物车</h2>
    <table border="1">
      <thead>
        <tr>
          <th>全选<input type="checkbox" v-model="checkAll"></th>
          <th>商品</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of products" :key="item.id">
          <td><input type="checkbox" v-model="item.isSelected"></td>
          <td><img :src="item.productCover" alt="">{{item.productName}}</td>
          <td>{{item.productPrice}}</td>
          <td><input type="number" v-model="item.productCount"></td>
          <td>{{item.productPrice*item.productCount|format(2)}}</td>
          <td><button @click=toggle>删除</button></td>
        </tr>
      </tbody>
    </table>
    <p>总价格：{{sum |format(2)}}</p>.m
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
  name: 'app',
  data(){
    return{
      products:[],
      isShow:false
    }
  },
  components:{
    Modal
  },
  mounted(){
    var url="http://yapi.demo.qunar.com/mock/37278/path"
    this.axios.get(url).then(res=>{
      this.products = res.data
      console.log(res.data)
    })
  },
  filters:{
    format(val,params){
      return "$" + val.toFixed(params)
    }
  },
  computed:{
    checkAll:{
      get(){
        return this.products.every(item=>item.isSelected)
      },
      set(val){
        return this.products.forEach(item=>item.isSelected = val)
      }
    },
    sum(){
      var total=0;
      this.products.forEach(item=>{
        if(item.isSelected==true){
          total = item.productCount*item.productPrice+total
        }
      })
      return total
    }
  },
  methods:{
    toggle(){
      this.isShow=true
    },
    handleDelete(){
      this.isShow = false
    }
  }
}
</script>

<style>
img{
  width:60px;
  height:100px;
}
table{
  border-collapse:collapse;
}
</style>
