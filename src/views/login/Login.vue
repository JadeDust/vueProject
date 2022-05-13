<template>
  <div class="login-wors">
    <el-form class="login-form"
    label-position="top" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button  @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { Col } from 'element-ui'
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    }
  },
  methods:{
    handleLogin(){
      this.$axios.post('login',this.formData).then(
        res => {
            // console.log('res :>> ', res);
            const {
              data,meta:{msg,status}
            } = res.data
            if(status === 200){
              //保存token值 存到session里
              sessionStorage.setItem('token',data.token)
              //跳转页面
              this.$router.push({name:'home'})
              //提示登录成功
              this.$message.success(msg)
            }else{
              //提示错误
              this.$message.warning(msg)
            }
        }
    
      )
      .catch(
        err =>{
          this.$message.error("请求错误！")
        }

      )
    }
  }
}
</script>

<style scoped>
  .login-wors{
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content:center;
    align-items: center;
  }
  .login-wors .login-form{
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
  }
  .login-wors .login-btn{
    width: 100%;
  }
  
</style>
