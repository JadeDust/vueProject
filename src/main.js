import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import MyBread from '@/components/MyBread.vue'
//引入axios
import axios from 'axios'
//请求连接
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log('config :>> ', config);
  // 判断请求是否为login
  if(config.url != 'login') {
    //添加请求头
    const AUTH_TOKEN = sessionStorage.getItem("token");
    //设置请求头
    config.headers["Authorization"] = AUTH_TOKEN;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});





//挂载到vue原型上
Vue.prototype.$axios = axios
//注册全局面包屑组件
Vue.component(MyBread.name,MyBread)
//全局过滤器处理时间戳
Vue.filter('fmtdate', (v) => {
  var dayjs = require('dayjs')
  return dayjs(v).format('YYYY-MM-DD')
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
