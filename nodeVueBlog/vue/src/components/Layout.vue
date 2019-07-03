
<template>
  <div class="layout">
    <header class="header-bar">
      <img src="../assets/images//logo-white.png" alt="">
    </header>
    <!--通用的页面结果 -->
    <div class="content-body">
    <div class="layout-left">
    <!--菜单栏 -->
      <el-menu 
      background-color="#545c64"
      text-color= "#fff"
      :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>Home</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :route="{'path': '/'}" index="1-1"><i class="el-icon-info"></i>个人中心</el-menu-item>
            <el-menu-item index="1-2" :route="{'path': '/Markdown'}"><i class="el-icon-edit"></i>写文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
        </el-submenu>
      </el-menu>
    </div>
    <div class="layout-right">
    <!-- 工具路由 -->
    <router-view></router-view>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to left, #7b4397, #2196f3);
    padding-top: 15px;
    padding-bottom: 15px;
    color: #fff;
    border-radius: 0;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    padding-left: 0;
    padding-right: 0;
    z-index: 10;
    overflow: hidden;
    img {
      padding-left: 15px;
      background-color: transparent;
    }
  }
  .content-body {
    position: relative;
    top: 57px;
  }
  .layout-left,.layout-right {
    float: left;
    height: 100%;
  }
  .layout-left {
    width: 280px;
  }
  .layout-right {
    width: calc(100% - 280px);

  }
}
</style>