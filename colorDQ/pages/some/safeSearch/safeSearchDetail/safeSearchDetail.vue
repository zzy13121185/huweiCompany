<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">巡查详情</block></cu-custom>
		<view class="cu-form-group margin-top">
			<view class="steptitle">隐患名称：</view>
			<view class="content stepFlex">
				{{foo.YSMC}}
			</view>
		</view>
		
		<view class="cu-form-group">
			<view class="steptitle">工点：</view>
			<view class="content stepFlex">
				{{foo.XZMC}}
			</view>
		</view>
		<view class="cu-form-group" v-if="foo.source">
			<view class="steptitle">通知来源：</view>
			<view class="content stepFlex">
				{{foo.source}}
			</view>
		</view>
		<view class="cu-form-group" v-if="foo.AQZK">
			<view class="steptitle">隐患等级：</view>
			<view class="content stepFlex">
				{{foo.AQZK}}
			</view>
		</view>
		<view class="cu-form-group" v-if="foo.place">
			<view class="steptitle">隐患位置：</view>
			<view class="content stepFlex">
				{{foo.place}}
			</view>
		</view>
		<view class="cu-form-group" v-if="foo.CZWT">
			<view class="steptitle">隐患描述：</view>
			<view class="content stepFlex">
				{{foo.CZWT}}
			</view>
		</view>
		<view class="cu-form-group" v-if="foo.require">
			<view class="steptitle">处理要求：</view>
			<view class="content stepFlex">
				{{foo.require}}
			</view>
		</view>
		<view class="cu-form-group" v-if="foo.opinion">
			<view class="steptitle">处理意见：</view>
			<view class="content stepFlex">
				{{foo.opinion}}
			</view>
		</view>
		<view class="cu-form-group" v-if="foo.FXSJ">
			<view class="steptitle">上报时间：</view>
			<view class="content stepFlex">
				{{foo.FXSJ}}
			</view>
		</view>
		<view class="cu-form-group" v-if="foo.JSSJ">
			<view class="steptitle">截止时间：</view>
			<view class="content stepFlex">
				{{foo.JSSJ}}
			</view>
		</view>
		
		<view class="cu-form-group" v-if="nowperson">
			<view class="steptitle">当前处理人：</view>
			<view class="content stepFlex">
				{{nowperson}}
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
				<button class="cu-btn sm bg-red margin-top" v-if="item.File_records" @click="previewImage(item.File_records)">查看图片</button>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option: {},
				nowperson: '',
				foo: {},
				record: [],
				swiperList: [],
				cardCur: 0,
			}
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
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
			getExecutor() {
				var self = this
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_Executors',
					data: {
						No: self.option.No
					}
				}).then(data => {
					var [error,res] = data;
					self.nowperson = res.data;
				})
			},
			getInfo() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Details_Problems',
					data: {
						YHXH: self.option.YHXH,
						state: self.option.state,
					}
				}).then(data => {
					var [error,res] = data;
					if (res.data.length>2) {
						var data = JSON.parse(res.data)
						console.log(data);
						self.foo = data[0];
						if (self.foo.AQZK == 1) {
							self.foo.AQZK = '轻微隐患'
						} else {
							self.foo.AQZK = '一般隐患'
						}
					}
				})
			},
			getRecord() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_Processing',
					data: {
						No: self.option.No,
					}
				}).then(data => {
					var [error,res] = data;
					if (res.data != '暂无数据') {
						console.log(JSON.parse(res.data));
						self.record = JSON.parse(res.data)
					}
				})
			},
			getImg() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_ZGimg',
					data: {
						No: self.option.No
					}
				}).then(data => {
					var [error,res] = data;
					let aa = res.data[0].url;
					self.swiperList = aa.split(',');
					
				})
			},
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			this.option = option;
			console.log(this.option)
		},
		mounted() {
			if (this.option.state == '0') {
				this.getExecutor();
			}
			this.getImg();
			this.getInfo();
			this.getRecord();
			this.$nextTick(function(){
				uni.hideLoading()
			})
		}
	}
</script>

<style>
.stepFlex{
	flex: 1;
}
</style>
