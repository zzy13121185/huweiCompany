(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/some/dangerFile/dangerFileDetail/dangerFileDetail"],{"0d21":function(t,e,o){"use strict";o.r(e);var n=o("7231"),r=o("31a7");for(var a in r)"default"!==a&&function(t){o.d(e,t,function(){return r[t]})}(a);o("99f8");var i=o("2877"),s=Object(i["a"])(r["default"],n["a"],n["b"],!1,null,null,null);e["default"]=s.exports},"1e8a":function(t,e,o){"use strict";(function(t){o("2bd2"),o("921b");n(o("66fd"));var e=n(o("0d21"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"31a7":function(t,e,o){"use strict";o.r(e);var n=o("f8f0"),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e["default"]=r.a},7231:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},r=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return r})},"99f8":function(t,e,o){"use strict";var n=o("deb1"),r=o.n(n);r.a},deb1:function(t,e,o){},f8f0:function(t,e,o){"use strict";(function(t){function o(t,e){return a(t)||r(t,e)||n()}function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function r(t,e){var o=[],n=!0,r=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(n=(i=s.next()).done);n=!0)if(o.push(i.value),e&&o.length===e)break}catch(c){r=!0,a=c}finally{try{n||null==s["return"]||s["return"]()}finally{if(r)throw a}}return o}function a(t){if(Array.isArray(t))return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={onLoad:function(t){this.option=t,console.log(t)},data:function(){return{dotStyle:!1,cardCur:0,option:{},swiperList:[],firstFoo:{},secondFoo:{},record:[],opinion:""}},methods:{previewImage:function(e){for(var o=e.split(","),n=0;n<o.length;n++)o[n]=o[n].replace(/\\/g,"/");console.log(o);t.previewImage({urls:o,current:o[0]})},ViewImage:function(e){t.previewImage({urls:this.swiperList,current:e.currentTarget.dataset.url})},cardSwiper:function(t){this.cardCur=t.detail.current},getFirstInfo:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_Troubleshooting",data:{YSCD:e.option.YSCD,BranchId:e.option.BranchId}}).then(function(t){var n=o(t,2),r=(n[0],n[1]);"[]"!=r.data&&(e.firstFoo=JSON.parse(r.data),e.firstFoo=e.firstFoo[0])})},getSecondInfo:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_review",data:{No:e.option.No,BranchId:e.option.BranchId}}).then(function(t){var n=o(t,2),r=(n[0],n[1]);"暂无数据"!=r.data&&(e.secondFoo=JSON.parse(r.data),e.secondFoo=e.secondFoo[0],"1"==e.secondFoo.AQZK?e.secondFoo.AQZK="轻微隐患":"2"==e.secondFoo.AQZK&&(e.secondFoo.AQZK="一般隐患"))})},getRecord:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_Processing",data:{No:e.option.No}}).then(function(t){var n=o(t,2),r=(n[0],n[1]);"暂无数据"!=r.data&&(console.log(JSON.parse(r.data)),e.record=JSON.parse(r.data))})},getImage:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_YHimg",data:{No:e.option.No}}).then(function(t){var n=o(t,2),r=(n[0],n[1]),a=r.data[0].url;e.swiperList=a.split(","),console.log(a)})},showToast:function(e){t.showModal({title:"提示",content:e,showCancel:!1,success:function(t){t.confirm}})},commit:function(){if(this.opinion){var e=this;t.request({url:e.$store.state.urlPrefix+"/Home/File_Cur_Problems",data:{RYXH:e.$store.state.userInfo.RYXH,No:e.option.No,CLQK:e.opinion}}).then(function(e){var n=o(e,2),r=(n[0],n[1]);"ok"==r.data?t.showModal({title:"提示",content:"归档成功!",showCancel:!1,success:function(e){e.confirm&&t.navigateBack({url:"/pages/some/dangerFile/dangerFile"})}}):t.showModal({title:"提示",content:"归档失败！",showCancel:!1,success:function(e){e.confirm&&t.navigateBack({url:"/pages/some/dangerFile/dangerFile"})}})})}else this.showToast("请输入归档意见！")}},mounted:function(){t.showLoading({title:"加载中。。。",mask:!0}),this.getFirstInfo(),this.getSecondInfo(),this.getRecord(),this.getImage(),this.$nextTick(function(){t.hideLoading()})}};e.default=i}).call(this,o("543d")["default"])}},[["1e8a","common/runtime","common/vendor"]]]);