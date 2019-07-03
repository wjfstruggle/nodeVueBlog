import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import ElementUI from 'element-ui';
import mavonEditor from 'mavon-editor' // 富文本编辑器
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/sass/reset.scss'

Vue.use(ElementUI);
Vue.use(mavonEditor);

Vue.config.productionTip = false;

Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:8082'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
