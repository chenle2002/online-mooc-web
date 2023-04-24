import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from "@/views/Login";
import recommend from "@/views/Recommend";
import courseDescription from "@/views/CourseDescription";
import help from "@/views/Help";
import comment from "@/views/Comment";
import PageIndex from "@/views/PageIndex";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend
  },
  {
    path: '/coursedescription',
    name: 'coursedescription',
    component: courseDescription
  },
  {
    path: '/comment',
    name: 'comment',
    component: comment
  },
  {
    path: '/help',
    name: 'help',
    component: help
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PageIndex
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
