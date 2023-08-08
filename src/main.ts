import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Maska from 'maska';
import App from './App.vue';
import router from './router';
import Notifications from '@kyvg/vue3-notification';

import './styles/tailwind.scss';
import './styles/index.scss';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

app.use(Notifications);
app.use(Maska);
app.use(createPinia());
app.use(router);
app.component('Datepicker', Datepicker);

app.mount('#app');
