export default {
  addMediaList(state, media) {
    // eslint-disable-next-line no-unused-expressions
    state.mediaList.push(media);
  },
  setMediaList(state, mediaList) {
    // eslint-disable-next-line no-param-reassign
    state.mediaList = mediaList;
  },
};
