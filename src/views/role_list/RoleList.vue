<template>
  <el-card>
    <!-- 面包屑 -->
    <MyBread level1="权限管理" level2="角色列表"></MyBread>
    <el-row class="addRoleBtn">
      <el-col>
        <!-- 按钮 -->
        <el-button type="info" @click="dialogShowAddRole = true"
          >添加角色</el-button
        >
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="RoleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scoped">
          <el-row v-for="(item1, i) in scoped.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                @close="delRole(scoped.row, item1.id)"
                closable
                type="success"
                >{{ item1.authName }}</el-tag
              >
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    @close="delRole(scoped.row, item2.id)"
                    closable
                    type="info"
                    >{{ item2.authName }}</el-tag
                  >
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="delRole(scoped.row, item3.id)"
                    closable
                    type="warning"
                    v-for="(item3, i) in item1.children"
                    :key="i"
                  >
                    {{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scoped.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index" width="150"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="300">
      </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc" width="300">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="isShowEditRole(scoped.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="isShowEditRightDia(scoped.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteRole(scoped.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogShowSetRight">
      <!-- 树形结构  -->
      <el-tree
        ref="tree"
        :data="treeList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowSetRight = false">取 消</el-button>
        <el-button type="primary" @click="editRight()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="dialogShowAddRole">
      <el-form :model="roleForm">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowAddRole = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog title="修改角色" :visible.sync="dialogShowEditRole">
      <el-form :model="roleForm">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowEditRole = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'roleList',
  data() {
    return {
      RoleList: [],
      //显示修改角色对话框
      dialogShowSetRight: false,
      //显示添加角色对话框
      dialogShowAddRole: false,
      //显示编辑角色对话框
      dialogShowEditRole: false,
      //角色信息
      roleForm: {
        roleName: '',
        roleDesc: '',
      },
      // 树形结构参数
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'authName',
      },
      openList: [],
      arrcheck: [],
    }
  },
  methods: {
    //修改角色
    editRole() {
      //发送请求修改角色
      this.$axios
        .put(`roles${this.roleForm.id}`, {
          roleName: this.roleForm.roleName,
          roleDesc: this.roleForm.roleDesc,
        })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            //刷新数据
            this.getRoleList()
          } else {
            this.$message.warning(res.data.meta.msg)
          }
        })
        .catch((err) => {
          this.$message.error('请求错误！')
        })
      //关闭对话框
      this.dialogShowEditRole = false
    },
    //显示添加角色对话框
    isShowEditRole(role) {
      this.roleForm = role
      this.dialogShowEditRole = true
    },
    //添加角色
    addRole() {
      //发送请求添加角色
      this.$axios
        .post(`roles`, this.roleForm)
        .then((res) => {
          if (res.data.meta.status === 201) {
            this.$message.success(res.data.meta.msg)
            //刷新数据
            this.getRoleList()
          } else {
            this.$message.warning(res.data.meta.msg)
          }
        })
        .catch((err) => {
          this.$message.error('请求错误！')
        })
      //关闭对话框
      this.dialogShowAddRole = false
    },
    //删除角色
    deleteRole(role) {
      //请用户再次确认
      this.$confirm('请确认是否删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //发送请求删除角色
          this.$axios
            .delete(`roles/${role.id}`)
            .then((res) => {
              const {
                meta: { msg, status },
              } = res.data
              if (status === 200) {
                this.$message.success(msg)
              }
              //刷新数据
              this.getRoleList()
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //显示修改角色权限对话框
    isShowEditRightDia(role) {
      this.roleForm = role
      //请求数据
      this.$axios
        .get(`rights/tree`)
        .then((res) => {
          //遍历角色获取所有id
          this.arrcheck = []
          role.children.forEach((item) => {
            this.arrcheck.push(item.id)
            item.children.forEach((item) => {
              this.arrcheck.push(item.id)
            })
          })
          this.treeList = res.data.data
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
      this.dialogShowSetRight = true
    },
    //修改角色权限
    editRight() {
      //获取全选状态的所有节点id
      const arr1 = this.$refs.tree.getCheckedKeys()
      //获取半选状态的所有节点id
      const arr2 = this.$refs.tree.getHalfCheckedKeys()
      //连接数组
      const arr = [...arr1, ...arr2]

      this.$axios
        .post(`roles/${this.roleForm.id}/rights`, { rids: arr.join(',') })
        .then((res) => {
          const {
            meta: { msg, status },
          } = res.data
          if (status === 200) {
            this.$message.success(msg)
            //刷新数据
            this.getRoleList()
            //关闭对话框
            this.dialogShowSetRight = false
          } else {
            this.$message.warning(msg)
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
      //清空表单
      this.roleForm = {}
    },
    //删除权限
    delRole(role, rightId) {
      //请求路径 roles/:roleId/rights/:rightId
      this.$axios
        .delete(`roles/${role.id}/rights/${rightId}`)
        .then((res) => {
          const {
            meta: { msg, status },
            data,
          } = res.data
          if (status === 200) {
            this.$message.success(msg)
            //刷新数据
            //局部刷新
            role.children = data
            // this.getRoleList()
          } else {
            this.$message.warning(msg)
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    //获取权限列表
    getRoleList() {
      //发送请求获取权限列表
      this.$axios
        .get(`roles`)
        .then((res) => {
          const {
            meta: { msg, status },
            data,
          } = res.data
          if (status === 200) {
            this.RoleList = data
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
    this.getRoleList()
  },
}
</script>
<style scoped>
.addRoleBtn {
  margin-top: 20px;
}
</style>
