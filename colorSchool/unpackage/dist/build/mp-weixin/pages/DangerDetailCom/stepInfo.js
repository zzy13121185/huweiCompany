(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/DangerDetailCom/stepInfo"],{"274f":function(t,e,o){},7864:function(t,e,o){"use strict";o.r(e);var n=o("9155"),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e["default"]=r.a},9155:function(t,e,o){"use strict";(function(t){function o(t,e){return a(t)||r(t,e)||n()}function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function r(t,e){var o=[],n=!0,r=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(n=(i=s.next()).done);n=!0)if(o.push(i.value),e&&o.length===e)break}catch(u){r=!0,a=u}finally{try{n||null==s["return"]||s["return"]()}finally{if(r)throw a}}return o}function a(t){if(Array.isArray(t))return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"stepInfo",props:{option:{type:Object}},data:function(){return{info:"",firstFoo:[],secondFoo:[],record:[],nowperson:"",swiperList:[],dotStyle:!1,cardCur:0}},mounted:function(){t.showLoading({title:"加载中。。。",mask:!0}),this.info=this._props.option,console.log(this.info),this.getFirstInfo(),this.getSecondInfo(),this.getRecord(),this.getNowPeople(),this.getImage(),this.$nextTick(function(){t.hideLoading()})},methods:{previewImage:function(e){for(var o=e.split(","),n=0;n<o.length;n++)o[n]=o[n].replace(/\\/g,"/");console.log(o);t.previewImage({urls:o,current:o[0]})},ViewImage:function(e){t.previewImage({urls:this.swiperList,current:e.currentTarget.dataset.url})},cardSwiper:function(t){this.cardCur=t.detail.current},getFirstInfo:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_Troubleshooting",data:{YSCD:e.info.YSCD,BranchId:e.info.BranchId}}).then(function(t){var n=o(t,2),r=(n[0],n[1]);"[]"!=r.data&&(e.firstFoo=JSON.parse(r.data),e.firstFoo=e.firstFoo[0])})},getSecondInfo:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_review",data:{No:e.info.No,BranchId:e.info.BranchId}}).then(function(t){var n=o(t,2),r=(n[0],n[1]);"暂无数据"!=r.data&&(e.secondFoo=JSON.parse(r.data),e.secondFoo=e.secondFoo[0],"1"==e.secondFoo.AQZK?e.secondFoo.AQZK="一般隐患":"2"==e.secondFoo.AQZK&&(e.secondFoo.AQZK="严重隐患"))})},getRecord:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_Processing",data:{No:e.info.No}}).then(function(t){var n=o(t,2),r=(n[0],n[1]);"暂无数据"!=r.data&&(console.log(JSON.parse(r.data)),e.record=JSON.parse(r.data))})},getNowPeople:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_Executor",data:{BranchId:e.info.BranchId,No:e.info.No}}).then(function(t){var n=o(t,2),r=(n[0],n[1]);e.nowperson=r.data})},getImage:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_YHimg",data:{No:e.info.No}}).then(function(t){var n=o(t,2),r=(n[0],n[1]),a=r.data[0].url;e.swiperList=a.split(","),console.log(a)})}}};e.default=i}).call(this,o("543d")["default"])},f56f:function(t,e,o){"use strict";o.r(e);var n=o("f6ff"),r=o("7864");for(var a in r)"default"!==a&&function(t){o.d(e,t,function(){return r[t]})}(a);o("fd6d");var i=o("2877"),s=Object(i["a"])(r["default"],n["a"],n["b"],!1,null,null,null);e["default"]=s.exports},f6ff:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},r=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return r})},fd6d:function(t,e,o){"use strict";var n=o("274f"),r=o.n(n);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/DangerDetailCom/stepInfo-create-component',
    {
        'pages/DangerDetailCom/stepInfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f56f"))
        })
    },
    [['pages/DangerDetailCom/stepInfo-create-component']]
]);                
