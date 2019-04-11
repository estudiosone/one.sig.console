/* eslint-disable no-plusplus */
/* eslint-disable security/detect-object-injection */
const admin = require('firebase-admin');
const AWS = require('aws-sdk');
const dataRAW = require('./data.json');


const firebaseCredentials = require('./firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: 'https://one-sig-uy.firebaseio.com',
});
const db = admin.firestore();

AWS.config.loadFromPath('./config.json');
const SES = new AWS.SES();

const uploadTemplate = async () => {
  // Create createTemplate params
  const params = {
    Template: {
      TemplateName: 'QBeUdLCrVUZ9wAr62GC7',
      HtmlPart: '<div><h2>Tus próximas vacaciones están a un clic!!!</h2><br><p>¡En turismo tenemos esta promo para ti!</p><br><img href="http://www.eldescubrimiento.com" style="max - width:100 %; display: inline - block" src="http://www.livebeep.com/visitor/medias/file/image/large/163/p/Promo-Turismo-feed-jpg-210226.jpg"></div>',
      SubjectPart: 'Últimos lugares para turismo!',
    },
  };

  // Create the promise and SES service object
  SES.createTemplate(params)
    .promise()
    .then((data) => {
      console.log('Se creó la plantilla satisfactoriamente', data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const waitFor = ms => new Promise(r => setTimeout(r, ms));
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

const deleteTemplate = async () => {
  await SES.deleteTemplate({ TemplateName: 'QBeUdLCrVUZ9wAr62GC7' });
  console.log('Se eliminó la plantilla correctamente');
};

const sendTemplate = async () => {
  const destinations = dataRAW.Data;
  const templateName = 'QBeUdLCrVUZ9wAr62GC7';
  const source = 'El Descubrimiento RESORT CLUB <noreplay@eldescubrimiento.com>';
  const replyToAddresses = ['El Descubrimiento RESORT CLUB <info@eldescubrimiento.com>'];
  let x = 0;
  const y = destinations.length;
  await asyncForEach(destinations, async (destination) => {
    await waitFor(100);
    x++;
    console.log(`Procesando email ${x} de ${y}`);
    console.log('Se esta enviando a: ', destination);

    db.collection('marketing-campaign-email').add({
      send: false,
      delivery: false,
      open: false,
      campaign: db.collection('marketing-campaign').doc(templateName),
      to: destination,
    }).then((result) => {
      console.log('Id: ', result.id);
      const params = {
        Destination: { /* required */
          ToAddresses: [
            destination,
          ],
        },
        Source: source, /* required */
        Template: templateName, /* required */
        // eslint-disable-next-line no-useless-escape
        TemplateData: '{ \"name\":\"Cliente\" }', /* required */
        ReplyToAddresses: replyToAddresses,
        Tags: [
          {
            Name: 'marketing-campaign-email', /* required */
            Value: result.id, /* required */
          },
          /* more items */
        ],
        ConfigurationSetName: 'Marketing',
      };
      SES.sendTemplatedEmail(params)
        .promise()
        .then((data) => {
          console.log(data.MessageId);
        })
        .catch((err) => {
          console.error(err, err.stack, destination);
        });

      console.log('Enviado');
    });
  });
};

// uploadTemplate();
sendTemplate();
// deleteTemplate();

// const campaigns = [];

// db.collection('marketing-campaign')
//   .where('isActive', '==', true)
//   .where('isProcessed', '==', false)
//   .onSnapshot((querySnapshot) => {
//     querySnapshot.forEach((campaign) => {
//       if (!campaigns.includes(campaign.path)) {
//         // Agregar la campaña a la lista
//         campaigns.push(campaign.path);

//         // Obtener las propiedades y datos de la campaña
//         const campaignData = campaign.data();
//         const campaignRef = campaign.path;
//         const {
//           businessRef,
//           templateString,
//           subject,
//           sendFrom,
//           replyTo,
//         } = campaignData;
//         const prospects = [];
//         campaignData.prospects.forEach(async (prospectRef) => {
//           const prospect = await db.doc(prospectRef).get();
//           const people = await db.doc(prospect.data().people).get();
//           const contacts = [];
//           people.data().contacts.forEach(async (contactRef) => {
//             const contact = await db.doc(contactRef)
//               .get()
//               .data();
//             if (contact.type === 'mail') {
//               contacts.push(contact.value);
//             }
//           });
//           prospects.push({
//             id: prospect.id,
//             name: people.data().name,
//             surname: people.data().surname,
//             contacts,
//           });
//         });

//         // Crear y subir el template a AWS SES
//         const awsTemplateParams = {
//           Template: {
//             TemplateName: campaign.id,
//             HtmlPart: templateString,
//             SubjectPart: subject,
//           },
//         };

//         SES.createTemplate(awsTemplateParams)
//           .then(() => console.log(`Se genero satisfactoriamente la platilla en AWS SES con el id: ${campaign.id}`));

//         // Generar los registros de email de la campaña y enviar los mismos por AWS SES
//         prospects.forEach(async (prospect) => {
//           const docRef = await db.collection('marketing-campaign-email').add({
//             timestamp: admin.firestore.FieldValue.serverTimestamp(),
//             send: false,
//             delivery: false,
//             open: false,
//             click: false,
//             reject: false,
//             bounce: false,
//             complaint: false,
//           });

//           const awsSendParams = {
//             Destination: {
//               ToAddresses: prospect.contacts,
//             },
//             Source: sendFrom,
//             Template: campaign.id,
//             TemplateData: `{"name": ${prospect.name}, "surname": ${prospect.surname}}`,
//             ReplyToAddresses: [replyTo],
//             ConfigurationSetName: 'Marketing',
//             Tags: [
//               {
//                 Name: 'marketing-campaign',
//                 Value: campaignRef,
//               },
//               {
//                 Name: 'business',
//                 Value: businessRef,
//               },
//               {
//                 Name: 'marketing-campaign-email',
//                 Value: docRef.path,
//               },
//             ],
//           };

//           SES.sendTemplatedEmail(awsSendParams)
//             .then(() => console.log(`Se envió el correo sactisvactoriamente al prospecto id: ${prospect.id}`));
//         });
//       }
//     });
//   });
