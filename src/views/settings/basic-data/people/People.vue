<template>
  <div class="sub-page page-settings-basicData-people-people">
    <span class="sub-title">Personas</span>
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
        property="lastName"/>
      <el-table-column
        label="Nombre"
        property="name"/>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [

      ],
      multipleSelection: [

      ],
    };
  },
};
</script>
