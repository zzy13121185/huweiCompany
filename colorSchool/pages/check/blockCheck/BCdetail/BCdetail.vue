<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true"><block slot="backText">返回</block><block slot="content">区域排查详情</block></cu-custom>
		<view class="cu-form-group">
			<view class="steptitle">检查时间：</view>
			<view class="content stepFlex">
				{{CheckTime}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="steptitle">检查人：</view>
			<view class="content stepFlex">
				{{CheckUser}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="steptitle">地点：</view>
			<view class="content stepFlex">
				{{PlaceName}}
			</view>
		</view>
		<view v-for="(foo,index) in list.Detail" :key="index">
			<view class="cu-form-group margin-top" v-if="foo.YSMC">
				<view class="steptitle">隐患名称：</view>
				<view class="content stepFlex">
					{{foo.YSMC}}
				</view>
			</view>
			<view class="cu-form-group" v-if="foo.CZWT">
				<view class="steptitle">隐患描述：</view>
				<view class="content stepFlex">
					{{foo.CZWT}}
				</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-pink"></text> 现场图片：
				</view>
			</view>
			<swiper class="card-swiper"
			 :autoplay="true" interval="5000" duration="500" @change="cardSwiper">
				<swiper-item v-for="(item,index) in foo.ImgURL" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item" @click="ViewImage" :data-url="foo.ImgURL[index]" :data-all="foo.ImgURL">
						<image :src="item" mode="aspectFit"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				dotStyle: false,
				cardCur: 0,
				placeNo: '',
				list: [],
				CheckTime: '',
				CheckUser: '',
				PlaceName: '',
				time: ''
			}
		},
		methods: {
			ViewImage(e) {
				uni.previewImage({
					urls: e.currentTarget.dataset.all,
					current: e.currentTarget.dataset.url
				});
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			getDetail() {
				var self = this;
				uni.request({
					//当前详情
					url: self.$store.state.urlPrefix + '/Web/Get_query_hdDetail',
					data:{
						CCType: "",
						YHXH: "",
						campusplaceNo: "S000099100001",
						placeNo: self.placeNo,
						time: self.time,
						type: "PC",
					}
				}).then(data => {
					var [error,res] = data;
					self.list = res.data.data;
					self.CheckTime = res.data.data.CheckTime;
					self.CheckUser = res.data.data.CheckUserName;
					self.PlaceName = res.data.data.PlaceName;
					console.log(self.list.Detail)
					for (let site of self.list.Detail) {
						site.ImgURL = site.ImgURL.split(',')
					}
					uni.hideLoading()
				})
			},
			
		},
		mounted() {
			this.getDetail()
			
		},
		onLoad(option) {
			console.log(option)
			uni.showLoading({
				title:"加载中。。。",
				mask:true
			})
			this.placeNo = option.placeNo;
			this.time = option.time;
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
</style>
