import { storage } from 'firebase';
import imageCompression from 'browser-image-compression';

export const UploadFile = async (file, path, notify, mediaList, uuid) => {
  const storageRef = storage().ref();
  const pathRef = storageRef.child(path);
  const fileRef = pathRef.child(await uuid.v5());

  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(file, options);

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
};

export default {
  UploadFile,
};
