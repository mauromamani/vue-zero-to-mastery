import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import VeeValidationPlugin from './plugins/validation';
import { getAuth } from './plugins/firebase';

import './assets/css/tailwind.css';
import './assets/css/main.css';

let app = null;

// se ejecuta firebase auth en cada recarga de la pagina
// con esto nos aseguramos que si un usuario esta logeado recien se monte vue
getAuth.onAuthStateChanged(() => {
  // evitamos que se monte la app en cada recarga
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(VeeValidationPlugin);

    app.mount('#app');
  }
});
