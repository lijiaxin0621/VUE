<template>
  <div class="container">
    <div v-for="(val,index) of subjects" :key="index">
      <item :data="val"></item>
    </div>
  </div>
</template>

<script>
import Item from "../components/Item";
export default {
  data(){
    return{
      subjects:[],
      start:0
    }
  },
  components: {
    Item
  },
  mounted(){
    this.axios.get('/in_theaters').then(res=>{
      this.subjects = res.data.subjects
    })
  },
   created(){
            function getWindowHeight() {
                return document.documentElement.clientHeight;
            }
            function getScrollHeight() {
                return Math.max(document.documentElement.scrollTop,window.pageYOffset||0)
            }
            function getDocumentTop() {
                return document.documentElement.offsetHeight;
            }
            this.subjects = Array.from(Object(20),(item,index)=>index)
            window.addEventListener('scroll',()=>{
                let isBottom = (getScrollHeight() +  getWindowHeight()) >= getDocumentTop()
                if(isBottom){
                    var length = this.subjects.length;
                    this.axios.get(`/in_theaters?start=${length}`).then(res=>{
                        console.log(res.data.subjects)
                        this.subjects = [...this.subjects,...res.data.subjects]
                    })
                }
            })
        },
        destroyed(){
          window.removeEventListener('scroll')
        }
};
</script>
<style scoped>
</style>
