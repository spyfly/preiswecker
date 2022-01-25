import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import router from './router'
import store from "./store/store";

import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

/* axios */
import axios from 'axios'
import VueAxios from 'vue-axios'


/* FA */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'




library.add(fas);

const config = {
    colors: { 'primary': '#A3D39C', 'secondary': '#3D3D3D', 'abort' : '#E45F56'},
  }


createApp(App)
    .use(router)
    .component("fa", FontAwesomeIcon)
    .use(VuesticPlugin, config)
    .use(VueAxios, axios)
    .use(store)
    .use(BootstrapVue3)
    .mount('#app')
