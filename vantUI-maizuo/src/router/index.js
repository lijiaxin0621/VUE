import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
    path: '/films/nowPlaying',
    name:"nowPlaying",
    component: () => import('../views/NowPlaying.vue')
  },
  {
    path: '/films/comingSoon',
    component: () => import('../views/ComingSoon.vue')
  },
  {
    path: '/',
    redirect: "/films/nowPlaying"
  },
  {
    path:'/detail',
    component:() => import('../views/Detail.vue')
  },
  {
    path:'/city',
    component:() => import('../views/City.vue')
  }
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router