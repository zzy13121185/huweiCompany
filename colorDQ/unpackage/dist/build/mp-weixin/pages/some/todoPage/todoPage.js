(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/some/todoPage/todoPage"],{"308c":function(e,a,t){"use strict";t.r(a);var n=t("3fbe"),i=t.n(n);for(var o in n)"default"!==o&&function(e){t.d(a,e,function(){return n[e]})}(o);a["default"]=i.a},"3fbe":function(e,a,t){"use strict";(function(e){function t(e,a){return o(e)||i(e,a)||n()}function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function i(e,a){var t=[],n=!0,i=!1,o=void 0;try{for(var r,s=e[Symbol.iterator]();!(n=(r=s.next()).done);n=!0)if(t.push(r.value),a&&t.length===a)break}catch(c){i=!0,o=c}finally{try{n||null==s["return"]||s["return"]()}finally{if(i)throw o}}return t}function o(e){if(Array.isArray(e))return e}Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r={name:"temHome",data:function(){return{todoList:[]}},onLoad:function(){},methods:{getTodoNum:function(){var a=this;e.request({url:a.$store.state.urlPrefix+"/Process/Get_Mytask",data:{RYXH:a.$store.state.userInfo.RYXH}}).then(function(e){var n=t(e,2),i=(n[0],n[1]);if("暂无数据"==i.data);else{var o=JSON.parse(i.data);a.todoList=o,console.log(a.todoList)}})},gotoNext:function(a){var t=JSON.stringify(a),n=a.BranchId;switch(n=n.split("-"),n=n[n.length-1],console.log(n),n){case"15":e.navigateTo({url:"/pages/steps/dangerReview/dangerReview?info="+t});break;case"17":e.navigateTo({url:"/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info="+t});break;case"25":e.navigateTo({url:"/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info="+t});break;case"26":e.navigateTo({url:"/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info="+t});break;case"27":e.navigateTo({url:"/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info="+t});break;case"21":e.navigateTo({url:"/pages/steps/changeReview/changeReview?info="+t});break;case"18":e.navigateTo({url:"/pages/steps/changeReview/changeReview?info="+t});break;case"19":e.navigateTo({url:"/pages/steps/changeReview/changeReview?info="+t});break;case"23":e.navigateTo({url:"/pages/steps/changeReview/changeReview?info="+t});break;case"16":e.navigateTo({url:"/pages/steps/chiefDeal/chiefDeal?info="+t});break;case"20":e.navigateTo({url:"/pages/steps/chiefDeal/chiefDeal?info="+t});break;case"22":e.navigateTo({url:"/pages/steps/presidentDeal/presidentDeal?info="+t});break;case"7":e.navigateTo({url:"/pages/steps/overDue/overDue?info="+t});break;case"8":e.navigateTo({url:"/pages/steps/overDue/overDue?info="+t});break;case"9":e.navigateTo({url:"/pages/steps/overDue/overDue?info="+t});break;default:break}}},mounted:function(){e.showLoading({title:"加载中。。。",mask:!0}),this.getTodoNum(),this.$nextTick(function(){e.hideLoading()})}};a.default=r}).call(this,t("543d")["default"])},"71fc":function(e,a,t){"use strict";t.r(a);var n=t("dc0d"),i=t("308c");for(var o in i)"default"!==o&&function(e){t.d(a,e,function(){return i[e]})}(o);var r=t("2877"),s=Object(r["a"])(i["default"],n["a"],n["b"],!1,null,null,null);a["default"]=s.exports},dc0d:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement;e._self._c},i=[];t.d(a,"a",function(){return n}),t.d(a,"b",function(){return i})},fb27:function(e,a,t){"use strict";(function(e){t("2bd2"),t("921b");n(t("66fd"));var a=n(t("71fc"));function n(e){return e&&e.__esModule?e:{default:e}}e(a.default)}).call(this,t("543d")["createPage"])}},[["fb27","common/runtime","common/vendor"]]]);