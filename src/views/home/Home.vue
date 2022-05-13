<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="4"
            ><div class="grid-content bg-purple" style="overflow:hidden">
              <img
                src="https://img.zcool.cn/community/01c311596b04fda8012193a39182db.jpg@1280w_1l_2o_100sh.jpg"
                alt="无法显示图片"
                style="
                  max-height: 40px;
                  max-width: 200px;
                  margin-top: 10px;
                "
              /></div
          ></el-col>
          <el-col :span="18" class="middle">
            <h2>电商后台管理系统</h2>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <a class="loginOut" @click.prevent="handleSignout()" href="#"
                >退出</a
              >
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <ContainerAside></ContainerAside>
        <el-container>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ContainerAside from '@/components/ContainerAside.vue'

export default {
  name: 'Home',
  components: { ContainerAside },
  beforeCreate() {
    //获取token
    const token = sessionStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    handleSignout() {
      //清楚token
      sessionStorage.clear()
      //提示信息
      this.$message.success('退出成功')
      //跳转到登录
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style scoped>
div {
  height: 100%;
}
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.main {
  /* height: 100%; */
  background-color: #e9eef3;
}
/* 头部样式 */
.middle {
  /* line-height: 60px; */
  text-align: center;
}
.loginOut {
  line-height: 60px;
  text-decoration: none;
  color: #000;
}
</style>
