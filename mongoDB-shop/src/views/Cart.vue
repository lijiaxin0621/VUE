<template>
  <div class="container">
    <h2 class="title">我的购物车</h2>
    <table>
      <thead>
        <tr>
          <th>选择</th>
          <th>商品</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of cartList" :key="item.productId">
          <td>
            <van-checkbox checked-color="#FF6700" @change="onChange(item)" v-model="item.checked"></van-checkbox>
          </td>
          <td>
            <img :src="item.productImage" alt />
            {{item.productName}}
          </td>
          <td>￥{{item.salePrice}}</td>
          <td>
            <van-stepper @change="onChange(item)" v-model="item.productNum"  integer/>
          </td>
          <td>￥{{(item.productNum)*(item.salePrice)}}</td>
          <td>
            <el-button type="danger" @click="handleDelete(item.productId)">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <van-submit-bar :price="sum" button-text="提交订单" :disabled="sum?false:true">
      <van-checkbox v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: []
    };
  },
  methods: {
    handleDelete(productId) {
      /*  console.log(productId); */
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .then(() => {
          this.$http
            .post("/users/cartList/del", {
              productId
            })
            .then(res => {
              console.log(res);
              this.initData();
            });
        })
        .catch(() => {});
    },
    initData() {
      this.$http.get("/users/cartList").then(res => {
        this.cartList = res.data.result;
      });
    },
    async onChange(item){
      var {productNum,productId,checked} = item;
      await this.$http.post('/users/cartList/edit',{
        productNum,
        productId,
        checked
      })
    }
  },
  computed: {
    checkAll: {
      get() {
        return this.cartList.every(item => item.checked);
      },
      set(val) {
        this.cartList.forEach(item => (item.checked = val));
      }
    },
    sum() {
      var total = 0;
      this.cartList.forEach(item => {
        if (item.checked) {
          total = item["productNum"] * item["salePrice"] + total;
        }
      });
      return total * 100;
    }
  },
  mounted() {
    this.$http.get("/users/cartList").then(res => {
      this.cartList = res.data.result;
      console.log(res.data.result);
    });
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
}
.title {
  text-align: center;
  line-height: 30px;
}
table >>> .van-checkbox {
  margin-left: 20px;
}
table {
  background: #fff;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #666;
  border-radius: 15px;
  margin: 0 auto;
  /* display: block; */
  text-align: center;
}
table img {
  width: 100px;
}
table th {
  text-align: center;
}
.van-submit-bar {
  padding: 0 20px;
}
.van-checkbox__icon .van-icon {
  border-color: #ff6700 !important;
}
table >>> .van-stepper .van-stepper__input {
  width: 40px !important;
}
thead {
  background: #333;
  color: #fff;
  line-height: 50px;
}
tbody tr {
  line-height: 30px;
}
</style>