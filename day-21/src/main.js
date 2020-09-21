import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

import './css/main.css';
import './css/iconfont/flaticon.css';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
