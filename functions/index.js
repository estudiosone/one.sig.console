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
      admin
        .firestore()
        .collection('marketing-campaign-mail')
        .doc(message.mail.messageId)
        .set({
          send: {
            timestamp: message.mail.timestamp,
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
            timestamp: message.delivery.timestamp,
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
            timestamp: message.open.timestamp,
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
