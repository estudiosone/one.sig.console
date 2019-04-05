const admin = require('firebase-admin');

let response;

const getCampaign = async (campaignRef) => {
  const query = await campaignRef.get().catch(error => response.status(500).send(error));
  if (!query.exists) {
    response.sendStatus(404);
  }
  const result = query.data();
  return result;
};

const getTemplate = async (campaignRef) => {
  let result;
  const query = await admin
    .firestore()
    .collection('marketing-campaign-template')
    .where('campaign', '==', campaignRef)
    .limit(1)
    .get();
  query.forEach((doc) => {
    result = doc.data();
  });
  if (!result) { response.sendStatus(404); }
  return result;
};

const getProspect = async (prospectRef) => {
  const query = await prospectRef.get().catch(error => response.status(500).send(error));
  if (!query.exists) {
    response.sendStatus(404);
  }
  const result = query.data();
  return result;
};

const getProspects = async (prospectRefs) => {
  let prospectList = [];
  prospectRefs.forEach((prospectRef) => {
    
  })
}

exports.sendCampaign = async (req, res) => {
  response = res;
  if (req.query.campaign) {
    const campaignRef = admin.firestore().collection('marketing-campaign').doc(req.query.campaign);
    const campaign = await getCampaign(campaignRef);
    const template = await getTemplate(campaignRef);
    const prospects = await getProspects(campaign.destinations);
    response.status(200).send(template.template);
  } else res.sendStatus(400);
};
