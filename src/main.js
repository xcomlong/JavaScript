import Vue from 'vue'
import App from './App.vue'

import { Button, Dialog } from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button);
Vue.use(Dialog);

import dialog from './plugins/Dialog';
Vue.use(dialog);

new Vue({
  el: '#app',
  render: h => h(App)
})
