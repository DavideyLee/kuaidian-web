//导入样式
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/scss/font-awesome.scss'

import './styles/index.scss' // global css
//导入Vue框架
import Vue from 'vue'
//导入组件
import router from './router'
import request from './request'
//导入状态管理器
import store from 'store'
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'

//使用element-ui
Vue.use(ElementUI)

//使用自定义插件
Vue.use(Plugins)

//使用request
Vue.use(request)

//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
// Vue.config.devtools = false

new Vue({
  router,
  store,
  ...App
}).
$mount('mainbody')
