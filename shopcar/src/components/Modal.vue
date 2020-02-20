<template>
    <div class="container">
        <h2>标题</h2>
        <p>是否删除？</p>
        <button @click="handleDelete">取消</button>
    </div>
</template>

<script>
    export default {
        methods:{
            handleDelete(){
                this.$emit("del")
            }
        }
    }
</script>

<style scoped>
.container {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(55, 55, 55, 0.3);
  text-align: center;
}
</style>