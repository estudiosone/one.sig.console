/* eslint-disable no-param-reassign */
export default {
  set_list(state, value) {
    state.list = value;
  },
  set_loading(state, value) {
    state.loading = value;
  },
  set_campaign(state, value) {
    const defaultCampaign = {
      id: '',
      timestamp: '',
      business: '',
      name: '',
      description: '',
      suscriptors: [],
      template: '',
      edited: false,
      authorized: false,
      processed: false,
      sent: false,
    };
    if (value) {
      state.campaign = value;
    } else {
      state.campaign = defaultCampaign;
    }
  },
  set_campaign_template(state, template) {
    state.campaign.template = template;
  },
};
