import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import router from './router'
import store from "./store/store";


/* axios */
import axios from 'axios'
import VueAxios from 'vue-axios'


/* FA */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'


library.add(fas);


createApp(App)
    .use(router)
    .component("fa", FontAwesomeIcon)
    .use(VuesticPlugin)
    .use(VueAxios, axios)
    .use(store)
    .mount('#app')
