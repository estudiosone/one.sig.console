import Vue from 'vue';
import { firestore, storage } from 'firebase';
import uuidv4 from 'uuid/v4';
import imageCompression from 'browser-image-compression';

export default {
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
        const db = firestore();
        db.collection('cloud_media')
          .where('url', '==', data.url)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              db.collection('cloud_media').doc(doc.id).delete()
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
      })
      .catch(() => {
        Vue.prototype.$notify.error({
          title: 'Error',
          message: 'No fué posible eliminar el archivo',
        });
      });
  },
};
