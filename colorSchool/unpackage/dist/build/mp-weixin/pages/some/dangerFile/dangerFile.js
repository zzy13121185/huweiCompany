(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/some/dangerFile/dangerFile"],{"092d":function(t,e,n){"use strict";(function(t){function n(t,e){return a(t)||o(t,e)||r()}function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function o(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=t[Symbol.iterator]();!(r=(u=i.next()).done);r=!0)if(n.push(u.value),e&&n.length===e)break}catch(l){o=!0,a=l}finally{try{r||null==i["return"]||i["return"]()}finally{if(o)throw a}}return n}function a(t){if(Array.isArray(t))return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={data:function(){return{todoList:[]}},methods:{gotoNext:function(e){t.navigateTo({url:"dangerFileDetail/dangerFileDetail?No="+e.todoid+"&CLQK="+e.CLQK+"&YSCD="+e.YSCD+"&AQZK="+e.AQZK+"&YHXH="+e.YHXH})},getDate:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Home/Get_MyCur_Problems",data:{RYXH:e.$store.state.userInfo.RYXH}}).then(function(t){var r=n(t,2),o=(r[0],r[1]);if("暂无数据"==o.data);else{var a=JSON.parse(o.data);e.todoList=a,console.log(e.todoList)}})}},mounted:function(){this.getDate()}};e.default=u}).call(this,n("543d")["default"])},"1c2b":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return o})},"74f5":function(t,e,n){"use strict";n.r(e);var r=n("092d"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e["default"]=o.a},d3cc:function(t,e,n){"use strict";(function(t){n("3dd1"),n("921b");r(n("66fd"));var e=r(n("fd78"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},fd78:function(t,e,n){"use strict";n.r(e);var r=n("1c2b"),o=n("74f5");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);var u=n("2877"),i=Object(u["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=i.exports}},[["d3cc","common/runtime","common/vendor"]]]);