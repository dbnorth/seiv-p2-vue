import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import vuetify from './plugins/vuetify';
import store from './store/store.js';

import GoogleAuth from './config/google_oAuth.js';

const gauthOption = {
    clientId:
        '344429607870-mmsdb296ne3vcb7popn96mclv3jnhigv.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account',
};
Vue.use(GoogleAuth, gauthOption);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
