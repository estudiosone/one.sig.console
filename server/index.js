/* eslint-disable no-plusplus */
/* eslint-disable security/detect-object-injection */
const admin = require('firebase-admin');
const csv = require('csv-parser');
const fs = require('fs');
const createTemplate = require('./mailOperations/createTemplate');
const send = require('./mailOperations/send');
const deleteTemplate = require('./mailOperations/deleteTemplate');


const firebaseCredentials = require('./firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: 'https://one-sig-uy.firebaseio.com',
});

const sendTemplate = async () => {
  const destinations = [];
  fs.createReadStream('out.csv')
    .pipe(csv())
    .on('data', (row) => {
      destinations.push(row.Email);
    })
    .on('end', async () => {
      const templateName = 'v8vyVkmsyY4EGtc8WXvf';
      const source = 'El Descubrimiento RESORT CLUB <noreply@eldescubrimiento.com>';
      const replyToAddresses = [
        'El Descubrimiento RESORT CLUB <info@eldescubrimiento.com>',
      ];
      await createTemplate({
        Template: {
          TemplateName: templateName,
          HtmlPart: `
            <div>
              <a target="_blank"
                href="http://eldescubrimiento.com/promociones?utm_campaign=Vacaciones+de+invierno+2019&utm_medium=email&utm_source=newsletter"
                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543;">
                <img class="adapt-img"
                  src="http://www.eldescubrimiento.com/wp-content/uploads/2019/05/2019-05-VACACIONES-DE-INV_FULL-min.png" alt
                  style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; margin: 0 auto; max-width: 620px;"
                  width="100%">
              </a>
            </div>`,
          SubjectPart: 'Vacaciones de invierno',
        },
      });
      await send({
        destinations,
        templateName,
        source,
        replyToAddresses,
      });
      await deleteTemplate({
        TemplateName: templateName,
      });
    });
};

sendTemplate();
