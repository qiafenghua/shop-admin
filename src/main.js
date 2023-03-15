import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./permission"

const app = createApp(App)
app.use(router)
app.use(ElementPlus)

//element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store)

import 'virtual:windi.css'
//全局加载进度样式
import "nprogress/nprogress.css"
app.mount('#app')
