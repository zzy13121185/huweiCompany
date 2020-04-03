(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/uni-badge/uni-badge"],{"0df9":function(t,e,n){"use strict";n.r(e);var u=n("4677"),i=n("de4e");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("8d59");var r=n("2877"),d=Object(r["a"])(i["default"],u["a"],u["b"],!1,null,null,null);e["default"]=d.exports},4677:function(t,e,n){"use strict";var u=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return u}),n.d(e,"b",function(){return i})},"8d59":function(t,e,n){"use strict";var u=n("dd26"),i=n.n(u);i.a},b983:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"uni-badge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:String,default:""},size:{type:String,default:"normal"}},computed:{setClass:function(){var t=["uni-badge-"+this.type,"uni-badge--"+this.size];return!0===this.inverted&&t.push("uni-badge-inverted"),t.join(" ")}},methods:{onClick:function(){this.$emit("click")}}};e.default=u},dd26:function(t,e,n){},de4e:function(t,e,n){"use strict";n.r(e);var u=n("b983"),i=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'common/uni-badge/uni-badge-create-component',
    {
        'common/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0df9"))
        })
    },
    [['common/uni-badge/uni-badge-create-component']]
]);                
