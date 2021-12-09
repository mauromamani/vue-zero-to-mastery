import { createStore } from 'vuex';

const store = new createStore({
  state: {
    authModalShow: false,
  },
  mutations: {
    handleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
  },
  getters: {
    //getAuthModalShow: (state) => state.authModalShow,
  },
  actions: {},
  modules: {},
});

export default store;
