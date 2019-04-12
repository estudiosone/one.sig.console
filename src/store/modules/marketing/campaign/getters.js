export default {
  list: (state) => {
    const result = [];
    state.list.forEach((element) => {
      const elementResult = element;

      if (!element.edited && !element.authorized && !element.processed && !element.sent) {
        elementResult.stepState = 0;
      } else if (element.edited && !element.authorized && !element.processed && !element.sent) {
        elementResult.stepState = 1;
      } else if (element.edited && element.authorized && !element.processed && !element.sent) {
        elementResult.stepState = 2;
      } else if (element.edited && element.authorized && element.processed && !element.sent) {
        elementResult.stepState = 3;
      } else if (element.edited && element.authorized && element.processed && element.sent) {
        elementResult.stepState = 4;
      }
      result.push(elementResult);
    });
    return result;
  },
  selected: state => state.selected,
  campaign: state => state.campaign,
  selectedList: state => state.selectedList,
  loading: state => state.loading,
};
