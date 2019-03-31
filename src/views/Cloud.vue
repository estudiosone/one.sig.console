<template>
  <template-page>
    <template slot="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>SIG</el-breadcrumb-item>
        <el-breadcrumb-item>Cloud</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route === '/cloud/media'">Medios</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route === '/cloud/pages'">Páginas</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template slot="title">Cloud</template>
    <template slot="menu">
      <el-menu
        default-active="/cloud"
        class="el-menu-demo"
        mode="horizontal"
        :router="true">
        <el-menu-item index="/cloud">Dashboard</el-menu-item>
        <el-menu-item index="/cloud/media">Medios</el-menu-item>
        <el-menu-item index="/cloud/pages">Páginas</el-menu-item>
      </el-menu>
    </template>
  </template-page>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route.path;
    },
  },
};
</script>
