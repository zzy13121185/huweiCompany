(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/steps/hiddenDangerRectification/hiddenDangerRectification"],{5215:function(t,e,n){"use strict";n.r(e);var o=n("8c99"),i=n("7dd1");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);var a=n("2877"),c=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},"7dd1":function(t,e,n){"use strict";n.r(e);var o=n("854e"),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=i.a},"854e":function(t,e,n){"use strict";(function(t){function n(t,e){return r(t)||i(t,e)||o()}function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function i(t,e){var n=[],o=!0,i=!1,r=void 0;try{for(var a,c=t[Symbol.iterator]();!(o=(a=c.next()).done);o=!0)if(n.push(a.value),e&&n.length===e)break}catch(s){i=!0,r=s}finally{try{o||null==c["return"]||c["return"]()}finally{if(i)throw r}}return n}function r(t){if(Array.isArray(t))return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{info:{},TabCur:0,tabRow:["隐患信息","隐患提交"],handlingOpinion:"",imgList:[],buttonInfo:{},commitTime:0}},methods:{tabSelect:function(t){this.TabCur=t.currentTarget.dataset.id},ChooseImage:function(){var e=this;t.chooseImage({count:4,sizeType:["compressed"],sourceType:["camera"],success:function(t){0!=e.imgList.length?e.imgList=e.imgList.concat(t.tempFilePaths):e.imgList=t.tempFilePaths}})},ViewImage:function(e){t.previewImage({urls:this.imgList,current:e.currentTarget.dataset.url})},DelImg:function(e){var n=this;t.showModal({title:"提示",content:"确定要删除这张照片？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&n.imgList.splice(e.currentTarget.dataset.index,1)}})},getButton:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/Process/Get_Handle",data:{StepOrder:e.info.StepOrder,BranchId:e.info.BranchId,No:e.info.No}}).then(function(t){var o=t,i=n(o,2),r=(i[0],i[1]);if("暂无数据"==r.data);else{t=JSON.parse(r.data);var a=!0,c=!1,s=void 0;try{for(var u,l=t[Symbol.iterator]();!(a=(u=l.next()).done);a=!0){var f=u.value;"提交"==f.ReceiveType&&(e.buttonInfo=f,console.log(e.buttonInfo))}}catch(d){c=!0,s=d}finally{try{a||null==l.return||l.return()}finally{if(c)throw s}}}})},showMoadel:function(e){t.showModal({title:"提示",content:e,showCancel:!1,success:function(t){t.confirm}})},commit:function(){if(this.handlingOpinion)if(0==this.imgList.length)this.showMoadel("请拍摄照片!");else{var e=this.imgList.length;t.showLoading({title:"提交中。。。",mask:!0}),this.uploadImg(e)}else this.showMoadel("请输入整改回复!")},uploadImg:function(e){var o=this,i=o.$store.state.urlPrefix+"/Process/Handle_SavaImg2";t.uploadFile({url:i,filePath:o.imgList[o.commitTime],name:"image",formData:{RYXH:o.$store.state.userInfo.RYXH,YSCD:o.info.YSCD,No:o.info.No}}).then(function(i){var r=n(i,2),a=(r[0],r[1]);o.commitTime=o.commitTime+1,"ok"==a.data?o.commitTime<e?o.uploadImg(e):(o.commitTime=0,o.uploadWord()):(o.commitTime=0,t.hideLoading(),t.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(e){e.confirm&&t.reLaunch({url:"../../basic/home/home"})}}))})},uploadWord:function(){var e=this,o=e.$store.state.urlPrefix+"/Process/Handle5";t.request({url:o,data:{YSCD:e.info.YSCD,BranchId:e.info.BranchId,RYXH:e.$store.state.userInfo.RYXH,StepOrder:e.info.StepOrder,next_ReceiveType:e.buttonInfo.ReceiveType,next_StepOrder:e.buttonInfo.StepOrder,No:e.info.No,next_BranchId:e.buttonInfo.BranchId,RecordRemarks:e.handlingOpinion}}).then(function(o){var i=n(o,2),r=(i[0],i[1]);"ok"==r.data?(e.commitTime=0,t.hideLoading(),t.showModal({title:"提示",content:"提交成功！",showCancel:!1,success:function(e){e.confirm&&t.reLaunch({url:"../../basic/home/home"})}})):(e.commitTime=0,t.hideLoading(),t.showModal({title:"提示",content:"提交失败！",showCancel:!1,success:function(e){e.confirm&&t.reLaunch({url:"../../basic/home/home"})}}))})}},onLoad:function(t){this.info=JSON.parse(t.info),console.log(this.info)},mounted:function(){this.getButton()}};e.default=a}).call(this,n("543d")["default"])},"8c99":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},b0e9:function(t,e,n){"use strict";(function(t){n("3dd1"),n("921b");o(n("66fd"));var e=o(n("5215"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["b0e9","common/runtime","common/vendor"]]]);