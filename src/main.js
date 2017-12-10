import Vue from 'vue';
import App from './App';
import store from './store';

import '../node_modules/normalize.css/normalize.css';
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app');
