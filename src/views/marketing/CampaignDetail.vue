<template>
  <template-sub-page>
    <template slot="title">
      Detalles de la campaña
    </template>
    <template slot="content">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        label-position="top">
        <el-tabs>
          <el-tab-pane label="Datos">
            <el-row>
              <el-col :span="4">
                <el-form-item size="small" label="Identificador">
                  <el-input
                    v-model="form.id"
                    placeholder="(Automático)"
                    :disabled="true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item size="small" label="Nombre de la campaña">
                  <el-input
                    v-model="form.name"
                    :readonly="readOnly"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Suscriptores">Config</el-tab-pane>
          <el-tab-pane label="Plantilla">
            <vue-editor v-model="content"/>
          </el-tab-pane>
          <el-tab-pane label="Autorización">Task</el-tab-pane>
        </el-tabs>
      </el-form>
    </template>
  </template-sub-page>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      content: '',
    };
  },
  computed: {
    readOnly() {
      return this.$route.query.action === 'view';
    },
    form: {
      get() {
        return this.$store.getters['marketing/campaign/selected'];
      },
    },
  },
};
</script>


<style lang="scss" scoped>
.el-tabs {
  margin: 0 24px;
}
</style>
