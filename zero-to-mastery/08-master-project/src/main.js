import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import VeeValidationPlugin from './plugins/validation';

import './assets/css/tailwind.css';
import './assets/css/main.css';

const app = createApp(App);

app.use(store);
app.use(VeeValidationPlugin);

app.mount('#app');
