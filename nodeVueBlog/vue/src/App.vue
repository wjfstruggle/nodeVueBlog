<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
import Vue from 'vue'
import {setCookie, getCookie, delCookie} from '@/util/cookie.js';
//参数因为是三个方法，所以用大括号来进行调用了，路径一定要写对
export default {
  name: 'App',
  beforeMount () {
    Vue.prototype.$cookieStore = {
      setCookie,
      getCookie,
      delCookie
    }
  }
}
</script>
<style lang="scss">
html, body, #app {
  height: 100%;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
