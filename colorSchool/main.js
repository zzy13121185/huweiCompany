import Vue from 'vue'
import App from './App'
import store from './store'
import cuCustom from './colorui/components/cu-custom.vue'
import temHome from './pages/function/temHome.vue'
import todoList from './pages/function/todoList.vue'
import scan from './pages/function/scan.vue'
import search from './pages/function/search.vue'
import xungeng from './pages/function/xungeng.vue'
import reportScan from './pages/function/reportScan.vue'
import xuncha from './pages/function/xuncha.vue'
// import normal from './pages/function/normal.vue'
import stepInfo from './pages/DangerDetailCom/stepInfo.vue'
Vue.component('cu-custom',cuCustom);
Vue.component('temHome',temHome);
Vue.component('todoList',todoList);
Vue.component('scan',scan);
Vue.component('search',search);
Vue.component('xungeng',xungeng);
Vue.component('reportScan',reportScan);
Vue.component('xuncha',xuncha);

Vue.component('stepInfo',stepInfo);

// Vue.component('normal',normal);
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
