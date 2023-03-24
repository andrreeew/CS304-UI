import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from "@arco-design/web-vue/es/icon"
import ECharts from 'vue-echarts'
import 'echarts';
import '@arco-design/web-vue/dist/arco.css'

const app = createApp(App)
app.component('ECharts', ECharts)
app.use(store)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)

app.mount('#app')

