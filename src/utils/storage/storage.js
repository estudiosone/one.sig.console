import { storage } from 'firebase';

const UploadFile = (file, path) => {
storage.ref(path + file.name).put(file)
}