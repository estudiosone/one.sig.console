const admin = require('firebase-admin');

const firebaseCredentials = require('../firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: 'https://one-sig-uy.firebaseio.com',
});
const db = admin.firestore();

const GetMarketingCampaignMail = async (campaignRef) => {
  const emails = [];
  const result = await db
    .collection('marketing-campaign-email')
    .where('campaign', '==', campaignRef)
    .get()
    .catch(error => console.error(error));
  result.forEach(item => emails.push(item));
  return emails;
};

const UploadPeopleContactFromCampaignMail = async (campaignRef) => {
  const emails = await GetMarketingCampaignMail(campaignRef);
  let i = 0;

  emails.forEach(async (email) => {
    const value = email.data().to;

    i += 1;
    console.log(`Procesando registro ${i} de ${emails.length}`);
    if (value !== undefined) {
      db.collection('people-contact').where('value', '==', value).get()
        .then((result) => {
          if (result.length === undefined) {
            console.log(value);
            db.collection('people-contact').add({
              description: '',
              type: 'email',
              value,
            }).then((subResult) => {
              db.collection('marketing-campaign-email').doc(email.id).update({
                to: db.collection('people-contact').doc(subResult.id),
              });
            });
          }
        });
    }
  });
};

const SetPeopleContactCampaignResult = async (campaignRef) => {
  const emails = await GetMarketingCampaignMail(campaignRef);
  let i = 0;
  emails.forEach(async (email) => {
    const emailData = email.data();
    const peopleContactRef = emailData.to;
    i += 1;
    console.log(`Procesando registro ${i} de ${emails.length}`);
    if (peopleContactRef) {
      db.doc(peopleContactRef)
        .get()
        .then((peopleContact) => {
          const peopleContactData = peopleContact.data();
          let send = peopleContactData.send || 0;
          let delivery = peopleContactData.send || 0;
          let open = peopleContactData.send || 0;
          let bouncePermanent = peopleContactData.send || 0;
          let bounceTransient = peopleContactData.send || 0;
          let complaint = peopleContactData.send || 0;

          if (emailData.send) { send += 1; }
          if (emailData.delivery) { send += 1; }
          if (emailData.open) { send += 1; }
          if (emailData.delivery) { send += 1; }
          if (emailData.delivery) { send += 1; }
          if (emailData.delivery) { send += 1; }
        })
    }
  });
};

SetPeopleContactCampaignResult(db.collection('marketing-campaign').doc('QBeUdLCrVUZ9wAr62GC7'));
