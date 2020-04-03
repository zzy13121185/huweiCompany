<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true"><block slot="backText">返回</block><block slot="content">隐患归档</block></cu-custom>
		<view class="cu-form-group margin-top">
			<view class="steptitle">隐患名称：</view>
			<view class="content stepFlex">
				{{firstFoo.YSMC}}
			</view>
		</view>
		
		<view class="cu-form-group">
			<view class="steptitle">所在分组：</view>
			<view class="content stepFlex">
				{{firstFoo.yspath}}
			</view>
		</view>
		
		<view class="cu-form-group">
			<view class="steptitle">发生时间：</view>
			<view class="content stepFlex">
				{{secondFoo.FXSJ}}
			</view>
		</view>
		<view class="cu-form-group" v-if="secondFoo.Endtime">
			<view class="steptitle">发生时间：</view>
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
		<view class="cu-form-group">
			<view class="steptitle">隐患描述：</view>
			<view class="content stepFlex">
				{{secondFoo.CZWT}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="steptitle">检查记录：</view>
			<view class="content stepFlex">
				{{secondFoo.position}}
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
						{{item.UpdateTime}}
					</view>
					<view class="text-sm">{{item.RYMC}}:{{item.RecordRemarks}}</view>
				</view>
				<button class="cu-btn sm bg-olive margin-top" v-if="item.File_records" @click="previewImage(item.File_records)">查看图片</button>
			</view>
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
		
		<view class="cu-form-group align-start">
			<view class="title">归档意见:</view>
			<textarea auto-height v-model="opinion"/>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @click="commit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.option = option;
			console.log(option)
		},
		data() {
			return {
				dotStyle: false,
				cardCur: 0,
				option: {},
				swiperList: [],
				firstFoo: {},
				secondFoo: {},
				record: [],
				opinion: ''
			}
		},
		methods: {
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
						YSCD: self.option.YSCD,
						BranchId: self.option.BranchId
					},
				}).then(data => {
					var [error,res] = data;
					// console.log(res.data)
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
						No: self.option.No,
						BranchId: self.option.BranchId
					},
				}).then(data => {
					var [error,res] = data;
					
					if (res.data != '暂无数据') {
						self.secondFoo = JSON.parse(res.data);
						self.secondFoo = self.secondFoo[0];
						// console.log(self.secondFoo)
						if (self.secondFoo.AQZK == '1') {
							self.secondFoo.AQZK = '一般隐患'
						} else if (self.secondFoo.AQZK == '2') {
							self.secondFoo.AQZK = '严重隐患'
						}
					}
				})
			},
			getRecord() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_Processing',
					data: {
						No: self.option.No
					},
				}).then(data => {
					var [error,res] = data;
					
					if (res.data != '暂无数据') {
						console.log(JSON.parse(res.data));
						self.record = JSON.parse(res.data)
					}
				})
			},
			getImage() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_YHimg',
					data: {
						No: self.option.No
					},
				}).then(data => {
					var [error,res] = data;
					let aa = res.data[0].url;
					self.swiperList = aa.split(',');
					console.log(aa)
				})
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
			commit() {
				if (!this.opinion) {
					this.showToast('请输入归档意见！')
				} else {
					var self = this;
					uni.request({
						url: self.$store.state.urlPrefix + '/Home/File_Cur_Problems',
						data: {
							RYXH: self.$store.state.userInfo.RYXH,
							No: self.option.No,
							CLQK: self.opinion
						},
					}).then(data => {
						var [error,res] = data;
						if (res.data =='ok') {
							uni.showModal({
								title: '提示',
								content: '归档成功!',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../../../basic/home/home'
										})
									}
								}
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '归档失败！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../../../basic/home/home'
										})
									}
								}
							});
						}
					})
				}
			}
		},
		mounted() {
			uni.showLoading({
				title:'加载中。。。',
				mask:true
			})
			this.getFirstInfo();
			this.getSecondInfo();
			this.getRecord();
			this.getImage();
			this.$nextTick(function(){
				uni.hideLoading()
			})
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
}
</style>
