import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import './directive/premissionBtn'
import './assets/css/public.css'
import './element-variables.scss'
import FormMaking from '@/views/formDesign/index'
import VueParticles from 'vue-particles'
import VueClipboard from 'vue-clipboard2'
import { messages } from './assets/js/common'

// 引入第三方table组件
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

// 引入字体文件
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'
Vue.use(VueParticles)
Vue.use(FormMaking)
Vue.use(VueClipboard)
// 挂在第三方table组件
Vue.use(VXETable)
// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal
//全局挂载提示框
Vue.prototype.$message = messages
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')