<template>
  <div class="template-page">
    <div class="template-breadcrumb">
      <slot name="breadcrumb"/>
    </div>
    <div class="template-title">
      <slot name="title"/>
    </div>
    <div class="template-menu">
      <slot name="menu"/>
    </div>
    <div class="template-router">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
.template-page {
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  height: 100%;
  .template-breadcrumb {
    margin-top: 18px;
    margin-left: 24px;
  }

  .template-title {
    margin-top: 16px;
    margin-left: 24px;
    font-size: 36px;
    font-weight: 800;
  }

  .template-menu {
    margin-top: 3px;

    .el-menu-item.is-active {
      font-weight: bold;
    }
  }

  .template-router {
    overflow-y: auto;

    .sub-illustration {
      width: 50vw;
      margin-left: auto;
      margin-right: auto;
    }
  }
}

</style>
