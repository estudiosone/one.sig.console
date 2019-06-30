<template>
  <template-sub-page>
    <template slot="title">
      Campañas
    </template>
    <template slot="actions">
      <el-button-group>
        <el-button>
          <div  style="display: flex; align-items: center;">
            <img style="width: 24px;" src="../../assets/icons/color/plus.svg" alt="">
            <span style="margin: 0 8px;">Nueva campaña</span>
          </div>
        </el-button>
      </el-button-group>
    </template>
    <template slot="content">
      <el-table
        style="width: 100%;"
        empty-text="Upss! aca no hay nadie...!!!"
        v-loading="this.$store.getters['marketing/campaign/loading']"
        :data="list">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-steps
              :active="scope.row.stepState"
              align-center
              finish-status="success">
              <el-step title="Editada"></el-step>
              <el-step title="Autorizada"></el-step>
              <el-step title="Procesada"></el-step>
              <el-step title="Enviada"></el-step>
            </el-steps>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"/>
        <el-table-column
          label="Nombre de la campaña"
          property="name"
          width="200px"/>
        <el-table-column
          label="Fecha"
          property="timestamp"/>
        <el-table-column
        width="160px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleOpenRecord(scope.row.id)">
              Ver
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="handleEditRecord(scope.row.id)">
              Editar
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </template-sub-page>
</template>

<script>
export default {
  computed: {
    list: {
      get() {
        return this.$store.getters['marketing/campaign/list'];
      },
    },
  },
  mounted() {
    this.$store.dispatch('marketing/campaign/init');
  },
  destroyed() {
    this.$store.commit('marketing/campaign/set_list', []);
  },
  methods: {
    handleOpenRecord(id) {
      this.$router.push({
        path: '/marketing/campaign-detail',
        query: {
          action: 'view',
          id,
        },
      });
    },
    handleEditRecord(id) {
      this.$router.push({
        path: '/marketing/campaign-detail',
        query: {
          action: 'edit',
          id,
        },
      });
    },
  },
};
</script>
