<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true"><block slot="backText">返回</block><block slot="content">安全巡查</block></cu-custom>
		<view class="cu-form-group margin-top">
			<view class="steptitle">二维码</view>
			<!-- <input name="input" disabled="true" v-model="placeName" placeholder="请扫描二维码"></input> -->
			<view class="content stepFlex">
				{{placeName}}
			</view>
			<button class='cu-btn bg-green shadow' @click="getCode">扫描</button>
		</view>
		<view class="cu-form-group">
			<view class="steptitle2">上次巡查时间：</view>
			<view class="content stepFlex">
				{{lasttime}}
			</view>		
		</view>
		<view class="cu-form-group">
			<view class="steptitle2">上次巡查人员：</view>
			<view class="content stepFlex">
				{{lastman}}
			</view>		
		</view>
		<view class="cu-form-group" v-if="active == 3 || active == 6">
			<view class="steptitle3">本次待检查点<text class="cuIcon-title text-yellow"></text><text class="text-yellow">{{wait}}</text></view>
			<button class='cu-btn bg-green shadow' @click="getDetail">查看</button>
		</view>
		<scan v-if="active == 3" :msg="scanMsg" :type="scanType" :fromm="fromm"></scan>
		
		<xungeng v-if="active == 6"  :msg="scanMsg" :type="scanType" :fromm="fromm"></xungeng>
		
		<xuncha v-if="active == 7"  :msg="scanMsg" :type="scanType" :fromm="fromm"></xuncha>
	</view>
</template>

<script>
	import utils from "../../../utils.js";
	export default {
		data() {
			return {
				code: '',
				active: 0,
				scanMsg: '',
				scanType: '',
				fromm: '安全巡查',
				placeName: '请扫描二维码',
				lastman: '',
				lasttime: '',
				wait:0
			}
		},
		methods: {
			judgeIscheck(id,type) {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/school/Get_IsCheck',
					data: {
						QRCode: id,
						type: type,
						isCheck: "true"
					}
				}).then(data => {
					var [error,res] = data;
					console.log(res)
					if (res.data.code == 0) {
						self.getPlace(id,type)
						self.getPlaceNum(type);
						if (self.scanType == 'XF') {
							self.active = 3;
							// self.header = '消防检查'
						} else if(self.scanType == 'XG'){
							self.active = 6;
							// self.header = '巡更检查'
						} else {
							self.active = 7;
							// self.header = '巡更检查'
						}
					} else if  (res.data.code == 1) {
						self.showToast('网络错误');
						self.scanMsg = '';
						self.scanType = '';
					} else {
						self.showToast(res.data.msg);
						self.scanMsg = '';
						self.scanType = '';
					}
				})
			},
			getDetail() {
				console.log(this.scanType);
				if (this.scanType == 'XF') {
					uni.navigateTo({
						url: "../../check/fireControlCheck/fireControlCheck"
					})
				} else if (this.scanType == 'XG') {
					uni.navigateTo({
						url: '../../check/schoolCheck/schoolCheck'
					})
				}
			},
			showToast(title) {
				uni.showModal({
					title: '提示',
					content: title,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {}
					}
				});
			},
			getPlace(id,type) {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/School/Get_PlaceWay',
					data: {
						QRCode: id,
						type: type
					}
				}).then(data => {
					var [error,res] = data;
					console.log(res)
					if (res.data.code ==0) {
						self.placeName = res.data.data;
					}
				})
			},
			getPlaceNum(type) {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Web/Get_XGXFPointTotal'
					
				}).then(data => {
					var [error,res] = data;
					console.log(res)
					if (res.data.code ==0) {
						var foo = res.data.data;
						for (let s of foo) {
							if (s.type == type) {
								self.wait = s.count;
							}
						}
						
					}
				})
			},
			getData(id,type) {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/School/Get_HD',
					data: {
						QRCode: id,
						type: type,
						RYXH: self.$store.state.userInfo.RYXH,
						isCheck: 'true'
					},
				}).then(data => {
					// console.log(data)
					var [error, res] = data;
					
					console.log(res.data);
					self.lastman = res.data.info.RYMC || '未检查';
					self.lasttime = res.data.info.checkTime || '未检查';
				})
			},
			getCode() {
				var self = this;
				self.active = 0;
				uni.showLoading({
					title:'扫描中。。。',
					mask:true
				})
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log(res)
						if (utils.GetUrlParam('id',res.result)) {
							let id = utils.GetUrlParam('id',res.result);
							let type = utils.GetUrlParam('type',res.result) || 'XF';
							self.getData(id,type);
							// let type = 'XG';
							self.scanMsg = id;
							self.scanType = type;
							
							self.judgeIscheck(id,type);
							console.log(id,type)
							
							uni.hideLoading();
						} else {
							uni.hideLoading();
							self.showModel('扫描失败')
						}
					},
					fail() {
						uni.hideLoading();
						self.showToast('扫描失败！')
					}
				})
			}
		}
	}
</script>

<style>
.steptitle {
	text-align: justify;
	padding-right: 30upx;
	font-size: 30upx;
	position: relative;
	height: 60upx;
	line-height: 60upx;
	width: 200upx;
}
.stepFlex{
	flex: 1;
}
.steptitle2 {
	text-align: justify;
	padding-right: 30upx;
	font-size: 30upx;
	position: relative;
	height: 60upx;
	line-height: 60upx;
	width: 280upx;
}
.steptitle3 {
	text-align: justify;
	padding-right: 30upx;
	font-size: 30upx;
	position: relative;
	height: 60upx;
	line-height: 60upx;
	width: 480upx;
}
</style>
