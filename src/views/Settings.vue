<template>
  <template-page class="page-settings">
    <template slot="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>SIG</el-breadcrumb-item>
        <el-breadcrumb-item>Configuración</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.startsWith('/settings/basic-data')">Datos básicos</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.startsWith('/settings/basic-data/people')">Personas</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.startsWith('/settings/basic-data/people/people-list')">Listado</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.startsWith('/settings/basic-data/people/people-detail')">Detalle</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template slot="title">Configuración</template>
    <template slot="menu">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :default-active="route"
        :router="true">
        <el-menu-item index="/settings">Dashboard</el-menu-item>
        <el-submenu index="/settings/basic-data">
          <template slot="title">Datos básicos</template>
          <el-submenu index="/settings/basic-data/people">
            <template slot="title">Personas</template>
            <el-menu-item index="/settings/basic-data/people/people-list">Personas</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </template>
  </template-page>
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
