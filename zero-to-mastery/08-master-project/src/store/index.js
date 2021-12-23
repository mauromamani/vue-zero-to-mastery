import { createStore } from 'vuex';
import { getAuth, usersCollection } from '../plugins/firebase.js';

const store = new createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    handleAuthModal: (state) => (state.authModalShow = !state.authModalShow),
    handleAuth: (state) => (state.userLoggedIn = !state.userLoggedIn),
  },
  getters: {
    //getAuthModalShow: (state) => state.authModalShow,
  },
  actions: {
    async registerUser(ctx, payload) {
      // create an user & return created id
      const userCredentials = await getAuth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      // add user to collection in firestore, here we create a "relation" for the auth and document to create
      // doc: allow us to change uid for the document
      // set: allow us to change or create a document
      await usersCollection.doc(userCredentials.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await userCredentials.user.updateProfile({
        displayName: payload.name,
      });

      // ! El parametro ctx, hace referencia al store, seria basicamente como usar el "this"
      // change userLoggedIn state using mutation
      ctx.commit('handleAuth');
    },
    async loginUser(ctx, payload) {
      await getAuth.signInWithEmailAndPassword(payload.email, payload.password);
      ctx.commit('handleAuth');
    },
    async logoutUser(ctx) {
      await getAuth.signOut();
      ctx.commit('handleAuth');
    },
    initLogin(ctx) {
      // checking if user is logged in, or null
      const user = getAuth.currentUser;

      // if exists user change the state
      if (user) {
        ctx.commit('handleAuth');
      }
    },
  },
  modules: {},
});

export default store;
