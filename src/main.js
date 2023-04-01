import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from "@arco-design/web-vue/es/icon"
import ECharts from 'vue-echarts'
import 'echarts';
import '@arco-design/web-vue/dist/arco.css'
import VueNativeSock from 'vue-native-websocket-vue3'


const app = createApp(App)
app.component('ECharts', ECharts)
app.use(store)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(VueNativeSock, 'ws://localhost:5002', {
    reconnection: true, // 是否自动重新连接
    reconnectionAttempts: 5, // 重新连接次数
    reconnectionDelay: 3000, // 重新连接间隔（毫秒）
    format: 'json', // 接收到的数据格式
})

app.mount('#app')

