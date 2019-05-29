const admin = require('firebase-admin');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const firebaseCredentials = require('./firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: 'https://one-sig-uy.firebaseio.com',
});
const db = admin.firestore();

const campaign = 'IBh7MzH2FF9TjgPrjlcN';
// db.collection('marketing-campaign-email').where('open', '==', true)
//   .onSnapshot((querySnapshot) => {
//     const emails = [];
//     querySnapshot.forEach((doc) => {
//       emails.push(doc.data());
//     });
//     console.log(`Fueron abiertos ${emails.length} emails.`);
//   });

// db.collection('marketing-campaign-email').where('bounce', '==', true)
//   .onSnapshot((querySnapshot) => {
//     const emails = [];
//     querySnapshot.forEach((doc) => {
//       emails.push(doc.data());
//     });
//     console.log(`Fueron rebotados ${emails.length} emails.`);
//     const result = [];
//     emails.forEach((mail) => {
//       const filter = result.filter(x => x.bounceType === mail.bounceData.bounceType);
//       if (filter.length > 0) {
//         result.filter(x => x.bounceType === mail.bounceData.bounceType)[0].mail.push(mail);
//       } else {
//         result.push({
//           bounceType: mail.bounceData.bounceType,
//           mail: [],
//         });
//       }
//     });
//     result.forEach((item) => {
//       console.log(item.bounceType, item.mail.length);
//     });
//   });

db.collection('marketing-campaign-email')
  .where('campaign', '==', db.collection('marketing-campaign').doc(campaign))
  .get()
  .then((result) => {
    const emails = [];
    result.forEach((document) => {
      emails.push(document.data());
    });
    const enviados = emails.filter(x => x.send === true);
    const entregados = emails.filter(x => x.delivery === true);
    const abiertos = emails.filter(x => x.open === true);
    const rebotados = emails.filter(x => x.bounce === true);
    const rebotadosUndeterminedUndetermined = rebotados.filter(x => x.bounceData.bounceType === 'Undetermined');
    const rebotadosPermanentGeneral = rebotados.filter(x => x.bounceData.bounceType === 'Permanent' && x.bounceData.bounceSubType === 'General');
    const rebotadosPermanentNoEmail = rebotados.filter(x => x.bounceData.bounceType === 'Permanent' && x.bounceData.bounceSubType === 'NoEmail');
    const rebotadosPermanentSuppressed = rebotados.filter(x => x.bounceData.bounceType === 'Permanent' && x.bounceData.bounceSubType === 'Suppressed');
    const rebotadosTransientGeneral = rebotados.filter(x => x.bounceData.bounceType === 'Transient' && x.bounceData.bounceSubType === 'General');
    const rebotadosTransientMailboxFull = rebotados.filter(x => x.bounceData.bounceType === 'Transient' && x.bounceData.bounceSubType === 'MailboxFull');
    const rebotadosTransientMessageTooLarge = rebotados.filter(x => x.bounceData.bounceType === 'Transient' && x.bounceData.bounceSubType === 'MessageTooLarge');
    const rebotadosTransientContentRejected = rebotados.filter(x => x.bounceData.bounceType === 'Transient' && x.bounceData.bounceSubType === 'ContentRejected');
    const rebotadosTransientAttachmentRejected = rebotados.filter(x => x.bounceData.bounceType === 'Transient' && x.bounceData.bounceSubType === 'AttachmentRejected');
    console.log('Resultados parciales del envío:');
    console.log(`Procesados : ${emails.length}`);
    console.log(`Enviados   : ${enviados.length}`);
    console.log(`Entregados : ${entregados.length}`);
    console.log(`Abiertos   : ${abiertos.length}`);
    console.log(`Rebotados  : ${rebotados.length}`);
    console.log(`           | Undetermined                    : ${rebotadosUndeterminedUndetermined.length}`);
    console.log(`           | Permanent - General             : ${rebotadosPermanentGeneral.length}`);
    console.log(`           | Permanent - NoEmail             : ${rebotadosPermanentNoEmail.length}`);
    console.log(`           | Permanent - Suppressed          : ${rebotadosPermanentSuppressed.length}`);
    console.log(`           | Transient - General             : ${rebotadosTransientGeneral.length}`);
    console.log(`           | Transient - MailboxFull         : ${rebotadosTransientMailboxFull.length}`);
    console.log(`           | Transient - MessageTooLarge     : ${rebotadosTransientMessageTooLarge.length}`);
    console.log(`           | Transient - ContentRejected     : ${rebotadosTransientContentRejected.length}`);
    console.log(`           | Transient - AttachmentRejected  : ${rebotadosTransientAttachmentRejected.length}`);
    console.log(`Denunciados: ${emails.filter(x => x.complaint === true).length}`);

    const csvWriter = createCsvWriter({
      path: 'out.csv',
      header: [
        { id: 'email', title: 'Email' },
      ],
    });
    const csvWriterBounce = createCsvWriter({
      path: `bounce-${campaign}.csv`,
      header: [
        { id: 'email', title: 'Email' },
      ],
    });
    const data = [];
    const preData = [];
    const bounce = [];

    entregados.forEach(mail => preData.push(mail.sendData.destination[0]));
    rebotadosUndeterminedUndetermined.forEach(mail => bounce.push({ email: mail.sendData.destination[0] }));
    rebotadosPermanentGeneral.forEach(mail => bounce.push({ email: mail.sendData.destination[0] }));
    rebotadosPermanentNoEmail.forEach(mail => bounce.push({ email: mail.sendData.destination[0] }));
    rebotadosPermanentSuppressed.forEach(mail => bounce.push({ email: mail.sendData.destination[0] }));

    rebotadosUndeterminedUndetermined.forEach((mail) => {
      const email = mail.sendData.destination[0];
      if (preData.includes(email)) {
        const index = preData.indexOf(email);
        preData.splice(index, 1);
      }
    });
    rebotadosPermanentGeneral.forEach((mail) => {
      const email = mail.sendData.destination[0];
      if (preData.includes(email)) {
        const index = preData.indexOf(email);
        preData.splice(index, 1);
      }
    });
    rebotadosPermanentSuppressed.forEach((mail) => {
      const email = mail.sendData.destination[0];
      if (preData.includes(email)) {
        const index = preData.indexOf(email);
        preData.splice(index, 1);
      }
    });
    preData.forEach(mail => data.push({ email: mail }));

    csvWriter
      .writeRecords(data)
      .then(() => console.log('The CSV file was written successfully'));
    csvWriterBounce
      .writeRecords(bounce)
      .then(() => console.log('The CSV file was written successfully'));
  });
