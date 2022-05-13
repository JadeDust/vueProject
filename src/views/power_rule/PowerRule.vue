<template>
  <el-card>
        <!-- 面包屑 -->
    <MyBread level1="权限管理" level2="权限列表"></MyBread>
  </el-card>
</template>

<script>
export default {
  name:'PowerRule',
  data() {
    return {
      //权限列表
      PowerRuleList:{}
    }
  },
  methods:{
    // getPowerRuleList(){
    //   //发送请求获取权限列表
    // }
  }
}
</script>

<style>

</style>