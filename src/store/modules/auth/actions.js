import firebase from 'firebase';

export default {
  // eslint-disable-next-line no-unused-vars
  signIn(context, user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .catch(() => {
        context.commit('set_signInError', true);
      });
  },
};
