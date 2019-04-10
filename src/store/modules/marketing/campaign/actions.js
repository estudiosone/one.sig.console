import { firestore } from 'firebase';
import moment from 'moment';

export default {
  async init({ commit, rootGetters }) {
    commit('set_loading', true);
    const db = firestore();
    const businessId = rootGetters['business/profile'].id;
    const list = [];

    const result = await db
      .collection('marketing-campaign')
      .where('business', '==', db.doc(`business/${businessId}`))
      .get();

    result.forEach(async (doc) => {
      const data = await doc.data();
      const timestamp = moment(data.timestamp.toDate()).format('DD/MM/YYYY HH:mm:ss');
      console.log(timestamp);
      list.push({
        id: doc.id,
        name: data.name,
        edited: data.edited,
        authorized: data.authorized,
        processed: data.processed,
        sent: data.sent,
        timestamp,
      });
    });
    commit('set_list', list);
    commit('set_loading', false);
  },
};
