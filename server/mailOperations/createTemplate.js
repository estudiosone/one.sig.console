const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');
const SES = new AWS.SES();

module.exports = async (params) => {
  SES.createTemplate(params)
    .promise()
    .then((data) => {
      console.log('Se creó la plantilla satisfactoriamente', data);
    })
    .catch((error) => {
      console.error(error);
    });
};
