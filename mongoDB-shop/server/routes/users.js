const router = require('koa-router')()
const UsersModel = require('../models/users')
const GoodsModel = require('../models/goods');
router.prefix('/users')

router.get('/', async  ctx => {
  var data = await UsersModel.find({});
  ctx.body = {
    code:200,
    msg:"用户数据请求成功",
    result:data
  }
})

router.post('/addCart' , async ctx=>{
  var userId = ctx.cookies.get('userId');
  if(userId){
    var {productId} = ctx.request.body;
    console.log(productId)
    var goodsData = await GoodsModel.findOne({productId:productId});
    var obj= JSON.parse(JSON.stringify(goodsData));
    obj.productNum = 1;
    obj.checked = true;
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
  }else{
    ctx.body = {
      msg:"没有登录"
    }
  }
  /* 从goods查询数据 添加到users */
})
//登录模块
router.post('/login',async ctx=>{
  var data = ctx.request.body;
  var res = await UsersModel.findOne(data);
  if(res){
    ctx.cookies.set('userId',res.userId,{
      maxAge:1000*60*60
    })
    ctx.cookies.set('userName',res.userName,{
    maxAge:1000*60*60
    })
    ctx.body = {
      code:"200",
      msg:"登录成功",
      result:res.userName
    }
  }else{
    ctx.body = {
      code:"400",
      msg:"用户名和密码错误"
    }
  }
})
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

//注销登陆
router.post('/logout',async ctx=>{
  ctx.cookies.set("userId","",{
    maxAge:-1
  })
  ctx.cookies.set("userName","",{
    maxAge:-1
  })
  ctx.body = {
    code:200,
    msg:"退出登录"
  }
})
router.get('/cartList',async ctx=>{
  var data = await UsersModel.findOne({});
  var res = data.cartList;
  console.log(res)
  ctx.body = {
    code:200,
    result:res
  }
})
router.post('/cartList/del',async ctx=>{
  var {productId} = ctx.request.body;
  var userId = ctx.cookies.get("userId");
  var data = await UsersModel.update({userId:userId},{$pull:{cartList:{productId:productId}}})
  if(data.ok==1){
    ctx.body = {
      code:200,
      msg:"删除成功"
    }
  }else{
    ctx.body = {
      code:1001,
      msg:"删除失败"
    }
  }
})
router.post('/cartList/edit',async ctx=>{
  var {productNum,productId,checked} = ctx.request.body;
  var userId = ctx.cookies.get("userId");
  var data = await UsersModel.update(
    {userId:userId,"cartList.productId":
    productId},{$set:{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked,
   }});
  if(data.ok==1){
    ctx.body = {
      msg:"修改成功",
      code:200
    }
  }
})
module.exports = router
