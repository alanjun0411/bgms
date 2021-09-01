import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './static/css/iconfont.css'
import * as echarts from 'echarts'
import publics from './static/js/public'

const app = createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
app.echarts = echarts
app.publics = publics
