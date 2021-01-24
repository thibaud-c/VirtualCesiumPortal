import { createApp } from 'vue';
import App from './App.vue';
// Bulma + fontawesome
import 'bulma/css/bulma.css';
import 'bulma-switch/dist/css/bulma-switch.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faGithubAlt,
  faTwitter } from '@fortawesome/free-brands-svg-icons';
import {faCompass, faSearchLocation,faCommentMedical,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import i18n from './i18n';
import router from './router';

library.add(faGithubAlt,faTwitter, faCompass, faSearchLocation,faCommentMedical,faArrowLeft);

/* Create Vue App*/
const app = createApp(App);
app.config.productionTip = false;

// Add fontawesome
app.component('font-awesome-icon', FontAwesomeIcon);

// Add libs
app.use(i18n);
app.use(router);

app.mount('#app');

