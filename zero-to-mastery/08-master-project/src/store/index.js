import { createStore } from 'vuex';
import { getAuth, usersCollection } from '../plugins/firebase.js';
import { Howl } from 'howler';
import { formatTime } from '../utils/formatTime.js';

const store = new createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  mutations: {
    handleAuthModal: (state) => (state.authModalShow = !state.authModalShow),
    handleAuth: (state) => (state.userLoggedIn = !state.userLoggedIn),
    newSong: (state, payload) => {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition: (state) => {
      // duracion y minutos de la cancion que se reproduce
      state.seek = formatTime(state.sound.seek());
      state.duration = formatTime(state.sound.duration());
      state.playerProgress = `${
        (state.sound.seek() / state.sound.duration()) * 100
      }%`;
    },
  },
  getters: {
    //getAuthModalShow: (state) => state.authModalShow,
    getPlaying: (state) =>
      state.sound.playing ? state.sound.playing() : false,
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
    async newSong(ctx, payload) {
      // evitando que muchas canciones se reproduzcan al mismo tiempo
      if (ctx.state.sound instanceof Howl) {
        ctx.state.sound.unload();
      }

      ctx.commit('newSong', payload);
      // es necesario que se ejecute la funcion play para poder comenzar la reproduccion del sonido
      ctx.state.sound.play();

      // mientras se este ejecutando la funcion llamamos a otra action
      ctx.state.sound.on('play', () => {
        requestAnimationFrame(() => {
          ctx.dispatch('progress');
        });
      });
    },
    async toggleAudio(ctx) {
      // asegurando que no se este reproduciendo algo
      if (!ctx.state.sound.playing) return;

      if (ctx.state.sound.playing()) {
        ctx.state.sound.pause();
      } else {
        ctx.state.sound.play();
      }
    },
    progress(ctx) {
      ctx.commit('updatePosition');

      // como requestAnimationFrame no es recursiva usamos este condicional para llamar al mutation y actualizar el state
      if (ctx.state.sound.playing()) {
        requestAnimationFrame(() => {
          ctx.dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) return;

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      // update seek
      state.sound.seek(seconds);
      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
  modules: {},
});

export default store;
