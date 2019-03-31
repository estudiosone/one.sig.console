import imageCompression from 'browser-image-compression';

export default async (operation) => {
  let compressedFile;
  switch (operation.type) {
    case 'media': {
      const { file } = operation;

      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
      };

      compressedFile = await imageCompression(file, options);
      break;
    }
    default: break;
  }

  return compressedFile;
};
