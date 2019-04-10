const admin = require('firebase-admin');
const AWS = require('aws-sdk');

const firebaseCredentials = require('./key/firebase/credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: 'https://one-sig-uy.firebaseio.com',
});
const db = admin.firestore();

AWS.config.loadFromPath('./key/aws/credentials.json');
const SES = new AWS.SES();

const campaigns = [];

db.collection('marketing-campaign')
  .where('isActive', '==', true)
  .where('isProcessed', '==', false)
  .onSnapshot((querySnapshot) => {
    querySnapshot.forEach((campaign) => {
      if (!campaigns.includes(campaign.path)) {
        // Agregar la campaña a la lista
        campaigns.push(campaign.path);

        // Obtener las propiedades y datos de la campaña
        const campaignData = campaign.data();
        const campaignRef = campaign.path;
        const {
          businessRef,
          templateString,
          subject,
          sendFrom,
          replyTo,
        } = campaignData;
        const prospects = [];
        campaignData.prospects.forEach(async (prospectRef) => {
          const prospect = await db.doc(prospectRef).get();
          const people = await db.doc(prospect.data().people).get();
          const contacts = [];
          people.data().contacts.forEach(async (contactRef) => {
            const contact = await db.doc(contactRef)
              .get()
              .data();
            if (contact.type === 'mail') {
              contacts.push(contact.value);
            }
          });
          prospects.push({
            id: prospect.id,
            name: people.data().name,
            surname: people.data().surname,
            contacts,
          });
        });

        // Crear y subir el template a AWS SES
        const awsTemplateParams = {
          Template: {
            TemplateName: campaign.id,
            HtmlPart: templateString,
            SubjectPart: subject,
          },
        };

        SES.createTemplate(awsTemplateParams)
          .then(() => console.log(`Se genero satisfactoriamente la platilla en AWS SES con el id: ${campaign.id}`));

        // Generar los registros de email de la campaña y enviar los mismos por AWS SES
        prospects.forEach(async (prospect) => {
          const docRef = await db.collection('marketing-campaign-email').add({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            send: false,
            delivery: false,
            open: false,
            click: false,
            reject: false,
            bounce: false,
            complaint: false,
          });

          const awsSendParams = {
            Destination: {
              ToAddresses: prospect.contacts,
            },
            Source: sendFrom,
            Template: campaign.id,
            TemplateData: `{"name": ${prospect.name}, "surname": ${prospect.surname}}`,
            ReplyToAddresses: [replyTo],
            ConfigurationSetName: 'Marketing',
            Tags: [
              {
                Name: 'marketing-campaign',
                Value: campaignRef,
              },
              {
                Name: 'business',
                Value: businessRef,
              },
              {
                Name: 'marketing-campaign-email',
                Value: docRef.path,
              },
            ],
          };

          SES.sendTemplatedEmail(awsSendParams)
            .then(() => console.log(`Se envió el correo sactisvactoriamente al prospecto id: ${prospect.id}`));
        });
      }
    });
  });
