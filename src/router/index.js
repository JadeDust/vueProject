import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'
import Users from '../views/users/Users.vue'
import PowerRule from '../views/power_rule/PowerRule.vue'
import RoleList from '../views/role_list/RoleList.vue';
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'users',
        name: 'users',
        component: Users
      },
      {
        path: 'powerRule',
        name: 'powerRule',
        component: PowerRule
      },
      {
        path: 'roleList',
        name: 'roleList',
        component: RoleList
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
