<template>
  <div class="container">
    <!--     <p v-show="!goodsList.length">没有更多数据</p> -->
    <div class="top">
      <div>
        <img class="logo" src="../assets/logo_wps图片.svg" alt />
      </div>
      <div>
        <span>{{successName}}</span>
        <el-button @click="dialogFormVisible = true">登录</el-button>&nbsp;
         <el-dialog title="登陆界面" :visible.sync="dialogFormVisible">
          <el-form :model="form" status-icon :rules="rules">
                <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                  <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
                  <el-input type="password" v-model="form.pass"></el-input>
                </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="handleLogin">确 定</el-button>
           </div>
    </el-dialog>
        <el-button @click="handleLogout">注销</el-button>
        <router-link to="/cart" class="link">
          <i class="iconfont icon-gouwuche1-copy-copy"></i>
        </router-link>
      </div>
    </div>
    <div class="nav">
      <span>首页&gt;</span>
      <span>商品详情</span>
    </div>
    <div class="sort">
      <span>Sort by :</span>
      <el-button @click="handleDefault">默认</el-button>&nbsp;&nbsp;
      <span @click="handleSort">
        价格
        <i class="iconfont">{{(sortFlag==1)?'&#xe610;':'&#xe634;'}}</i>
      </span>
    </div>
    <div class="home">
      <div class="price">
        <h3>PRICE :</h3>
        <div v-for="item of searchPrice" :key="item.id">
          <el-button type="text" @click="handlePrice(item.gt,item.lt)">{{item.gt}}-{{item.lt}}</el-button>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item of goodsList" :key="item.productName">
          <img :src="item.productImage" alt />
          <p>{{item.productName}}</p>
          <p class="salePrice">￥{{item.salePrice}}</p>
          <el-button type="danger" plain class="cartBtn" @click="addCart(item.productId)">加入购物车</el-button>
        </div>
      </div>
    </div>
    <el-pagination
      @current-change="getPage"
      class="page"
      background
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    return {
      searchPrice: [
        { gt: 0, lt: 100, id: 1001 },
        { gt: 100, lt: 500, id: 1002 },
        { gt: 500, lt: 1000, id: 1003 },
        { gt: 1000, lt: 5000, id: 1004 },
        { gt: 5000, lt: 10000, id: 1005 }
      ],
      goodsList: [],
      total: 10,
      limit: 8,
      start: 0,
      sortFlag: 1,
      dialogFormVisible: false,
      form: {
        username: "",
        pass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" ,required:true}],
        username: [  { required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      formLabelWidth: "120px",
      successName:""
    };
  },
  //路由守卫
  beforeRouteLeave (to,from,next) {
    this.$http('/users/checkLogin').then(res=>{
      if(res.data.code ==200){
        next()
      }else{
        this.$message({
          message:res.data.msg,
          duration:1000
        })
      }
    })
  },
  mounted() {
    this.initData();
    this.$http.get('/users/checkLogin').then(res=>{
      if(res.data.code==200){
        this.successName = res.data.result
      }else{
        this.$message({
          message:"未登陆",
          duration:1000,
          type:"warning"
          })
      }
    })
  },
  methods: {
    getPage(page) {
      this.start = (page - 1) * this.limit;
      this.initData();
    },
    handlePrice(gt, lt) {
      this.$http({
        url: "/goods/price",
        method: "get",
        params: {
          gt,
          lt
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.goodsList = res.data.result;
          this.total = 10;
        } else {
          this.goodsList = [];
          this.$message({
            message: "没有数据",
            duration: 1000,
            type: "warning"
          });
        }
      });
    },
    initData() {
      this.$http("/goods/list", {
        params: { start: this.start, limit: this.limit }
      }).then(res => {
        if (res.data.code == 200) {
          this.goodsList = res.data.result;
          this.total = Math.ceil(res.data.total / this.limit) * 10;
        }
      });
    },
    compareUp(value) {
      return (a, b) => {
        return a[value] - b[value];
      };
    },
    compareDown(value) {
      return (a, b) => {
        return b[value] - a[value];
      };
    },
    handleSort() {
      this.sortFlag = this.sortFlag == 1 ? -1 : 1;
      if (this.sortFlag == 1) {
        this.goodsList.sort(this.compareUp("salePrice"));
      } else {
        this.goodsList.sort(this.compareDown("salePrice"));
      }
    },
    handleDefault() {
      this.initData();
    },
    addCart(productId) {
      this.$http({
        method: "post",
        url: "/users/addCart",
        data: {
          productId
        }
      }).then(res => {
        console.log(res.data);
        this.$message({
          message: res.data.msg,
          duration: 1000,
          type: "success"
        });
      });
    },
    handleLogin(){
      if(this.form.username && this.form.pass){
        this.$http({
          url:'/users/login',
          method:"post",
          data:{
            userName:this.form.username,
            userPwd:this.form.pass
          }
        }).then(res=>{
          if(res.data.code==200){
            this.$message({
              message:res.data.msg,
              duration:1000,
              type:"success",
            })
            this.successName = res.data.result
            this.dialogFormVisible=false
          }else{
            this.$message({
              message:res.data.msg,
              duration:1000,
              type:"error"
            })
          }
        })
      }else{
        this.$message({
          message:"用户名和密码不能为空",
          duration:1000,
          type:"error"
        })
      }
    },
    handleLogout(){
      this.$http.post('/users/logout').then(res=>{
        this.$message({
          message:res.data.msg,
          duration:1000,
        })
        this.successName=""
      })
    }
  },
  
};
</script>
<style scoped>
.container {
  width: 1204px;
  margin: 0 auto;
}
.top {
  display: flex;
  justify-content: space-between;
}
.logo {
  width: 50px;
  height: 50px;
}
.top .iconfont {
  margin-left: 20px;
  color: #f70000;
  font-size: 30px;
}
.sort .iconfont {
  color: #555;
}
.link {
  text-decoration: none;
}
.nav {
  color: #555;
}
.sort {
  background: #fff;
  line-height: 40px;
  text-align: right;
  margin: 10px 0;
  padding-right: 20px;
  cursor: pointer;
}
h3 {
  letter-spacing: 1px;
}
.home {
  display: flex;
  text-align: center;
}
.item {
  width: 230px;
  background: #fff;
  margin: 10px;
  padding: 20px 0;
}
.price {
  width: 200px;
}
.cartBtn {
  width: 200px;
}
img {
  width: 200px;
}
.content {
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
}
.salePrice {
  color: rgb(204, 25, 25);
}
.el-pagination {
  text-align: center;
}
</style>
