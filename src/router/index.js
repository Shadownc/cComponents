import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/cCode',
    name: 'cCode',
    component: () => import(/* webpackChunkName: "cComponents" */ '../views/cCodeView.vue')
  },
  {
    path: '/grayscale',
    name: 'grayscale',
    component: () => import(/* webpackChunkName: "cComponents" */ '../views/grayscale.vue')
  },
  {
    path: '/worldCloud',
    name: 'worldCloud',
    component: () => import(/* webpackChunkName: "cComponents" */ '../views/worldCloud.vue')
  },
  {
    path: '/waterMark',
    name: 'waterMark',
    component: () => import(/* webpackChunkName: "cComponents" */ '../views/waterMarkView.vue')
  },
  {
    path: '/3d-rotate',
    name: '3DRotate',
    component: () => import(/* webpackChunkName: "cComponents" */ '../views/3D-rotateDemo.vue')
  },
  {
    path: '/3d-map',
    name: '3DMap',
    component: () => import(/* webpackChunkName: "cComponents" */ '../views/3D-map.vue')
  },
  {
    path:'/table-colMerge',
    name: 'tableColMerge',
    component: () => import(/* webpackChunkName: "cComponents" */ '../views/tableColMerge.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
