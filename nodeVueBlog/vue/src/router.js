import Vue from 'vue'
import Router from 'vue-router'
import Layout from './components/Layout.vue'
import {getCookie} from './util/cookie'
Vue.use(Router)

let router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/home',
      children: [
        {path: 'home',component: () => import('./views/Home.vue')},
        {path: 'markdown',component: () => import('./components/Markdown.vue')}
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: Layout,
      // component: () => import('./views/About.vue')
    }
  ]
})
// 导航守卫
router.beforeEach((to, from ,next) => {
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// 判断用户是否登录 (cookie/vuex)
// console.log('to', to);
// console.log('from', from);
let token = getCookie('token');

// 如未登录，强制到登录页
if (!token && !(to.path == '/login' || to.path == '/register')) {
  next('/login')
} else {
  next();
}
})
export default router;