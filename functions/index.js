/* eslint-disable prefer-destructuring */
const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');

const PROJECTID = 'one-sig-uy';

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});
const getJson = text => JSON.parse(text);

exports.sns_ses_marketing = functions.https.onRequest((request, response) => {
  let jsonMessage;
  let messageId;
  let destination;
  let timestamp;
  let delivery;
  let open;
  let value;

  if (request.headers) {
    const notify = JSON.parse(request.body);
    if (notify.type) {
      switch (notify.Type) {
        case 'SubscriptionConfirmation':
          console.log('Para confirmar la suscripción ir a: ', notify.SubscribeURL);
          response.sendStatus(200);
          break;
        case 'Notification':
          // processNotification(response, notify.Message);
          jsonMessage = getJson(notify.Message);

          if (jsonMessage.eventType) {
            switch (jsonMessage.eventType) {
              case 'Send':
                // NotifySend(response, jsonMessage);
                messageId = jsonMessage.mail.messageId;
                destination = jsonMessage.mail.destination;
                timestamp = jsonMessage.mail.timestamp;

                value = {
                  to: destination,
                  send: true,
                  sendTimestamp: timestamp,
                };

                return firestore.collection('marketing-campaign-mail').doc(messageId).set({
                  to: destination,
                  send: true,
                  sendTimestamp: timestamp,
                })
                  .then(() => response.sendStatus(200))
                  .catch((err) => {
                    console.error(err);
                    response.sendStatus(500);
                  });
              case 'Delivery':
                // NotifyDelivery(response, jsonMessage);
                messageId = jsonMessage.mail.messageId;
                delivery = jsonMessage.delivery;

                value = {
                  delivery: true,
                  deliveryTimestamp: delivery.timestamp,
                };

                return firestore.collection('marketing-campaign-mail').doc(messageId).set({
                  to: destination,
                  send: true,
                  sendTimestamp: timestamp,
                })
                  .then(() => response.sendStatus(200))
                  .catch((err) => {
                    console.error(err);
                    response.sendStatus(500);
                  });
              case 'Open':
                // NotifyOpen(response, jsonMessage);
                messageId = jsonMessage.mail.messageId;
                open = jsonMessage.open;

                return firestore.collection('marketing-campaign-mail').doc(messageId).set({
                  delivery: true,
                  deliveryTimestamp: delivery.timestamp,
                })
                  .then(() => response.sendStatus(200))
                  .catch((err) => {
                    console.error(err);
                    response.sendStatus(500);
                  });
              case 'Click':
                break;
              case 'Bounce':
                break;
              case 'Complaint':
                break;
              case 'Reject':
                break;
              default:
                console.warn('Tipo de evento no soportado', jsonMessage);
                response.sendStatus(400);
                break;
            }
          }
          break;
        default:
          console.warn('Notify not supported', request.body);
          response.sendStatus(400);
          break;
      }
    }
  }
});
