(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/some/reportDetail/reportDetail"],{"0035":function(e,t,o){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},n=[];o.d(t,"a",function(){return i}),o.d(t,"b",function(){return n})},1221:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{yscd:"",pcyd:"",disabled:!0,name:"",description:"",isDanger:!0,place:"",dec:"",desRow:[],imgList:[],lon:"",lat:"",commitTime:0,firstLevelId:""}},methods:{changeDec:function(){var t=this;e.showActionSheet({itemList:t.desRow,success:function(e){t.dec=t.desRow[e.tapIndex]},fail:function(e){}})},changeType:function(e){this.isDanger=e.detail.value},textareaBInput:function(e){this.description=e.detail.value},textareaCInput:function(e){this.place=e.detail.value},textareaDInput:function(e){this.dec=e.detail.value},getPCYD:function(){var t=this;e.request({url:t.$store.state.urlPrefix+"/Process/Get_PCYD",method:"GET",data:{YSCD:t.yscd},header:{"custom-header":"application/json"},success:function(e){t.pcyd=e.data,console.log(t.pcyd)}})},getDescription:function(){var t=this;e.request({url:t.$store.state.urlPrefix+"/Process/Get_BZ",method:"GET",data:{YSCD:t.yscd},header:{"custom-header":"application/json"},success:function(e){var o=e.data;o=JSON.parse(o);var i=!0,n=!1,s=void 0;try{for(var a,c=o[Symbol.iterator]();!(i=(a=c.next()).done);i=!0){var r=a.value;t.desRow.push(r.CZWT)}}catch(u){n=!0,s=u}finally{try{i||null==c.return||c.return()}finally{if(n)throw s}}}})},ChooseImage:function(){var t=this;e.chooseImage({count:4,sizeType:["compressed"],sourceType:["camera"],success:function(e){0!=t.imgList.length?t.imgList=t.imgList.concat(e.tempFilePaths):t.imgList=e.tempFilePaths}})},ViewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},DelImg:function(t){var o=this;e.showModal({title:"提示",content:"确定要删除这张照片？",cancelText:"取消",confirmText:"确定",success:function(e){e.confirm&&o.imgList.splice(t.currentTarget.dataset.index,1)}})},getLocation:function(){var t=this;e.getLocation({type:"gcj02",success:function(e){t.lon=e.longitude,t.lat=e.latitude}})},commit:function(){console.log(this.isDanger),this.isDanger?this.dangerCommit():this.safeCommit()},showMoadel:function(t){e.showModal({title:"提示",content:t,showCancel:!1,success:function(e){e.confirm}})},dangerCommit:function(){var t=this,o=t.imgList.length;0==t.imgList.length?t.showMoadel("请完善隐患信息！"):""==t.description||""==t.dec||""==t.place?t.showMoadel("请完善隐患信息！"):(e.showLoading({title:"提交中。。。",mask:!0}),t.uploadDangerImg(o))},safeCommit:function(){var t=this,o=t.imgList.length;console.log(t.imgList),this.description?0==t.imgList.length?t.showMoadel("请拍摄照片！"):(e.showLoading({title:"提交中。。。",mask:!0}),t.uploadSafeImg(o)):t.showMoadel("请输入检查记录")},uploadSafeImg:function(t){var o=this;setTimeout(function(){e.hideLoading()},15e3);var i=o.$store.state.urlPrefix+"/Process/Everyone_safe_images2";e.uploadFile({url:i,filePath:o.imgList[o.commitTime],name:"image",formData:{RYXH:o.$store.state.userInfo.RYXH,HDID:o.yscd},success:function(i){o.commitTime=o.commitTime+1,"ok"==i.data?o.commitTime<t?o.uploadSafeImg(t):(o.commitTime=0,o.commitSafeWord()):(o.commitTime=0,e.hideLoading(),e.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}}))}})},commitSafeWord:function(){var t=this;e.request({url:t.$store.state.urlPrefix+"/Process/Everyone_safe2",data:{DWCD:t.$store.state.userInfo.DWCD,RYXH:t.$store.state.userInfo.RYXH,YSCD:t.yscd,position:t.description,lon:t.lon,lat:t.lat},header:{"content-type":"application/json"},success:function(t){e.hideLoading(),"ok"==t.data?e.showModal({title:"提示",content:"上报成功！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}}):e.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}})}})},uploadDangerImg:function(t){var o=this,i=o.$store.state.urlPrefix+"/Process/Everyone_Sava_images2";e.uploadFile({url:i,filePath:o.imgList[o.commitTime],name:"image",formData:{RYXH:o.$store.state.userInfo.RYXH,YSCD:o.yscd},success:function(i){o.commitTime=o.commitTime+1,"ok"==i.data?o.commitTime<t?o.uploadDangerImg(t):(o.commitTime=0,o.commitDangerWord()):(o.commitTime=0,e.hideLoading(),e.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}}))}})},commitDangerWord:function(){var t=this;e.request({url:t.$store.state.urlPrefix+"/Process/Everyone_reports2",data:{DWCD:t.$store.state.userInfo.DWCD,RYXH:t.$store.state.userInfo.RYXH,YSCD:t.yscd,CZWT:t.dec,position:t.description,lon:t.lon,lat:t.lat,place:t.place,XZCD:t.firstLevelId},header:{"content-type":"application/json"},success:function(t){e.hideLoading();var o=t.data;if(0==o.code)if(o.data){var i=o.data[0][0],n=JSON.stringify(i);console.log(i);var s=i.BranchId;s=s.split("-"),s=s[s.length-1],e.showModal({title:"提示",content:"是否前往隐患复核页面？",success:function(t){t.confirm?e.navigateTo({url:"/pages/steps/dangerReview/dangerReview?info="+n}):t.cancel&&e.reLaunch({url:"../../basic/home/home"})}})}else e.showModal({title:"提示",content:"上报成功！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}});else e.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(t){t.confirm&&e.reLaunch({url:"../../basic/home/home"})}})}})}},onLoad:function(e){console.log(e),this.yscd=e.yscd,this.name=e.name,this.firstLevelId=e.firstlevel},mounted:function(){this.getLocation(),this.getPCYD(),this.getDescription()}};t.default=o}).call(this,o("543d")["default"])},"39fc":function(e,t,o){"use strict";o.r(t);var i=o("1221"),n=o.n(i);for(var s in i)"default"!==s&&function(e){o.d(t,e,function(){return i[e]})}(s);t["default"]=n.a},"3ce4":function(e,t,o){"use strict";(function(e){o("2bd2"),o("921b");i(o("66fd"));var t=i(o("b3e5"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},"95de":function(e,t,o){},b3e5:function(e,t,o){"use strict";o.r(t);var i=o("0035"),n=o("39fc");for(var s in n)"default"!==s&&function(e){o.d(t,e,function(){return n[e]})}(s);o("c612");var a=o("2877"),c=Object(a["a"])(n["default"],i["a"],i["b"],!1,null,null,null);t["default"]=c.exports},c612:function(e,t,o){"use strict";var i=o("95de"),n=o.n(i);n.a}},[["3ce4","common/runtime","common/vendor"]]]);