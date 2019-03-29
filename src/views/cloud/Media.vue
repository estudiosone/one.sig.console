<template>
  <template-sub-page>
    <template slot="title">
      Medios
    </template>
    <template slot="actions">
      <el-button-group>
        <el-button>
          <div  style="display: flex; align-items: center;">
            <img style="width: 24px;" src="https://firebasestorage.googleapis.com/v0/b/one-sig-uy.appspot.com/o/console%2Fassets%2Ficons%2Fcolor%2Fsvg%2Fplus.svg?alt=media&token=4a9d0286-fe5e-4d35-8faf-bb9afd0e0f2e" alt="">
            <span style="margin: 0 8px;">Agregar</span>
          </div>
        </el-button>
      </el-button-group>
    </template>
    <template slot="content">
      <div class="sig-grid-select">
        <div class="sig-grid-item hover">
          <img src="http://yhairstylist.com/wp-content/themes/ushop/images/hero-image.jpg" alt="" style="object-fit: cover">
        </div>
        <div class="sig-grid-item hover">
          <img src="http://yhairstylist.com/wp-content/uploads/2019/03/CUPONERAS-1.bmp" alt="" style="object-fit: cover">
        </div>
        <input type="file" ref="file" style="display: none" @change="handleFileChange">
        <button @click="$refs.file.click()">open file dialog</button>
      </div>
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
    }
  }

  .sig-grid-item.hover:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
}
</style>

<script>
export default {
  data() {
    return {
      mediaToUpload: '',
      mediaList: [
        {
          url: ''
        }
      ]
    };
  },
  methods: {
    handleFileChange(e) {
      console.info(e);
    }
  }
}
</script>
