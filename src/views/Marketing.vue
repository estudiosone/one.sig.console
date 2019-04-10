<template>
  <template-page>
    <template slot="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>SIG</el-breadcrumb-item>
        <el-breadcrumb-item>Marketing</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route === '/marketing/campaign-list'">Campañas</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route === '/marketing/prospects'">Prospectos</el-breadcrumb-item>
        <!-- <el-breadcrumb-item v-if="route === '/cloud/pages'">Páginas</el-breadcrumb-item> -->
      </el-breadcrumb>
    </template>
    <template slot="title">Marketing</template>
    <template slot="menu">
      <el-menu
        mode="horizontal"
        :default-active="route"
        :router="true">
        <el-menu-item index="/marketing">Dashboard</el-menu-item>
        <el-menu-item index="/marketing/campaign-list">Campañas</el-menu-item>
        <el-menu-item index="/marketing/prospects">Prospectos</el-menu-item>
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
