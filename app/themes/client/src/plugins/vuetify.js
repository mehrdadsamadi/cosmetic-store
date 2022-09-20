import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fa from 'vuetify/es5/locale/fa';

Vue.use(Vuetify);

export default new Vuetify({
    rtl: true,
    lang: {
		locales: { fa },
		current: 'fa',
	},
	icons: {
		iconfont: 'fa',
		values: {
			clear: 'fas fa-times',
		}
	},
	theme: {
		themes: {
		  light: {
			primary: '#F67280',
			secondary: '#F6F6F8',
			error: '#990134',
			info: '#3949ab',
			success: '#4CAF50',
			warning: '#FFC107',
		  },
		},
	},
});
