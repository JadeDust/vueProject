<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <MyBread level1="用户管理" level2="用户列表"></MyBread>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="inputSelect"
          @clear="loadUsers()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="selectUser"
          ></el-button>
        </el-input>
        <el-button
          type="success"
          plain
          class="addUserbut"
          @click="showAddUserDia"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="180"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="tableData">
          {{ tableData.row.create_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="tableData">
          <el-switch
            v-model="tableData.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState(tableData.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="tableData">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditMsgBox(tableData.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showRoleMsgBox(tableData.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDeleteUserMsgBox(tableData.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            disabled
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色弹窗 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            disabled
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
    
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

      <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{form.username}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="roles.id" placeholder="请选择">
            <el-option :label="role.roleName" :value="role.id"
              v-for="(role,index) in roles" :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="updataRole">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
import MyBread from "@/components/MyBread.vue";
export default {
    name: "Users",
    data() {
        return {
            query: "",
            pageNumber: 1,
            pageSize: 2,
            total: -1,
            tableData: [],
            //添加用户的对话框属性
            dialogFormVisibleAdd: false,
            //修改用户的对话框框属性
            dialogFormVisibleEdit: false,
            //修改角色权限的对话框属性
            dialogFormVisibleRole: false,
            //添加 修改 用户的表单数据
            form: {
                username: "",
                password: "",
                email: "",
                mobile: "",
            },
            //保存所有的角色信息
            roles: [],
            userId: "",
        };
    },
    methods: {
        //修改用户角色
        updataRole() {
            // this.$axios.put(`users/???/role`).then()
            this.$message.success("修改成功");
            //关闭对话框
            this.dialogFormVisibleRole = !this.dialogFormVisibleRole;
        },
        //显示修改角色对话框
        showRoleMsgBox(user) {
            console.log("user :>> ", user);
            this.form = user;
            this.dialogFormVisibleRole = true;
            //请求用户信息
            this.$axios.get(`user/${user.id}`).then(res => {
                console.log("res :>> ", res);
            });
            //获取角色列表
            this.$axios.get(`roles`).then(res => {
                this.roles = res.data.data;
            });
        },
        //修改用户
        editUser() {
            //关闭对话框
            this.dialogFormVisibleEdit = false;
            //发送请求修改用户信息
            this.$axios.put(`users/${this.userId}`, this.form).then(res => {
                console.log("res111 :>> ", res);
                const { meta: { msg, status }, data, } = res.data;
                if (status === 200) {
                    //提示成功
                    this.$message.success(msg);
                    //更新视图
                    this.getUsers();
                    //清空文本框
                    // this.form = { username: '', password: '', email: '', mobile: '' }
                    this.form = {};
                }
                else {
                    this.$message.error(msg);
                }
            }).catch();
        },
        //修改用户弹出提示框
        showEditMsgBox(user) {
            //设置用户名
            this.userId = user.id;
            this.form.username = user.username;
            this.form.email = user.email;
            this.form.mobile = user.mobile;
            this.dialogFormVisibleEdit = !this.dialogFormVisibleEdit;
        },
        //删除用户弹出提示kuang
        showDeleteUserMsgBox(id) {
            this.$confirm("请确认是否删除该用户?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                //发送请求删除用户
                this.$axios
                    .delete(`users/${id}`)
                    .then((res) => {
                    console.log("res.data.meta.status  :>> ", res.data.meta.status);
                    if (res.data.meta.status === 200) {
                        this.$message({
                            type: "success",
                            message: "删除成功",
                        });
                        this.getUsers();
                    }
                })
                    .catch((err) => {
                    this.$message("请求错误！");
                });
            })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        //添加用户
        addUser() {
            //关闭对话框
            this.dialogFormVisibleAdd = false;
            //发送请求添加数据
            this.$axios
                .post("users", this.form)
                .then((res) => {
                const { meta: { msg, status }, data, } = res.data;
                if (status === 201) {
                    //提示成功
                    this.$message.success(msg);
                    //更新视图
                    this.getUsers;
                    //清空文本框
                    // this.form = { username: '', password: '', email: '', mobile: '' }
                    this.form = {};
                }
                else {
                    this.$message.warning(msg);
                }
            })
                .catch((err) => {
                console.log("err :>> ", err.message);
                this.$message.error("请求失败！");
            });
        },
        //显示添加用户弹窗
        showAddUserDia() {
            this.dialogFormVisibleAdd = true;
        },
        //清空搜索框重置数据
        loadUsers() {
            (this.query = ""), (this.pageNumber = 1), this.getUsers();
        },
        //分页方法
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageNumber = 1;
            this.getUsers();
        },
        handleCurrentChange(val) {
            this.pageNumber = val;
            this.getUsers();
        },
        //搜索用户
        selectUser() {
            this.getUsers();
        },
        //获取数据
        getUsers() {
            this.$axios({
                method: "get",
                url: "users",
                params: {
                    pagenum: this.pageNumber,
                    pagesize: this.pageSize,
                    query: this.query,
                },
            })
                .then((res) => {
                const { meta: { status, msg }, data: { users, total }, } = res.data;
                console.log('res :>> ', res);
                if (status === 200) {
                    //表格赋值
                    this.tableData = users;
                    //总数赋值
                    this.total = total;
                    this.$message.success(msg);
                }
                else {
                    this.$message.warning(msg);
                }
            })
                .catch((err) => {
                console.log("err :>> ", err);
                this.$message.success("请求错误！");
            });
        },
        //改变用户状态
        changeState(user) {
            //发送请求修改状态
            this.$axios
                .put(`users/${user.id}/state/${user.mg_state}`)
                .then((res) => {
                const { meta: { msg, status }, data, } = res.data;
                if (status === 200) {
                    this.$message.success(msg);
                }
                else {
                    this.$message.warning(msg);
                }
                //不更新users
            })
                .catch((err) => {
                this.$message.error("请求失败！");
            });
        },
    },
    mounted() {
        //页面挂载完毕加载数据
        this.getUsers();
    },
    components: { MyBread }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
.inputSelect {
  width: 300px;
}
.addUserbut {
  margin-left: 5px;
}
.searchRow {
  margin-top: 20px;
}
</style>
