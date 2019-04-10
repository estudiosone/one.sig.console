<template>
  <template-sub-page>
    <template slot="title">
      Prospectos
    </template>
    <template slot="actions">
      <el-button-group>
        <el-button>
          <div  style="display: flex; align-items: center;">
            <img style="width: 24px;" src="../../assets/icons/color/plus.svg" alt="">
            <span style="margin: 0 8px;">Agregar</span>
          </div>
        </el-button>
        <el-button @click="$refs.file.click()">
          <div  style="display: flex; align-items: center;">
            <img style="width: 24px;" src="../../assets/icons/color/import-csv.svg" alt="">
            <span style="margin: 0 8px;">Importar</span>
          </div>
        </el-button>
      </el-button-group>
    </template>
    <template slot="content">
      <div>
        <input type="file" ref="file" style="display: none" @change="handleFileChange">
      </div>
    </template>
    <template slot="dialogs">
    </template>
  </template-sub-page>
</template>

<style lang="scss">
$grid-size: 240px;

.sig-grid-select {
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, $grid-size);
  grid-template-rows: $grid-size;
  grid-gap: 12px;

  .sig-grid-item {
    transition: .3s;
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    position: relative;
    width: $grid-size;
    height: $grid-size;
    overflow: hidden;

    img {
      width: $grid-size;
      height: $grid-size;
      object-fit: contain;
    }
  }

  .sig-grid-item.hover:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    transform: scale(1.05);
  }
}
</style>

<script>
// import { UploadFile } from '../../utils/storage';
// import csvToJson from 'convert-csv-to-json';

export default {
  methods: {
    async handleFileChange(e) {
      console.info('click');
      const file = e.target.files[0];
      console.info(file);
      // const json = csvToJson.getJsonFromCsv(file);
      // console.info(json);
    },
  },
  mounted() {
  },
};
</script>
