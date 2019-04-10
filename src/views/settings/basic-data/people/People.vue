<template>
  <template-sub-page>
    <template slot="title">
      Personas
    </template>
    <template slot="actions">
      <el-button-group>
        <el-button>
          <div  style="display: flex; align-items: center;">
            <img style="width: 24px;" src="../../../../assets/icons/color/plus.svg" alt="">
            <span style="margin: 0 8px;">Agregar</span>
          </div>
        </el-button>
        <el-button @click="$refs.file.click()">
          <div  style="display: flex; align-items: center;">
            <img style="width: 24px;" src="../../../../assets/icons/color/import-csv.svg" alt="">
            <span style="margin: 0 8px;">Importar</span>
          </div>
        </el-button>
      </el-button-group>
    </template>
    <template slot="content">
      <el-table
        style="width: 100%;"
        empty-text="Upss! aca no hay nadie...!!!"
        :data="tableData">
        <el-table-column
          type="selection"/>
        <el-table-column
          label="Nombre"
          property="name"/>
        <el-table-column
          label="Apellido"
          property="surname"/>
        <el-table-column
          label="Tipo Documento"
          property="documentType"/>
        <el-table-column
          label="Documento"
          property="document"/>
        <el-table-column>
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
      <input type="file" ref="file" style="display: none" @change="handleFileChange">
    </template>
  </template-sub-page>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: '1',
          name: 'Diego',
          surname: 'Rodriguez',
          documentType: 'CI-UY',
          document: '47378274',
        },
        {
          id: '3',
          name: 'Elbio',
          surname: 'Auza',
          documentType: 'CI-UY',
          document: '',
        },
      ],
      multipleSelection: [

      ],
    };
  },
  methods: {
    handleOpenRecord(id) {
      this.$router.push({
        path: '/settings/basic-data/people/people-detail',
        query: {
          action: 'view',
          id,
        },
      });
    },
    handleEditRecord(id) {
      this.$router.push({
        path: '/settings/basic-data/people/people-detail',
        query: {
          action: 'edit',
          id,
        },
      });
    },
  },
};
</script>
