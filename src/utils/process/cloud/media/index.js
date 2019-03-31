import { firestore, storage } from 'firebase';
import compress from '../../../image/compress';

export const UploadMedia = async (file, notify, mediaList) => {
  // Variables
  let documentId;

  // Preparar el archivo
  const compressedFile = compress({ type: 'media', file });

  // Generar el registro en la db
  const db = firestore();
  db.collection('cloud-media').add({
    name: compressedFile.name,
  })
    .then((docRef) => {
      documentId = docRef.id;
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });

  // Obtener el id del registro
  const storageRef = storage().ref();
  const pathRef = storageRef.child('developer/cloud/media/');
  const fileRef = pathRef.child(documentId);

  // Subir el archivo
  await fileRef.put(compressedFile)
    .then(() => {
      notify({
        type: 'success',
        title: 'Perfecto!!!',
        message: 'Se subió correctamente el archivo',
      });
      fileRef.getDownloadURL().then((url) => {
        mediaList.push({ url });
        console.log(url);
      });
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case 'storage/unauthorized':
          notify.error({
            title: 'Error',
            message: 'No tienes autorización para subir el archivo',
          });
          break;
        default:
          notify.error({
            title: 'Error',
            message: 'No fué posible subir el archivo',
          });
          break;
      }
    });
  // En caso de error eliminar todo

  console.log('data');
};

export default {
  UploadMedia,
};
