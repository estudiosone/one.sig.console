<template>
  <template-sub-page>
    <template slot="title">
      Detalle
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
    </template>
  </template-sub-page>
</template>
