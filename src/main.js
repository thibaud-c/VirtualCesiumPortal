import { createApp } from 'vue';
import App from './App.vue';
import './index.css'


import i18n from './i18n';
import router from './router';

/* Create Vue App*/
const app = createApp(App);
app.config.productionTip = false;

// Add libs
app.use(router);
app.use(i18n);

app.mount('#app');

