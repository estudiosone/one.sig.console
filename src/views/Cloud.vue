<template>
  <div class="page page-cloud">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>SIG</el-breadcrumb-item>
        <el-breadcrumb-item>Cloud</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route === '/cloud/media'">Medios</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route === '/cloud/pages'">Páginas</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <span class="title">Cloud</span>
    <div class="menu">
      <el-menu
        default-active="/cloud"
        class="el-menu-demo"
        mode="horizontal"
        :router="true">
        <el-menu-item index="/cloud">Dashboard</el-menu-item>
        <el-menu-item index="/cloud/media">Medios</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>Info</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.path);
  },
  computed: {
    route() {
      return this.$route.path;
    },
  },
};
</script>
