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
        <el-menu-item index="/cloud/pages">Páginas</el-menu-item>
      </el-menu>
    </div>
    <div class="sub-router">
      <router-view/>
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
