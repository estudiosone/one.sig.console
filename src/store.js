import Vue from 'vue';
import Vuex from 'vuex';
import uuidv4 from 'uuid/v4';
import { storage, firestore } from 'firebase';
import imageCompression from 'browser-image-compression';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui: {
      namespaced: true,
      state: {
        cloud: {
          media: {
            mediaDialogVisible: false,
            mediaDialogData: {
              url: '',
            },
          },
        },
      },
      getters: {
        cloud_media_mediaDialogVisible: state => state.cloud.media.mediaDialogVisible,
        cloud_media_mediaDialogData: state => state.cloud.media.mediaDialogData,
      },
      mutations: {
        cloud_media_mediaDialogVisible(state, value) {
          // eslint-disable-next-line no-param-reassign
          state.cloud.media.mediaDialogVisible = value;
        },
        cloud_media_mediaDialogData(state, value) {
          // eslint-disable-next-line no-param-reassign
          state.cloud.media.mediaDialogData = value;
        },
      },
    },
    business: {
      namespaced: true,
      state: {
        profile: {
          addressCity: '',
          addressCountry: '',
          addressDistrict: '',
          addressDoor: '',
          addressState: '',
          addressStreet: '',
          addressZipCode: '',
          businessName: '',
          bussinessLogo: '',
          id: '',
          name: '',
          rut: '',
        },
      },
      getters: {
        profile: state => state.profile,
      },
      mutations: {
        setProfile(state, profile) {
          // eslint-disable-next-line no-param-reassign
          state.profile = profile;
        },
      },
      actions: {
        async getProfile(context, id) {
          const profileRef = firestore().collection('business').doc(id);

          profileRef.get()
            .then((doc) => {
              const data = doc.data();
              const profile = {
                addressCity: data.addressCity,
                addressCountry: data.addressCountry,
                addressDistrict: data.addressDistrict,
                addressDoor: data.addressDoor,
                addressState: data.addressState,
                addressStreet: data.addressStreet,
                addressZipCode: data.addressZipCode,
                businessName: data.businessName,
                bussinessLogo: data.bussinessLogo,
                id: doc.id,
                name: data.name,
                rut: data.rut,
              };
              context.commit('setProfile', profile);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
    },
    cloud: {
      namespaced: true,
      modules: {
        media: {
          namespaced: true,
          state: {
            mediaToUpload: '',
            mediaList: [],
          },
          getters: {
            mediaList: state => state.mediaList,
          },
          mutations: {
            addMediaList(state, media) {
              // eslint-disable-next-line no-unused-expressions
              state.mediaList.push[media];
            },
            setMediaList(state, mediaList) {
              // eslint-disable-next-line no-param-reassign
              state.mediaList = mediaList;
            },
          },
          actions: {
            async getMedia({ commit, rootGetters }) {
              const db = firestore();
              const businessId = rootGetters['business/profile'].id;
              // if (!businessId) {
              //   await dispatch('business/getProfile', 'qMIwYj1HsFYqNgi7xZ64', { root: true });
              //   businessId = rootGetters['business/profile'].id;
              // }
              const result = await db.collection('cloud_media')
                .where('business', '==', db.doc(`business/${businessId}`))
                .where('deleted', '==', false)
                .get()
                .then((querySnapshot) => {
                  const mediaList = [];
                  querySnapshot.forEach(async (doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    mediaList.push(await doc.data());
                  });
                  return mediaList;
                });
              commit('setMediaList', result);
            },
            async uploadMedia({ rootGetters }, file) {
              const fileName = await uuidv4();
              const filePath = 'developer/cloud/media/';
              const storageRef = storage().ref();
              const pathRef = storageRef.child(filePath);
              const fileRef = pathRef.child(fileName);

              const options = {
                maxSizeMB: 1,
                useWebWorker: true,
              };

              Vue.prototype.$notify.info({
                title: 'Preparando el archivo',
                message: 'Estamos preparando el archivo para subirlo...',
              });

              const compressedFile = await imageCompression(file, options);

              Vue.prototype.$notify.info({
                title: 'Subiendo el archivo',
                message: 'El archivo está optimizado, lo estamos subiendo a la nube...',
              });

              await fileRef.put(compressedFile)
                .then(async () => {
                  Vue.prototype.$notify.info({
                    title: 'Ya casi!!!',
                    message: 'Tu archivo esta en la nube, solo nos falta ubicarlo en tu biblioteca...',
                  });

                  const url = await fileRef.getDownloadURL();
                  const db = firestore();
                  const media = {
                    business: db.doc(`business/${rootGetters['business/profile'].id}`),
                    file: {
                      name: compressedFile.name,
                      type: compressedFile.type,
                      size: compressedFile.size,
                    },
                    storage: {
                      path: filePath,
                      file: fileName,
                    },
                    url,
                    deleted: false,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                  };
                  db.collection('cloud_media').add(media)
                    .then(() => {
                      Vue.prototype.$notify({
                        type: 'success',
                        title: 'Perfecto!!!',
                        message: 'Se subió correctamente el archivo',
                      });
                    })
                    .catch((error) => {
                      console.error(error);
                      Vue.prototype.$notify.error({
                        title: 'Error',
                        message: 'No fué posible subir el archivo',
                      });
                    });
                })
                .catch((error) => {
                  console.error(error);
                  switch (error.code) {
                    case 'storage/unauthorized':
                      Vue.prototype.$notify.error({
                        title: 'Error',
                        message: 'No tienes autorización para subir el archivo',
                      });
                      break;
                    default:
                      Vue.prototype.$notify.error({
                        title: 'Error',
                        message: 'No fué posible subir el archivo',
                      });
                      break;
                  }
                });
            },
            async deleteMedia(context, data) {
              console.info(data.path);
              console.info(data.file);

              // Notificar
              Vue.prototype.$notify.info({
                title: 'Preparando todo...',
                message: 'En unos instantes tu archivo será eliminado',
              });

              // Eliminar el archivo del storage
              const storageRef = storage().ref();
              const pathRef = storageRef.child(data.path);
              const fileRef = pathRef.child(data.file);

              fileRef.delete()
                .then(() => {
                  // Notifico
                  Vue.prototype.$notify.info({
                    title: 'Ya casi!!!',
                    message: 'Lo encontramos!!! en camino...',
                  });

                  // Borrar registro de la base de datos
                  firestore().collection('cloud_media')
                    .where('url', '==', data.url)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        doc.set({
                          deleted: false,
                        })
                          .then(() => {
                            Vue.prototype.$notify({
                              type: 'success',
                              title: 'Perfecto!!!',
                              message: 'Se eliminó correctamente el archivo',
                            });
                          })
                          .catch(() => {
                            Vue.prototype.$notify.error({
                              title: 'Error',
                              message: 'No fué posible eliminar el archivo',
                            });
                          });
                      });
                    })
                    .catch(() => {
                      Vue.prototype.$notify.error({
                        title: 'Error',
                        message: 'No fué posible eliminar el archivo',
                      });
                    });
                });
            },
          },
        },
      },
    },
  },
});
