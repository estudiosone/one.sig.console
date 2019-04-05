const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./key/one-sig-uy-firebase-adminsdk-yot8x-9444e85f45.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-sig-uy.firebaseio.com',
});

const Send = require('./api/marketing/campaign/send');

const App = express();

App.get('/', Send.sendCampaign);

App.listen(3000, () => {
  console.log('listening on port 3000');
});
