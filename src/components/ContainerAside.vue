<template>
  <el-aside class="aside" width="200px">
    <el-menu :unique-opened="true"
      :router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="users"
            ><i class="el-icon-user"></i>用户列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="roleList"
            ><i class="el-icon-user-solid"></i>角色列表</el-menu-item
          >
          <el-menu-item index="powerRule"
            ><i class="el-icon-setting"></i>权限列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="3-1"
            ><i class="el-icon-s-order"></i>商品列表</el-menu-item
          >
          <el-menu-item index="3-2"
            ><i class="el-icon-s-operation"></i>分类参数</el-menu-item
          >
          <el-menu-item index="3-3"
            ><i class="el-icon-date"></i>商品分类</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document-checked"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="4-1"
            ><i class="el-icon-document-remove"></i>订单列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-bank-card"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="5-1"
            ><i class="el-icon-link"></i>数据报表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'ContainerAside',
}
</script>

<style scoped>
.aside {
  background-color: #d3dcd6;
}
</style>
