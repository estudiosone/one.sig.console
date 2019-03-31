import { firestore } from 'firebase';

export default {
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
};
