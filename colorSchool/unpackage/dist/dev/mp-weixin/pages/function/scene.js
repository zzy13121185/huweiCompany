(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/function/scene"],{276:
/*!******************************************************************!*\
  !*** E:/project/my/colorUi/colorSchool/pages/function/scene.vue ***!
  \******************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! ./scene.vue?vue&type=template&id=4a4317bf& */277),i=n(/*! ./scene.vue?vue&type=script&lang=js& */279);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);var s,c=n(/*! ../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */14),r=Object(c["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],s);r.options.__file="project/my/colorUi/colorSchool/pages/function/scene.vue",t["default"]=r.exports},277:
/*!*************************************************************************************************!*\
  !*** E:/project/my/colorUi/colorSchool/pages/function/scene.vue?vue&type=template&id=4a4317bf& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./scene.vue?vue&type=template&id=4a4317bf& */278);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},278:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/project/my/colorUi/colorSchool/pages/function/scene.vue?vue&type=template&id=4a4317bf& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return i})),n.d(t,"staticRenderFns",(function(){return s})),n.d(t,"recyclableRender",(function(){return a})),n.d(t,"components",(function(){return o}));var i=function(){var e=this,t=e.$createElement;e._self._c},a=!1,s=[];i._withStripped=!0},279:
/*!*******************************************************************************************!*\
  !*** E:/project/my/colorUi/colorSchool/pages/function/scene.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../tool/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./scene.vue?vue&type=script&lang=js& */280),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},280:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/project/my/colorUi/colorSchool/pages/function/scene.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:{yscd:{type:String,default:""},name:{type:String,default:""},firstLevelId:{type:String,default:""}},data:function(){return{pcyd:"",disabled:!0,description:"",isDanger:!0,place:"",dec:"",desRow:[],imgList:[],lon:"",lat:"",commitTime:0}},methods:{showMoadel:function(t){e.showModal({title:"提示",content:t,showCancel:!1,success:function(e){e.confirm}})},changeType:function(e){this.isDanger=e.detail.value},textareaBInput:function(e){this.description=e.detail.value},textareaCInput:function(e){this.place=e.detail.value},textareaDInput:function(e){this.dec=e.detail.value},getPCYD:function(){var t=this;e.request({url:t.$store.state.urlPrefix+"/Process/Get_PCYD",method:"GET",data:{YSCD:t.yscd},header:{"custom-header":"application/json"},success:function(e){t.pcyd=e.data,console.log(t.pcyd)}})},getDescription:function(){var t=this;e.request({url:t.$store.state.urlPrefix+"/Process/Get_BZ",method:"GET",data:{YSCD:t.yscd},header:{"custom-header":"application/json"},success:function(e){var n=e.data;n=JSON.parse(n);var o=!0,i=!1,a=void 0;try{for(var s,c=n[Symbol.iterator]();!(o=(s=c.next()).done);o=!0){var r=s.value;t.desRow.push(r.CZWT)}}catch(u){i=!0,a=u}finally{try{o||null==c.return||c.return()}finally{if(i)throw a}}}})},ChooseImage:function(){var t=this;e.chooseImage({count:4,sizeType:["compressed"],sourceType:["camera"],success:function(e){0!=t.imgList.length?t.imgList=t.imgList.concat(e.tempFilePaths):t.imgList=e.tempFilePaths}})},ViewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},DelImg:function(t){var n=this;e.showModal({title:"提示",content:"确定要删除这张照片？",cancelText:"取消",confirmText:"确定",success:function(e){e.confirm&&n.imgList.splice(t.currentTarget.dataset.index,1)}})},getLocation:function(){var t=this;e.getLocation({type:"gcj02",success:function(e){t.lon=e.longitude,t.lat=e.latitude}})},dangerCommit:function(){var t=this,n=t.imgList.length;0==t.imgList.length?t.showMoadel("请完善隐患信息！"):""==t.description?t.showMoadel("请完善隐患信息！"):(e.showLoading({title:"提交中。。。",mask:!0}),t.uploadDangerImg(n))},uploadDangerImg:function(t){var n=this,o=n.$store.state.urlPrefix+"/Process/Everyone_Sava_images2";e.uploadFile({url:o,filePath:n.imgList[n.commitTime],name:"image",formData:{RYXH:n.$store.state.userInfo.RYXH,YSCD:n.yscd},success:function(o){n.commitTime=n.commitTime+1,"ok"==o.data?n.commitTime<t?n.uploadDangerImg(t):(n.commitTime=0,n.commitDangerWord()):(n.commitTime=0,e.hideLoading(),e.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}}))}})},commitDangerWord:function(){var t=this;e.request({url:t.$store.state.urlPrefix+"/Process/Everyone_reports_self",data:{DWCD:t.$store.state.userInfo.DWCD,RYXH:t.$store.state.userInfo.RYXH,YSCD:t.yscd,CZWT:"",position:t.description,lon:t.lon,lat:t.lat,place:"",XZCD:t.firstLevelId,type:""},header:{"content-type":"application/json"},success:function(t){e.hideLoading();var n=t.data;if(0==n.code)if(n.data){var o=n.data[0][0],i=JSON.stringify(o);console.log(o);var a=o.BranchId;a=a.split("-"),a=a[a.length-1],e.showModal({title:"提示",content:"是否前往隐患复核页面？",success:function(t){t.confirm?e.navigateTo({url:"/pages/steps/dangerReview/dangerReview?info="+i}):t.cancel&&e.reLaunch({url:"../../basic/home/home"})}})}else e.showModal({title:"提示",content:"上报成功！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}});else e.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}})}})}},mounted:function(){this.getLocation(),this.getPCYD()}};t.default=n}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/function/scene.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/function/scene-create-component',
    {
        'pages/function/scene-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(276))
        })
    },
    [['pages/function/scene-create-component']]
]);