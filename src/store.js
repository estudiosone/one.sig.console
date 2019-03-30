import Vue from 'vue';
import Vuex from 'vuex';
import uuidv4 from 'uuid/v4';
import { storage, firestore } from 'firebase';
import imageCompression from 'browser-image-compression';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
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
              const result = await db.collection('cloud_media').where('business', '==', db.doc(`business/${businessId}`)).get()
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
              const notify = Vue.prototype.$notify;

              const storageRef = storage().ref();
              const pathRef = storageRef.child('developer/cloud/media/');
              const fileRef = pathRef.child(await uuidv4());

              const options = {
                maxSizeMB: 1,
                useWebWorker: true,
              };

              notify.info({
                title: 'Subida en proceso',
                message: 'Estamos subiendo el archivo y serás notificado en cuanto termine la carga',
              });

              const compressedFile = await imageCompression(file, options);

              await fileRef.put(compressedFile)
                .then(async () => {
                  const url = await fileRef.getDownloadURL();
                  const db = firestore();
                  const media = {
                    business: db.doc(`business/${rootGetters['business/profile'].id}`),
                    url,
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
                    .catch(() => {
                      Vue.prototype.$notify.error({
                        title: 'Error',
                        message: 'No fué posible subir el archivo',
                      });
                    });
                })
                .catch((error) => {
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
          },
        },
      },
    },
  },
});
