<template>
  <div id="app" v-bind:class="[this.$store.getters['auth/isLogged'] ? 'logged' : 'not-logged']">
     <el-menu
      v-if="this.$store.getters['auth/isLogged']"
      default-active="/"
      class="app-module-menu"
      :router="true"
      @open="handleOpen"
      @close="handleClose">
      <div class="app-module-menu-user">
        <div class="app-module-menu-user-img">
          <img src="http://serviastro.am.ub.edu/twiki/pub/Main/UserProfileHeader/default-user-profile.jpg" alt="">
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
            <el-dropdown-item command="c">Action 3</el-dropdown-item>
            <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
            <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-menu-item
        v-for="item in menu"
        :key="item.to"
        :index="item.to">
        <img v-if="item.iconSvg" class="la" :src="item.iconSvg" :alt="item.name">
        <i v-else class="la" :class="item.iconClass"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <div class="router">
      <router-view/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      menu: [
        {
          to: '/',
          name: 'Dashboard',
          iconClass: 'la-dashboard',
          iconSvg: 'https://firebasestorage.googleapis.com/v0/b/one-sig-uy.appspot.com/o/console%2Fassets%2Ficons%2Fcolor%2Fsvg%2Fdashboard.svg?alt=media&token=1d3d3b2f-068f-4e20-a1bd-2378669f7688',
        },
        {
          to: '/cloud',
          name: 'Cloud',
          iconClass: 'la-cloud',
          iconSvg: 'https://firebasestorage.googleapis.com/v0/b/one-sig-uy.appspot.com/o/console%2Fassets%2Ficons%2Fcolor%2Fsvg%2Fcloud.svg?alt=media&token=38978850-7bd7-48e1-84e3-bfcc0478734e',
        },
        {
          to: '/settings',
          name: 'Configuración',
          iconClass: 'la-cog',
          iconSvg: 'https://firebasestorage.googleapis.com/v0/b/one-sig-uy.appspot.com/o/console%2Fassets%2Ficons%2Fcolor%2Fsvg%2Fsettings.svg?alt=media&token=9ce7252e-3c50-4d8a-880a-3fc6096cb938',
        },
        {
          to: '/system',
          name: 'Sistema',
          iconClass: 'la-desktop',
          iconSvg: 'https://firebasestorage.googleapis.com/v0/b/one-sig-uy.appspot.com/o/console%2Fassets%2Ficons%2Fcolor%2Fsvg%2Fsystem-task.svg?alt=media&token=da22707c-58ce-4037-9047-f770ae5e64c9',
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
  beforeMount() {
    this.$store.dispatch('business/getProfile', 'qMIwYj1HsFYqNgi7xZ64');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('auth/set_isLogged', true);
      } else {
        this.$store.commit('auth/set_isLogged', false);
      }
    });
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
@import url('https://fonts.googleapis.com/css?family=Quicksand');
@import './assets/css/line-awesome.min.css';

body {
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Quicksand', sans-serif;
  #app {
    display: grid;
    grid-template-rows: 100%;
    width: 100%;
    height: 100%;
  }
  .logged {
    grid-template-columns: auto 1fr;
  }
  .not-logged {
    grid-template-columns: 1fr;
  }
}

.app-module-menu {
  min-width: 200px;
  min-height: 100%;
  overflow-y: auto;
  .app-module-menu-user {
    min-height: 200px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 150px 1fr;
    justify-content: center;
    align-items: center;
    .app-module-menu-user-img {
      width: 120px;
      height: 120px;
      border-radius: 60px;
      margin: auto;
      overflow: hidden;
      box-shadow: 0 12px 24px 0 rgba(0,0,0,.1);
      img {
        width: 100%;
      }
    }
  }
}

.la {
  margin-right: 20px;
  width: 24px;
  text-align: center;
  font-size: 24px !important;
  vertical-align: middle;
}

.illustration {
  width: 50vw;
  margin: 0 auto;
}

.page {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
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
    top: 96px;

    .el-menu-item.is-active {
      font-weight: bold;
    }
  }
  .sub-router {
    position: absolute;
    top: 156px;
    z-index: 0;
    width: 100%;
    height: 100%;
    // display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .sub-page {
      width: 100%;
      .sub-illustration {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        z-index: 0;
        svg {
          width: 80%;
        }
      }
    }
  }
}
</style>
