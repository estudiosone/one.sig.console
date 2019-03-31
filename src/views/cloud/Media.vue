<template>
  <template-sub-page>
    <template slot="title">
      Medios
    </template>
    <template slot="actions">
      <el-button-group>
        <el-button @click="$refs.file.click()">
          <div  style="display: flex; align-items: center;">
            <img style="width: 24px;" src="https://firebasestorage.googleapis.com/v0/b/one-sig-uy.appspot.com/o/console%2Fassets%2Ficons%2Fcolor%2Fsvg%2Fplus.svg?alt=media&token=4a9d0286-fe5e-4d35-8faf-bb9afd0e0f2e" alt="">
            <span style="margin: 0 8px;">Agregar</span>
          </div>
        </el-button>
      </el-button-group>
    </template>
    <template slot="content">
      <div class="sig-grid-select">
        <div
          v-for="media in this.$store.getters['cloud/media/mediaList']"
          :key="media.url"
          @click="openMediaDialog(media)"
          class="sig-grid-item hover">
          <img :src="media.url" alt="">
        </div>
        <input type="file" ref="file" style="display: none" @change="handleFileChange">
      </div>
    </template>
    <template slot="dialogs">
      <el-dialog
        title="Tips"
        width="900px"
        @close="closeMediaDialog"
        :close-on-click-modal="false"
        :visible="this.$store.getters['ui/cloud_media_mediaDialogVisible']">
        <div style="display: grid; grid-template-columns: 460px 1fr; width: 100%; height: 460px">
          <img
            :src="mediaDialogData.url"
            style="
              object-fit: contain;
              width: 100%;
              border: 1px solid #EBEEF5;
              border-radius: 4px;
              overflow: hidden;
              box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);"/>
          <el-form
            ref="form"
            :model="mediaDialogData"
            label-width="160px"
            v-if="mediaDialogData">
            <el-form-item label="Id">
              <el-input :disabled="true" v-model="mediaDialogData.storage.file"/>
            </el-form-item>
            <el-form-item label="Tipo de archivo">
              <el-input :disabled="true" v-model="mediaDialogData.file.type"/>
            </el-form-item>
            <el-form-item label="Tamaño">
              <el-input :disabled="true" v-model="mediaDialogData.file.size"/>
            </el-form-item>
            <el-form-item label="Ruta en la nube">
              <el-input :disabled="true" v-model="mediaDialogData.storage.path"/>
            </el-form-item>
            <el-form-item label="Nombre de archivo">
              <el-input v-model="mediaDialogData.file.name"/>
            </el-form-item>
            <el-form-item>
              <el-button-group>
                <el-button>
                  <div  style="display: flex; align-items: center; min-height: 24px;">
                    <span style="margin: 0 8px;">Aplicar cambios</span>
                  </div>
                </el-button>
                <el-button @click="deleteMedia">
                  <div  style="display: flex; align-items: center; min-height: 24px;">
                    <img style="width: 24px;" src="../../assets/icons/color/cancel.svg" alt="">
                  </div>
                </el-button>
              </el-button-group>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
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

export default {
  data() {
    return {
      mediaDialogData: {
        file: {
          name: '',
          size: '',
          type: '',
        },
        storage: {
          file: '',
          path: '',
        },
        url: '',
      },
    };
  },
  methods: {
    async handleFileChange(e) {
      await this.$store.dispatch('cloud/media/uploadMedia', e.target.files[0]);
      this.$store.dispatch('cloud/media/getMedia');
    },
    deleteMedia() {
      this.$store.dispatch('cloud/media/deleteMedia', { path: this.mediaDialogData.storage.path, file: this.mediaDialogData.storage.file, url: this.mediaDialogData.url })
        .then(() => {
          this.$store.commit('ui/cloud_media_mediaDialogVisible', false);
          this.$store.dispatch('cloud/media/getMedia');
        });
    },
    openMediaDialog(e) {
      this.mediaDialogData = {
        business: e.business,
        file: e.file,
        storage: e.storage,
        url: e.url,
      };
      console.log(this.mediaDialogData);
      this.$store.commit('ui/cloud_media_mediaDialogVisible', true);
    },
    closeMediaDialog() {
      this.$store.commit('ui/cloud_media_mediaDialogVisible', false);
    },
  },
  mounted() {
    this.$store.dispatch('cloud/media/getMedia');
  },
};
</script>
