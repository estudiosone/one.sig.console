<template>
  <div class="page-auth">
    <div class="sign-in">
      <div class="content">
        <img src="../../assets/illustrations/welcome.svg" alt="Iniciar sesión">
        <el-form
          v-model="signIn">
          <h2>Iniciar sesión</h2>
          <el-form-item>
            <el-input autofocus placeholder="E-mail" v-model="signIn.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Contraseña" v-model="signIn.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handle_signIn">Iniciar</el-button>
          </el-form-item>
          <el-form-item>
            <el-alert
              :closable="false"
              v-if="this.$store.getters['auth/signInError']"
              title="E-mail y/o contraseña incorrecto!!!"
              type="error"
              show-icon>
            </el-alert>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page-auth {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .sign-in {
    width: 800px;
    height: 500px;
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    overflow: hidden;
    .content {
      display: grid;
      grid-template-columns: 480px 280px;
      grid-template-rows: 460px;
      align-items: center;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      signIn: {
        email: '',
        password: '',
      },
      isError: false,
    };
  },
  methods: {
    async handle_signIn() {
      this.$store.dispatch('auth/signIn', this.signIn)
        .then(() => {
          this.$store.commit('auth/set_signInError', false);
          this.$router.push({ path: this.$route.query.redirect });
        })
        .catch(() => {
          this.$store.commit('auth/set_signInError', true);
        });
    },
  },
};
</script>
