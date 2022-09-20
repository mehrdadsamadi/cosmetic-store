import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VueMeta from 'vue-meta';
import axios from 'axios';

import exception_handler from '@/mixins/exception_handler.js';
import notify from '@/mixins/notify';

import '@/../node_modules/leaflet/dist/leaflet.css'
import '@/scss/styles.scss';

axios.defaults.headers.common['Accept'] = "application/json";
axios.interceptors.response.use(function (response) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response;
}, function (error) {
	(error.message === "Network Error") && alert("متاسفانه اتصال با اینترنت یا سرور برقرار نیست، لطفا اتصال خود به اینترنت را بررسی کرده و مجدد تلاش کنید");

	console.error(error, error.message);
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	return Promise.reject(error);
});

Vue.config.productionTip = false

Vue.mixin(notify);
Vue.mixin(exception_handler);

Vue.use(VueMeta);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
