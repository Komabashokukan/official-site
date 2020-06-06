import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import moment from 'moment';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios, moment);

new Vue({
    router,
    store,
    vuetify,
    render : h => h(App)
}).$mount('#app');
