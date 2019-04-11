const admin = require('firebase-admin');

const firebaseCredentials = require('./firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: 'https://one-sig-uy.firebaseio.com',
});
const db = admin.firestore();

db.collection('marketing-campaign-email').where('open', '==', true)
  .onSnapshot((querySnapshot) => {
    const emails = [];
    querySnapshot.forEach((doc) => {
      emails.push(doc.data());
    });
    console.log(`Fueron abiertos ${emails.length} emails.`);
  });

db.collection('marketing-campaign-email').where('bounce', '==', true)
  .onSnapshot((querySnapshot) => {
    const emails = [];
    querySnapshot.forEach((doc) => {
      emails.push(doc.data());
    });
    console.log(`Fueron rebotados ${emails.length} emails.`);
    const result = [];
    emails.forEach((mail) => {
      const filter = result.filter(x => x.bounceType === mail.bounceData.bounceType);
      if (filter.length > 0) {
        result.filter(x => x.bounceType === mail.bounceData.bounceType)[0].mail.push(mail);
      } else {
        result.push({
          bounceType: mail.bounceData.bounceType,
          mail: [],
        });
      }
    });
    result.forEach((item) => {
      console.log(item.bounceType, item.mail.length);
    });
  });
