# vue-shop

# 一、加载首页数据

```js
<script>
export default {
  name: "home",
  data() {
    return {
      searchPrice: [
        { gt: 0, lt: 100, id: 1001 },
        { gt: 100, lt: 500, id: 1002 },
        { gt: 500, lt: 1000, id: 1003 },
        { gt: 1000, lt: 5000, id: 1004 },
        { gt: 5000, lt: 10000, id: 1005 }
      ],
      goodsList: [],
      total:10,
      limit:8,
      start:0
    };
  },
  mounted() {
      this.initData()
  },
  methods: {
    initData(){
      this.$http('/goods/list',{params:{start:this.start,limit:this.limit}}).then(res => {
      if(res.data.code==200){
      this.goodsList = res.data.result;
      this.total = Math.ceil(res.data.total/this.limit)*10
      }
    });
    },
  }
};
</script>
```

```js
//后端业务
router.get('/goods/list', async (ctx) => {
  var {start,limit} = ctx.query;
  var total = await GoodsModel.find({}).count();
  var data = await GoodsModel.find({}).skip(Number(start)).limit(Number(limit));
  ctx.body ={
    code:200,
    msg:"首页数据请求成功",
    result:data,
      //给前端设置分页
    total:total
  }
})
```

# 二、分页

```js
//前端代码 
//total 10为只有1页 为30就有3页
<el-pagination 
  //获取当前处于第几页
  @current-change="getPage" 
  class="page" background
  layout="prev, pager, next" :total="total"></el-pagination>
```

```js
 methods: {
    getPage(page){
      this.start = (page-1)*this.limit;
      this.initData();
    },
    }
```

# 三、价格的升序和降序

```js
//对goodsList进行升序和降序
```

```js
//前端代码
<span  @click="handleSort">价格<i class="iconfont">{{(sortFlag==1)?'&#xe610;':'&#xe634;'}}</i></span>
```

```js
methods:{
    compareUp(value){
      return (a,b)=>{
        return a[value]-b[value]
      }
    },
    compareDown(value){
      return (a,b)=>{
        return b[value]-a[value]
      }
    },
    handleSort(){
      this.sortFlag = (this.sortFlag == 1)?-1:1;
      if(this.sortFlag ==1 ){
        this.goodsList.sort(this.compareUp("salePrice"))
      }else{
        this.goodsList.sort(this.compareDown("salePrice"))
      }
    },
}

```

# 四、根据价格区间进行排序

```js
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
```

```js
//后端 routes/goods.js
/* 根据区间查询 */
router.get("/goods/price",async ctx=>{
  var {gt,lt} = ctx.query;
  var data = await GoodsModel.find({salePrice:{$gt:gt,$lt:lt}})
  if(data.length){
    ctx.body ={
      code:200,
      msg:"数据请求成功",
      result:data,
      total:data.length
    }
  }else{
    ctx.body = {
      code:1001,
      msg:'没有数据'
    }
  }
})
```

# 五、默认

```js
<el-button @click="handleDefault">默认</el-button>
```

```js
methods:{
    handleDefault(){
      this.initData()
    }
}
```

# 六、添加到购物车

```js
methods:{
   addCart(productId){
        this.$http({
          method:"post",
          url:"/users/addCart",
          data:{
            productId
          }
        }).then(res=>{
          console.log(res.data)
          this.$message({
            message:res.data.msg,
            duration:1000,
            type:"success"
          })
        })
      } 
}
```

```js
//后端代码 添加到购物车
router.post('/addCart' , async ctx=>{
  var userId = 100000077;
  var {productId} = ctx.request.body;
  console.log(productId)
  var goodsData = await GoodsModel.findOne({productId:productId})
  var obj= JSON.parse(JSON.stringify(goodsData))
  obj.checked = true;
  obj.prductNum = 1;
  var userData = await UsersModel.findOne({});
  if(userData.cartList.every(item => item.productId !=productId)){
    await UsersModel.update({userId:userId},{$push:{"cartList":obj}})
    ctx.body = {
      msg:"添加成功",
      code:200
    }
  }else{
    ctx.body={
      msg:"已经添加到购物车",
      code:200
    }
  }
  /* console.log(res) */
  /* 从goods查询数据 添加到users */
})
```

# 七、登陆模块

## 7-1 跨域访问服务器

```js
//1.前端代码的配置 main.js
axios.defaults.withCredentials = true  //允许http请求携带cookie
axios.defaults.crossDomain = true  //允许跨域去访问cookie
```

```js
//2.配置服务器 app.js
app.use(cors({
  origin:"http://192.168.14.44:8080",          //配置允许跨域的域名  "*" 所有
  credentails:true
}))
```

## 7-2 实现登录功能

```
1.前端获取用户和密码
2.携带用户和密码后向后台发送http请求
3.后端接受用户和密码
4.向数据库查询
5.将结果返回给前端
```

```js
前端获取用户和密码
<el-button type="primary" @click="handleLogin">确 定</el-button>
```

```js
//登录模块 后端
router.post('/login',async ctx=>{
  var data = ctx.request.body;
  var res = await UsersModel.findOne(data);
  if(res){
    ctx.body = {
      code:"200",
      msg:"登录成功"
      result:res.userName
    }
  }else{
    ctx.body = {
      code:"400",
      msg:"用户名和密码错误"
    }
  }
})
```

```js
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
    }
```

## 7-3 使用cookies记录登陆的状态

```js
//1.登陆成功设置cookies
//登录模块
router.post('/login',async ctx=>{
 .....
  if(res){
    ctx.cookies.set('userId',res.userId,{
      maxAge:1000*60*60
    })
    ctx.cookies.set('userName',res.userName,{
    maxAge:1000*60*60
    })
   ....
})
```

```js
//检查一下登陆的状态
router.get('/checkLogin',async ctx =>{
  var userId = ctx.cookies.get("userId");
  if(userId){
    ctx.body={
      code:200,
      msg:"登录成功",
      result:ctx.cookies.get("userName")
    }
  }else{
    ctx.body={
      code:1001,
      msg:"未登录"
    }
  }
})
```

```js
//3.页面初始加载时，调用/user/checkLogin检查用户是否登录
  mounted() {
   ......
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
```

## 7-4 退出登录

```

```

