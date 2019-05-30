/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const admin = require('firebase-admin');
const AWS = require('aws-sdk');

module.exports = async (param) => {
  const db = admin.firestore();
  AWS.config.loadFromPath('./config.json');
  const SES = new AWS.SES();

  const {
    destinations,
    templateName,
    source,
    replyToAddresses,
  } = param;

  const x = 0;
  const y = destinations.length;
  for (const destination of destinations) {
    console.log(`Procesando email ${x} de ${y}`);
    console.log(`Enviando mail a ${destination}`);

    const mailResult = await db.collection('marketing-campaign-email').add({
      send: false,
      delivery: false,
      open: false,
      campaign: db.collection('marketing-campaign').doc(templateName),
      to: destination,
    });

    console.log(`Id de mail: ${mailResult.id}`);

    const sendParams = {
      Destination: {
        /* required */
        ToAddresses: [
          destination,
        ],
      },
      Source: source,
      /* required */
      Template: templateName,
      /* required */
      // eslint-disable-next-line no-useless-escape
      TemplateData: '{ \"name\":\"Cliente\" }',
      /* required */
      ReplyToAddresses: replyToAddresses,
      Tags: [{
        Name: 'marketing-campaign-email',
        /* required */
        Value: mailResult.id,
        /* required */
      },
      {
        Name: 'marketing-campaign',
        /* required */
        Value: templateName,
        /* required */
      },
        /* more items */
      ],
      ConfigurationSetName: 'Marketing',
    };

    const sendResult = await SES.sendTemplatedEmail(sendParams).promise()
      .catch((err) => {
        console.error(err, err.stack, destination);
      });
    await setTimeout(() => {
      console.log(`Id de envío: ${sendResult.MessageId}`);
    }, 100);
  }
};
