import Vue from 'vue'
import VueRouter from 'vue-router'
import Read from '../views/Read/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:"admin"
  },
  {
    path: '/read',
    name: 'read',
    component: Read
  },
  {
    path:'/readDetail',
    component:()=>import('../views/Read/readDetail.vue')
  },
  {
    path: '/movie',
    name: 'movie',
    component: () => import('../views/Movie')
  },
  {
    path:'/admin',
    name:'admin',
    component:() =>import('../views/Admin')
  },
  {
    path:'/in_theaters',
    component:()=>import('../views/Movie/intheaters.vue')
  },
  {
    path:'/coming_soon',
    component:()=>import('../views/Movie/comingsoon.vue')
  },
  {
    path:'/top250',
    component:()=>import('../views/Movie/top250.vue')
  },
  {
    path:'/music',
    component:()=>import('../views/Music')
  },
  {
    path:'/movieDetail',
    component:()=>import('../views/Movie/movieDetail')
  },
  {
    path:'/hotSongs',
    component:()=>import('../views/Music/hotSongs.vue')
  },
  {
    path:'/japanSongs',
    component:()=>import('../views/Music/japanSongs.vue')
  },
  {
    path:'/recommendDj',
    component:()=>import('../views/Music/recommendDj.vue')
  },
  {
    path:'/musicDetail',
    component:()=>import('../views/Music/musicDetail.vue')
  },
  {
    path:'/musicPlay',
    component:()=>import('../views/Music/musicPlay.vue')
  },{
    path:'/my',
    component:()=>import('../views/My')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
