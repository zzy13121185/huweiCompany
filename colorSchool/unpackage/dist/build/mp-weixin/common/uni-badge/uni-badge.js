(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/uni-badge/uni-badge"],{"290c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"uni-badge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:String,default:""},size:{type:String,default:"normal"}},computed:{setClass:function(){var t=["uni-badge-"+this.type,"uni-badge--"+this.size];return!0===this.inverted&&t.push("uni-badge-inverted"),t.join(" ")}},methods:{onClick:function(){this.$emit("click")}}};e.default=u},"5f97":function(t,e,n){},"71fb":function(t,e,n){"use strict";var u=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return u}),n.d(e,"b",function(){return i})},"9a93":function(t,e,n){"use strict";n.r(e);var u=n("71fb"),i=n("b9de");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("9d5d");var r=n("2877"),d=Object(r["a"])(i["default"],u["a"],u["b"],!1,null,null,null);e["default"]=d.exports},"9d5d":function(t,e,n){"use strict";var u=n("5f97"),i=n.n(u);i.a},b9de:function(t,e,n){"use strict";n.r(e);var u=n("290c"),i=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'common/uni-badge/uni-badge-create-component',
    {
        'common/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9a93"))
        })
    },
    [['common/uni-badge/uni-badge-create-component']]
]);                
