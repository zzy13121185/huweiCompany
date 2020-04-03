<template>
	<view id="step" style="margin-bottom: 100upx;">
		<view class="cu-form-group margin-top">
			<view class="steptitle">隐患名称：</view>
			<view class="content stepFlex">
				{{firstFoo.YSMC}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">下载隐患详情：</view>
			
			<button class='cu-btn bg-green shadow' @click="download">下载</button>
		</view>
		<view class="cu-form-group">
			<view class="steptitle">所在分组：</view>
			<view class="content stepFlex">
				{{firstFoo.yspath}}
			</view>
		</view>
		<view class="cu-form-group" v-if="secondFoo.source">
			<view class="steptitle">通知来源：</view>
			<view class="content stepFlex">
				{{secondFoo.source}}
			</view>
		</view>
		<view class="cu-form-group" v-if="secondFoo.place">
			<view class="steptitle">隐患位置：</view>
			<view class="content stepFlex">
				{{secondFoo.place}}
			</view>
		</view>
		<view class="cu-form-group" v-if="secondFoo.CZWT">
			<view class="steptitle">隐患描述：</view>
			<view class="content stepFlex">
				{{secondFoo.CZWT}}
			</view>
		</view>
		<view class="cu-form-group" v-if="secondFoo.describe">
			<view class="steptitle">检查记录：</view>
			<view class="content stepFlex">
				{{secondFoo.describe}}
			</view>
		</view>
		<view class="cu-form-group" v-if="secondFoo.opinion">
			<view class="steptitle">处理意见：</view>
			<view class="content stepFlex">
				{{secondFoo.opinion}}
			</view>
		</view>
		<view class="cu-form-group" v-if="secondFoo.require">
			<view class="steptitle">处理要求：</view>
			<view class="content stepFlex">
				{{secondFoo.require}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="steptitle">发生时间：</view>
			<view class="content stepFlex">
				{{secondFoo.FXSJ}}
			</view>
		</view>
		<view class="cu-form-group" v-if="secondFoo.Endtime">
			<view class="steptitle">截止时间：</view>
			<view class="content stepFlex">
				{{secondFoo.Endtime}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="steptitle">安全等级：</view>
			<view class="content stepFlex">
				{{secondFoo.AQZK}}
			</view>
		</view>

		<view class="cu-form-group" v-if="secondFoo.RYMC">
			<view class="steptitle">责任人员：</view>
			<view class="content stepFlex">
				{{secondFoo.RYMC}}
			</view>
		</view>
		
		<view class="cu-timeline margin-top">
			<view class="cu-item" v-for="(item,index) in record" :key="index">
				<view class="content bg-cyan">
					<view class="text-sm">
						{{item.NodeName}}
					</view>
					<view class="text-sm">
						{{item.UpdateTime}}
					</view>
					<view class="text-sm">{{item.RYMC}}:{{item.RecordRemarks}}</view>
				</view>
				<button class="cu-btn sm bg-red margin-top" v-if="item.File_records" @click="previewImage(item.File_records)">查看图片</button>
			</view>
		</view>
		
		<view class="cu-form-group margin-top" v-if="nowperson">
				当前处理人：{{nowperson}}
		</view>
		
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-pink"></text> 隐患图片：
			</view>
		</view>
		<swiper class="card-swiper"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item" @click="ViewImage" :data-url="swiperList[index]">
					<image :src="item" mode="aspectFit"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
	
</template>

<script>
	export default {
		name: 'stepInfo',
		props:{
			option: {
				type: Object
			}
		},
		data () {
			return {
				info: '',
				firstFoo: [],
				secondFoo: [],
				record: [],
				nowperson: '',
				swiperList: [],
				dotStyle: false,
				cardCur: 0,
			}
		},
		mounted() {
			uni.showLoading({
				title:'加载中。。。',
				mask:true
			})
			this.info = this._props.option;
			console.log(this.info)
			this.getFirstInfo();
			this.getSecondInfo();
			this.getRecord();
			this.getNowPeople();
			this.getImage();
			this.$nextTick(function(){
				uni.hideLoading()
			})
		},
		methods: {
			zzy(path) {
				uni.downloadFile({
					url: path,
					success: res => {
						if (res.statusCode === 200) {
							// console.log(res.tempFilePath);
							var tempFilePath = res.tempFilePath;
			
							uni.openDocument({
								filePath: tempFilePath,
								success() {
									uni.hideLoading()
								}
							})
						}
					}
				});
			},
			showMoadel(title) {
				uni.showModal({
					title: '提示',
					content: title,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {}
					}
				});
			},
			download() {
				var self = this;
				uni.showLoading({
					title:'下载中。。。',
					mask:true
				})
				uni.request({
					url: self.$store.state.urlPrefix + '/Web/Download_WordSingle',
					data: {
						no: self.info.No,
					},
				}).then(data => {
					var [error,res] = data;
					console.log(res.data)
					if (res.data.code == 0) {
						var url = res.data.data[0];
						self.zzy(url)
					} else {
						uni.hideLoading();
						self.showMoadel('下载失败！')
					}
				})
			},
			previewImage(url){
				let data = url.split(',');
				for (let i=0;i<data.length;i++) {
					data[i] = data[i].replace(/\\/g,'/');
				}
				console.log(data);
				var that = this;
				uni.previewImage({
					urls: data,
					current: data[0]
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.swiperList,
					current: e.currentTarget.dataset.url
				});
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			getFirstInfo() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_Troubleshooting',
					data: {
						YSCD: self.info.YSCD,
						BranchId: self.info.BranchId
					},
				}).then(data => {
					var [error,res] = data;
					console.log(res.data)
					if (res.data != '[]') {
						self.firstFoo = JSON.parse(res.data);
						self.firstFoo = self.firstFoo[0]
					}
				})
			},
			getSecondInfo() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_review',
					data: {
						No: self.info.No,
						BranchId: self.info.BranchId
					},
				}).then(data => {
					var [error,res] = data;
					
					if (res.data != '暂无数据') {
						self.secondFoo = JSON.parse(res.data);
						self.secondFoo = self.secondFoo[0];
						console.log(self.secondFoo)
						if (self.secondFoo.AQZK == '1') {
							self.secondFoo.AQZK = '轻微隐患'
						} else if (self.secondFoo.AQZK == '2') {
							self.secondFoo.AQZK = '一般隐患'
						}
					}
				})
			},
			getRecord() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_Processing',
					data: {
						No: self.info.No
					},
				}).then(data => {
					var [error,res] = data;
					
					if (res.data != '暂无数据') {
						console.log(JSON.parse(res.data));
						self.record = JSON.parse(res.data)
					}
				})
			},
			
			getNowPeople() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_Executor',
					data: {
						BranchId: self.info.BranchId,
						No: self.info.No,
					},
				}).then(data => {
					var [error,res] = data;
					
					self.nowperson = res.data;
				})
			},
			
			getImage() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_YHimg',
					data: {
						No: self.info.No
					},
				}).then(data => {
					var [error,res] = data;
					let aa = res.data[0].url;
					self.swiperList = aa.split(',');
					console.log(aa)
				})
			}
		},
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
	text-align: right;
}
</style>
