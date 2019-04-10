<template>
  <template-sub-page>
    <template slot="title">
      Detalles de la campaña
    </template>
    <template slot="content">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="Datos">User</el-tab-pane>
        <el-tab-pane label="Suscriptores">Config</el-tab-pane>
        <el-tab-pane label="Plantilla">Role</el-tab-pane>
        <el-tab-pane label="Autorización">Task</el-tab-pane>
      </el-tabs>
    </template>
  </template-sub-page>
</template>

<style lang="scss" scoped>
.el-tabs {
  margin: 0 24px;
}
</style>
