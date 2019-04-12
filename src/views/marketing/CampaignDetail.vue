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
          <el-tab-pane name="template" label="Plantilla">
            <quill-editor v-model="form.template" @change="onEditorChange($event)"/>
            <!-- <vue-editor v-model="content"/> -->
          </el-tab-pane>
          <el-tab-pane label="Autorización">Task</el-tab-pane>
        </el-tabs>
      </el-form>
    </template>
  </template-sub-page>
</template>

<script>
export default {
  computed: {
    contentC: {
      get() {
        return this.$store.state.marketing.campaign.campaign.template;
      },
      set(value) {
        this.content = value;
      },
    },
    readOnly() {
      return this.$route.query.action === 'view';
    },
    form: {
      get() {
        return this.$store.getters['marketing/campaign/campaign'];
      },
      set(value) {
        this.$store.commit('marketing/campaign/set_campaign', value);
      },
    },
  },
  mounted() {
    this.$store.dispatch('marketing/campaign/initCampaignDetail', this.$route.query.id);
  },
  destroyed() {
    this.$store.commit('marketing/campaign/set_campaign');
  },
  methods: {
    onEditorChange({ html }) {
      this.$store.commit('marketing/campaign/set_campaign_template', html);
    },
  },
};
</script>


<style lang="scss" scoped>
.el-tabs {
  margin: 0 24px;
}
</style>
