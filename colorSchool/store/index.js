import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			//测试
			// urlPrefix: 'https://data.huwei-soft.cn/SchoolTest',
			//正式
			urlPrefix: 'https://huwei-soft.com/SchoolTest',    
			userInfo: {}
		},
    mutations: {},
    actions: {}
})
export default store