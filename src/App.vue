<template>
  <div id="app" v-bind:class="[this.$store.getters['auth/isLogged'] ? 'logged' : 'not-logged']">
     <el-menu
      v-if="this.$store.getters['auth/isLogged']"
      default-active="/"
      class="app-module-menu"
      :router="true">
      <div class="app-module-menu-user">
        <div class="app-module-menu-user-img">
          <img src="http://serviastro.am.ub.edu/twiki/pub/Main/UserProfileHeader/default-user-profile.jpg" alt="">
        </div>
        <el-submenu index="1">
          <template slot="title">
            <div class="user">
              <span style="
                margin-top: 2px;
                font-size: 18px;
                font-weight: 800;
                text-align: center;">
                Hola, Diego
              </span>
              <span style="
                margin-top: 6px;
                text-align: center;
                font-weight: lighter;
                font-size: 12px;">
                Administrador IT
              </span>
            </div>
          </template>
          <el-menu-item @click="handleSignOut">Cerrar sesión</el-menu-item>
        </el-submenu>
      </div>
      <br/>
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
          to: '/marketing',
          name: 'Marketing',
          iconClass: 'la-cloud',
          iconSvg: 'https://firebasestorage.googleapis.com/v0/b/one-sig-uy.appspot.com/o/console%2Fassets%2Ficons%2Fcolor%2Fsvg%2Fcommercial.svg?alt=media&token=578a6590-9f71-4820-88d8-1d8abebb7411',
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
    handleSignOut() {
      this.$store.dispatch('auth/signOut');
    },
  },
  beforeMount() {
    this.$store.dispatch('business/getProfile', 'qMIwYj1HsFYqNgi7xZ64');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('auth/set_isLogged', true);
        this.$router.push({ path: this.$route.query.redirect || '/' });
      } else {
        this.$store.commit('auth/set_isLogged', false);
        this.$router.push({ path: '/auth/sign-in' });
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
    grid-template-rows: 180px 1fr;
    justify-content: center;
    align-items: center;
    .el-submenu__title {
      .user {
        display: flex;
        flex-direction: column;
        line-height: normal;
      }
    }
    .app-module-menu-user-img {
      width: 96px;
      height: 96px;
      border-radius: 60px;
      margin: 42px 52px;
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
