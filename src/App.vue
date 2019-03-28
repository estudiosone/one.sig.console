<template>
  <div id="app">
     <el-menu
      default-active="/"
      class="app-module-menu"
      :router="true"
      @open="handleOpen"
      @close="handleClose">
      <div class="app-module-menu-user">

      </div>
      <el-menu-item
        v-for="item in menu"
        :key="item.to"
        :index="item.to">
        <i class="la" :class="item.iconClass"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          to: '/',
          name: 'Dashboard',
          iconClass: 'la-dashboard',
        },
        {
          to: '/cloud',
          name: 'Cloud',
          iconClass: 'la-cloud',
        },
        {
          to: '/config',
          name: 'Configuración',
          iconClass: 'la-cog',
          submenu: [],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
@import url('https://fonts.googleapis.com/css?family=Quicksand');
@import './assets/css/line-awesome.css';

body {
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Quicksand', sans-serif;
  #app {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: auto 1fr;
    width: 100%;
    height: 100%;
  }
}

.app-module-menu {
  min-width: 260px;
  min-height: 100%;
  overflow-y: auto;
  .app-module-menu-user {
    min-height: 260px;
  }
}

.la {
  margin-right: 20px;
  width: 24px;
  text-align: center;
  font-size: 24px !important;
  vertical-align: middle;
}

.page {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;

  .breadcrumb {
    position: absolute;
    top: 18px;
    left: 24px;

  }
  .title {
    position: absolute;
    top: 48px;
    left: 24px;
    font-size: 36px;
    font-weight: 800;
    z-index: 100;
  }

  .menu {
    position: absolute;
    width: 100%;
    top: 120px;

    .el-menu-item.is-active {
      font-weight: bold;
    }
  }
  .illustration {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    z-index: 1;
    svg {
      width: 80%;
    }
  }
}
</style>
