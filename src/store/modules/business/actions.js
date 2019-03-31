import { firestore } from 'firebase';

export default {
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
};
