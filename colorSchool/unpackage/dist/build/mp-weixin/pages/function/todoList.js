(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/function/todoList"],{"2d8b9":function(e,t,n){"use strict";(function(e){function n(e,t){return i(e)||r(e,t)||a()}function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function r(e,t){var n=[],a=!0,r=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done);a=!0)if(n.push(o.value),t&&n.length===t)break}catch(u){r=!0,i=u}finally{try{a||null==s["return"]||s["return"]()}finally{if(r)throw i}}return n}function i(e){if(Array.isArray(e))return e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"temHome",props:{msg:{type:String,default:""}},data:function(){return{todoList:[]}},onLoad:function(){},methods:{getTodoNum:function(){var t=this;e.request({url:t.$store.state.urlPrefix+"/Process/Get_Mytask",data:{RYXH:t.$store.state.userInfo.RYXH}}).then(function(e){var a=n(e,2),r=(a[0],a[1]);if("暂无数据"==r.data);else{var i=JSON.parse(r.data);t.todoList=i,console.log(t.todoList)}})},gotoNext:function(t){var n=JSON.stringify(t),a=t.BranchId;switch(a=a.split("-"),a=a[a.length-1],console.log(a),a){case"2":e.navigateTo({url:"/pages/steps/dangerReview/dangerReview?info="+n});break;case"4":e.navigateTo({url:"/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info="+n});break;case"5":e.navigateTo({url:"/pages/steps/changeReview/changeReview?info="+n});break;case"10":e.navigateTo({url:"/pages/steps/chiefDeal/chiefDeal?info="+n});break;case"11":e.navigateTo({url:"/pages/steps/presidentDeal/presidentDeal?info="+n});break;default:break}}},mounted:function(){e.showLoading({title:"加载中。。。",mask:!0}),this.getTodoNum(),this.$nextTick(function(){e.hideLoading()})}};t.default=o}).call(this,n("543d")["default"])},"9c74":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})},c49c:function(e,t,n){"use strict";n.r(t);var a=n("2d8b9"),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);t["default"]=r.a},c504:function(e,t,n){"use strict";n.r(t);var a=n("9c74"),r=n("c49c");for(var i in r)"default"!==i&&function(e){n.d(t,e,function(){return r[e]})}(i);var o=n("2877"),s=Object(o["a"])(r["default"],a["a"],a["b"],!1,null,null,null);t["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/function/todoList-create-component',
    {
        'pages/function/todoList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c504"))
        })
    },
    [['pages/function/todoList-create-component']]
]);                