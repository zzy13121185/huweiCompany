(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/function/reportScan"],{"0809":function(t,e,o){"use strict";(function(t){function o(t,e){return r(t)||n(t,e)||a()}function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function n(t,e){var o=[],a=!0,n=!1,r=void 0;try{for(var i,s=t[Symbol.iterator]();!(a=(i=s.next()).done);a=!0)if(o.push(i.value),e&&o.length===e)break}catch(c){n=!0,r=c}finally{try{a||null==s["return"]||s["return"]()}finally{if(n)throw r}}return o}function r(t){if(Array.isArray(t))return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"temHome",props:{msg:{type:String,default:""},type:{type:String,default:""},fromm:{type:String,default:""}},data:function(){return{qrCode:"",qrCodeType:"",xgData:[],current:-1,chooseId:"",choosePlace:"",imgrow:[],lon:"",lat:"",commitTime:0,uploadImgRow:[],laizi:"",isAllCheck:[],safeImgRow:[],imgList:[],showimgList:!0,safePosition:"",yhposition:""}},methods:{ChooseImageSafe:function(){var e=this;t.chooseImage({count:4,sizeType:["original","compressed"],sourceType:["album"],success:function(t){0!=e.imgList.length?e.imgList=e.imgList.concat(t.tempFilePaths):e.imgList=t.tempFilePaths}})},ViewImageSafe:function(e){t.previewImage({urls:this.imgList,current:e.currentTarget.dataset.url})},DelImgSafe:function(e){var o=this;t.showModal({title:"召唤师",content:"确定要删除这段回忆吗？",cancelText:"再看看",confirmText:"再见",success:function(t){t.confirm&&o.imgList.splice(e.currentTarget.dataset.index,1)}})},ChooseImage:function(e){var o=this;t.chooseImage({count:1,sizeType:["compressed"],sourceType:["camera"],success:function(t){console.log(t),o.imgrow[e].url.push(t.tempFilePaths[0])}})},ViewImage:function(e){t.previewImage({urls:this.imgrow[e.currentTarget.dataset.index].url,current:e.currentTarget.dataset.url})},DelImg2:function(e){var o=this;console.log(e),t.showModal({title:"删除",content:"确定要删除这张图片吗？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&o.safeImgRow.url.splice(e.currentTarget.dataset.index,1)}})},showModel:function(e){t.showModal({title:"提示",content:e,showCancel:!1,success:function(t){t.confirm}})},SwitchA:function(t){console.log(t);var e=[],o=!0,a=!1,n=void 0;try{for(var r,i=this.xgData[Symbol.iterator]();!(o=(r=i.next()).done);o=!0){var s=r.value;if(s.Name==t.currentTarget.dataset.title){t.detail.value?s.yhms=s.yhms.replace(t.currentTarget.dataset.info.content+",",""):s.yhms=s.yhms+t.currentTarget.dataset.info.content+",";var c=!0,l=!1,u=void 0;try{for(var h,f=s.Detail[Symbol.iterator]();!(c=(h=f.next()).done);c=!0){var m=h.value;m.content==t.currentTarget.dataset.info.content&&(m.isCheck=t.detail.value)}}catch(D){l=!0,u=D}finally{try{c||null==f.return||f.return()}finally{if(l)throw u}}}var d=!0,g=!1,v=void 0;try{for(var y,p=s.Detail[Symbol.iterator]();!(d=(y=p.next()).done);d=!0){var w=y.value;e.push(w.isCheck)}}catch(D){g=!0,v=D}finally{try{d||null==p.return||p.return()}finally{if(g)throw v}}}}catch(D){a=!0,n=D}finally{try{o||null==i.return||i.return()}finally{if(a)throw n}}e.every(function(t){return 1==t})?this.showimgList=!0:this.showimgList=!1},getData:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/School/Get_HD",data:{QRCode:e.qrCode,type:e.qrCodeType}}).then(function(a){var n=o(a,2),r=(n[0],n[1]);if(0==r.data.code){e.xgData=r.data.data,e.choosePlace=e.xgData[0].PlaceNo;var i=!0,s=!1,c=void 0;try{for(var l,u=e.xgData[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var h=l.value;h.yhms="",h.yhbw="",e.imgrow.push({name:h.ID,url:[]}),";"==h.Detail[h.Detail.length-1]&&(h.Detail=h.Detail.substr(0,h.Detail.length-1));var f=h.Detail.split(";");h.Detail=[];var m=!0,d=!1,g=void 0;try{for(var v,y=f[Symbol.iterator]();!(m=(v=y.next()).done);m=!0){var p=v.value;h.Detail.push({isCheck:!0,content:p})}}catch(w){d=!0,g=w}finally{try{m||null==y.return||y.return()}finally{if(d)throw g}}}}catch(w){s=!0,c=w}finally{try{i||null==u.return||u.return()}finally{if(s)throw c}}console.log(e.xgData),console.log(e.imgrow)}else t.showToast({title:"扫描失败",duration:2e3,icon:"loading"})})},nextStep:function(){var e=[],o=[],a=[];console.log(this.imgrow);var n=!0,r=!1,i=void 0;try{for(var s,c=this.xgData[Symbol.iterator]();!(n=(s=c.next()).done);n=!0){var l=s.value;l.yhms.length>0&&a.push({HDID:l.ID,CZWT:l.yhms,place:l.yhbw,position:""});var u=!0,h=!1,f=void 0;try{for(var m,d=l.Detail[Symbol.iterator]();!(u=(m=d.next()).done);u=!0){var g=m.value;e.push(g.isCheck)}}catch(L){h=!0,f=L}finally{try{u||null==d.return||d.return()}finally{if(h)throw f}}}}catch(L){r=!0,i=L}finally{try{n||null==c.return||c.return()}finally{if(r)throw i}}if(console.log(a),e.every(function(t){return 1==t}))this.showModel("请选择隐患！");else{for(var v=0;v<this.xgData.length;v++){if(!this.xgData[v].Detail.every(function(t){return 1==t.isCheck})&&0==this.imgrow[v].url.length)return void this.showModel("请完善隐患照片！");if(!this.xgData[v].Detail.every(function(t){return 1==t.isCheck})&&0==this.xgData[v].yhbw.length)return void this.showModel("请完善隐患部位！");this.xgData[v].Detail.every(function(t){return 1==t.isCheck})||o.push(v)}for(var y=0,p=0;p<o.length;p++){var w=this.imgrow[o[p]].url.length,D=!0,x=!1,T=void 0;try{for(var C,b=this.imgrow[o[p]].url[Symbol.iterator]();!(D=(C=b.next()).done);D=!0){var I=C.value;this.uploadImgRow.push({id:this.imgrow[o[p]].name,url:I})}}catch(L){x=!0,T=L}finally{try{D||null==b.return||b.return()}finally{if(x)throw T}}y+=w}y>0&&(t.showLoading({title:"提交中。。。",mask:!0}),this.uploadDangerImg(y,a))}},getLocation:function(){var e=this;t.getLocation({type:"gcj02",success:function(t){e.lon=t.longitude,e.lat=t.latitude}})},uploadDangerImg:function(e,o){var a=this,n=a.$store.state.urlPrefix+"/Process/Everyone_safe_images2";t.uploadFile({url:n,filePath:a.uploadImgRow[a.commitTime].url,name:"image",formData:{RYXH:a.$store.state.userInfo.RYXH,HDID:a.uploadImgRow[a.commitTime].id},success:function(n){a.commitTime=a.commitTime+1,"ok"==n.data?a.commitTime<e?a.uploadDangerImg(e,o):(a.HYdangerCommit(o),a.commitTime=0):(t.hideLoading(),t.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(e){e.confirm&&t.reLaunch({url:"/pages/basic/home/home"})}}))}})},uploadSafeImg:function(e){var o=this,a=o.$store.state.urlPrefix+"/Process/Everyone_safe_images2";""==o.yhposition?o.showModel("请输入检查记录"):t.uploadFile({url:a,filePath:o.imgList[o.commitTime],name:"image",formData:{RYXH:o.$store.state.userInfo.RYXH,HDID:o.choosePlace},success:function(a){o.commitTime=o.commitTime+1,"ok"==a.data?o.commitTime<e?o.uploadSafeImg(e):(o.HYsafeCommit(),o.commitTime=0):(t.hideLoading(),t.showModal({title:"提示",content:"上报失败！",showCancel:!1,success:function(e){e.confirm&&t.reLaunch({url:"/pages/basic/home/home"})}}))}})},HYdangerCommit:function(e){var a=this,n=JSON.stringify(e);t.request({url:a.$store.state.urlPrefix+"/school/ScanQRCode_report",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{RYXH:a.$store.state.userInfo.RYXH,hdDetail:n,lat:a.lat,lon:a.lon}}).then(function(e){var a=o(e,2),n=(a[0],a[1]);t.hideLoading(),0==n.data.code?t.showModal({title:"提示",content:"提交成功！",showCancel:!1,confirmText:"确定",success:function(e){e.confirm&&t.reLaunch({url:"/pages/basic/home/home"})}}):1==n.data.code?t.showModal({title:"提示",content:n.data.msg,showCancel:!1,confirmText:"确定",success:function(e){e.confirm&&t.reLaunch({url:"/pages/basic/home/home"})}}):t.showModal({title:"提示",content:"上传失败",showCancel:!1,confirmText:"确定",success:function(e){e.confirm&&t.reLaunch({url:"/pages/basic/home/home"})}})})},HYsafeCommit:function(){var e=this;t.request({url:e.$store.state.urlPrefix+"/school/ScanQRCode_report_safe",data:{RYXH:e.$store.state.userInfo.RYXH,HDIDs:e.choosePlace,position:e.yhposition,lat:e.lat,lon:e.lon,place:e.safePosition}}).then(function(e){var a=o(e,2),n=(a[0],a[1]);t.hideLoading(),0==n.data.code?t.showModal({title:"提示",content:"提交成功！",showCancel:!1,confirmText:"确定",success:function(e){e.confirm&&t.reLaunch({url:"/pages/basic/home/home"})}}):1==n.data.code?t.showModal({title:"提示",content:n.data.msg,showCancel:!1,confirmText:"确定",success:function(e){t.reLaunch({url:"/pages/basic/home/home"})}}):t.showModal({title:"提示",content:"上传失败",showCancel:!1,confirmText:"确定",success:function(e){t.reLaunch({url:"/pages/basic/home/home"})}})})},getPlace:function(e,a){var n=this;t.request({url:n.$store.state.urlPrefix+"/School/Get_PlaceWay",data:{QRCode:this.qrCode,type:this.qrCodeType}}).then(function(t){var e=o(t,2),a=(e[0],e[1]);console.log(a),0==a.data.code&&(n.safePosition=a.data.data)})}},mounted:function(){this.qrCode=this._props.msg,this.qrCodeType=this._props.type,this.$emit("hideLoading",.1),this.getData(),this.getLocation(),this.getPlace()}};e.default=i}).call(this,o("543d")["default"])},"933c":function(t,e,o){"use strict";o.r(e);var a=o("0809"),n=o.n(a);for(var r in a)"default"!==r&&function(t){o.d(e,t,function(){return a[t]})}(r);e["default"]=n.a},a34d:function(t,e,o){"use strict";o.r(e);var a=o("c2f0"),n=o("933c");for(var r in n)"default"!==r&&function(t){o.d(e,t,function(){return n[t]})}(r);var i=o("2877"),s=Object(i["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=s.exports},c2f0:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=(t._self._c,t.__map(t.xgData,function(e,o){var a=e.Detail.every(function(t){return 1==t.isCheck}),n=e.Detail.every(function(t){return 1==t.isCheck}),r=e.Detail.every(function(t){return 1==t.isCheck});return{$orig:t.__get_orig(e),g0:a,g1:n,g2:r}}));t.$mp.data=Object.assign({},{$root:{l0:o}})},n=[];o.d(e,"a",function(){return a}),o.d(e,"b",function(){return n})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/function/reportScan-create-component',
    {
        'pages/function/reportScan-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a34d"))
        })
    },
    [['pages/function/reportScan-create-component']]
]);                
