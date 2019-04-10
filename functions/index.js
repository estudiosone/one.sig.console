/* eslint-disable prefer-destructuring */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const getJson = text => JSON.parse(text);
const getEmailId = tags => tags['marketing-campaign-email'];

exports.sns_ses_marketing = functions.https.onRequest((request, response) => {
  const notify = JSON.parse(request.body);
  const message = getJson(notify.Message);
  switch (message.eventType) {
    case 'Send': {
      admin
        .firestore()
        .collection('marketing-campaign-email')
        .doc(getEmailId(message.mail.tags)[0])
        .update({
          'aws-ses-messageId': message.mail.messageId,
          send: true,
          sendData: {
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
        .collection('marketing-campaign-email')
        .doc(getEmailId(message.mail.tags)[0])
        .update({
          delivery: true,
          deliveryData: {
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
        .collection('marketing-campaign-email')
        .doc(getEmailId(message.mail.tags)[0])
        .update({
          open: true,
          openData: {
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
