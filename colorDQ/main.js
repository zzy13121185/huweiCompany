import Vue from 'vue'
import App from './App'
import store from './store'
import cuCustom from './colorui/components/cu-custom.vue'
import temHome from './pages/function/temHome.vue'

import search from './pages/function/search.vue'
import worker from './pages/function/worker.vue'

import stepInfo from './pages/DangerDetailCom/stepInfo.vue'
Vue.component('cu-custom',cuCustom);
Vue.component('temHome',temHome);
Vue.component('worker',worker);

Vue.component('search',search);


Vue.component('stepInfo',stepInfo);
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
