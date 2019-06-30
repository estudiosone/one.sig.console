import firebase from 'firebase';

export default {
  // eslint-disable-next-line no-unused-vars
  async signIn(context, user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    // .catch(() => {
    //   context.commit('set_signInError', true);
    // });
  },
  async signOut() {
    return firebase.auth().signOut();
    // .catch(() => {
    //   context.commit('set_signInError', true);
    // });
  },
};
