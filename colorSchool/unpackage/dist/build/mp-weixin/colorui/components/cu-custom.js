(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"4bc5":function(t,a,n){"use strict";var u=function(){var t=this,a=t.$createElement;t._self._c},e=[];n.d(a,"a",function(){return u}),n.d(a,"b",function(){return e})},"7b80":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,n=this.bgImage,u="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(n,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};a.default=n}).call(this,n("543d")["default"])},"95c6":function(t,a,n){"use strict";n.r(a);var u=n("4bc5"),e=n("af5b");for(var c in e)"default"!==c&&function(t){n.d(a,t,function(){return e[t]})}(c);var o=n("2877"),r=Object(o["a"])(e["default"],u["a"],u["b"],!1,null,null,null);a["default"]=r.exports},af5b:function(t,a,n){"use strict";n.r(a);var u=n("7b80"),e=n.n(u);for(var c in u)"default"!==c&&function(t){n.d(a,t,function(){return u[t]})}(c);a["default"]=e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("95c6"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);                
