const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./key/one-sig-uy-firebase-adminsdk-yot8x-9444e85f45.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-sig-uy.firebaseio.com',
});

const App = express();

App.get('/', async (req, res) => {
  if (req.query.campaign) {
    const campaignRef = admin.firestore().collection('marketing-campaign').doc(req.query.campaign);
    const campaign = await campaignRef.get();

    if (campaign.exists) {
      console.log(campaign.data().campaignName);
    }
  }
  res.send('Hello');
});

App.listen(3000, () => {
  console.log('listening on port 3000');
});
