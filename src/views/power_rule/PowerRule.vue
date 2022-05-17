<template>
  <el-card>
    <!-- 面包屑 -->
    <MyBread level1="权限管理" level2="权限列表"></MyBread>
    <!-- 表格 -->
    <el-table height="500px" :data="PowerRuleList" class="table" border style="width: 100%">
      <el-table-column label="#" type="index" width="120"> </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="300"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column label="层级"> 
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">一级</span>
          <span v-if="scope.row.level === '2'">一级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'PowerRule',
  data() {
    return {
      //权限列表
      PowerRuleList: [],
    }
  },
  methods: {
    getPowerRuleList() {
      //发送请求获取权限列表
      this.$axios
        .get(`rights/list`)
        .then((res) => {
          // console.log('res :>> ', res)
          const {
            meta: { msg, status },
            data,
          } = res.data
          if (status === 200) {
            this.PowerRuleList = data
            this.$message.success(msg)
          } else {
            this.$message.warning(msg)
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
  },
  mounted() {
    this.getPowerRuleList()
  },
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
