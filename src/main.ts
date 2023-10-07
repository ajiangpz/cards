import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)
import SvgIcon from './components/SvgIcon/SvgIcon.vue';
import './assets/iconfont.js';
app.component('SvgIcon',SvgIcon);
app.use(createPinia())
app.mount('#app')
