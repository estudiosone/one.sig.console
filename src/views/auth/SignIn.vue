<template>
  <div class="page-auth">
    <div class="sign-in">
      <div class="content">
        <img src="../../assets/illustrations/welcome.svg" alt="Iniciar sesión">
        <el-form
          v-model="signIn">
          <el-form-item>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Password" v-model="signIn.pass" show-password></el-input>
          </el-form-item>
          <el-form-item>
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

    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      signIn: {
        user: '',
        pass: '',
      },
    };
  },
};
</script>
