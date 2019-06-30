const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');
const SES = new AWS.SES();

module.exports = async (params) => {
  await SES.deleteTemplate(params, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
};
