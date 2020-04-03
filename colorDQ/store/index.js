import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			urlPrefix: 'https://huwei-soft.com/HWWechat',
			// urlPrefix: 'http://data.huwei-soft.cn/hwwechat',
			userInfo: {}
		},
    mutations: {},
    actions: {}
})
export default store