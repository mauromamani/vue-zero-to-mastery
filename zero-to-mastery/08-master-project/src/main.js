import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VeeValidationPlugin from './plugins/validation';
import Icon from './directives/icon';
import { getAuth } from './plugins/firebase';
import i18n from './plugins/i18n';

import './assets/css/tailwind.css';
import './assets/css/main.css';

let app = null;

// se ejecuta firebase auth en cada recarga de la pagina
// con esto nos aseguramos que si un usuario esta logeado recien se monte vue
getAuth.onAuthStateChanged(() => {
  // evitamos que se monte la app en cada recarga
  if (!app) {
    app = createApp(App);

    app.use(i18n);
    app.use(store);
    app.use(router);
    app.use(VeeValidationPlugin);
    app.directive('icon', Icon);

    app.mount('#app');
  }
});
