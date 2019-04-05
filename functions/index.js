/* eslint-disable prefer-destructuring */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const getJson = text => JSON.parse(text);

exports.sns_ses_marketing = functions.https.onRequest((request, response) => {
  const notify = JSON.parse(request.body);

  const message = getJson(notify.Message);

  switch (message.eventType) {
    case 'Send': {
      console.log(message.mail.tags['marketing-campaign']);
      let campaignRef;
      if (message.mail.tags['marketing-campaign']) {
        const marketingCampaign = message.mail.tags['marketing-campaign'];
        campaignRef = admin.firestore().collection('marketing-campaign').doc(marketingCampaign[0]);
      }
      admin
        .firestore()
        .collection('marketing-campaign-mail')
        .doc(message.mail.messageId)
        .set({
          campaign: campaignRef,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          send: {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            source: message.mail.source,
            destination: message.mail.destination,
          },
        })
        .then(() => {
          response.sendStatus(200);
        })
        .catch((error) => {
          console.error('No se pudo actualizar el registro', error);
          response.status(500).send(error);
        });
      break;
    }
    case 'Delivery': {
      admin
        .firestore()
        .collection('marketing-campaign-mail')
        .doc(message.mail.messageId)
        .update({
          delivery: {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            smtpResponse: message.delivery.smtpResponse,
          },
        })
        .then(() => {
          response.sendStatus(200);
        })
        .catch((error) => {
          console.error('No se pudo actualizar el registro', error);
          response.status(500).send(error);
        });
      break;
    }
    case 'Open': {
      admin
        .firestore()
        .collection('marketing-campaign-mail')
        .doc(message.mail.messageId)
        .update({
          open: {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            ipAddress: message.open.ipAddress,
            userAgent: message.open.userAgent,
          },
        })
        .then(() => {
          response.sendStatus(200);
        })
        .catch((error) => {
          console.error('No se pudo actualizar el registro', error);
          response.status(500).send(error);
        });
      break;
    }
    default: {
      console.warn('No podemos procesar correctamente el contenido de la notificación', message);
      response.sendStatus(200);
    }
  }
});
