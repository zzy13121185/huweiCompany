<template>
	<view>
		<view class="check-row">
			<cu-custom bgColor="bg-red" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">考勤查询</block>
			</cu-custom>
			<view class="person-list" style="overflow: auto;">
				<view class="cu-form-group">
					<view class="title">日期选择:</view>
					<picker mode="date" :value="date" start="2020-03-01" :end="today" @change="DateChange">
						<view class="picker">
							{{date}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">查询类别:</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{picker[index]}}
						</view>
					</picker>
				</view>
				<view class="cu-list menu margin-top" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" v-if="index == 0">
					<view class="checkitem" v-for="(item,index) in foo" :key="index" style="width: 750upx;">
						<view class="checkitem" @click="showLevel" :data-info="item">
							
							<button class="content cu-btn bg-white">
								<text class="text-orange cuIcon-title"></text>
								
								<text class="text-black">{{item.XZMC}}({{item.isCheckInEnd}})</text>
							</button>
							<button class="content cu-btn bg-white">
								<text class=" text-black" style="float: right;">出勤人数：{{item.people}}</text>
								<text class=" text-black" :class="item.shownext? 'cuIcon-unfold' : 'cuIcon-right'"></text>
							</button>
							
						</view>
						<view class="checkitem borderTop" v-if="item.shownext" >
							<view class="checkitem" v-for="(site,indexx) in item.companys" :key="indexx" style="padding-left: 80rpx;">
								<view class="checkitem" style="min-height: 70upx;">
									
									<button class="content cu-btn bg-white">
										<text class="text-yellow cuIcon-title"></text>
										<text class="text-black">{{site.company}}</text>
									</button>
								</view>
								<view class="checkitem" v-for="(name,num) in site.users" :key="num" style="padding-left: 80upx;min-height: 70upx;">
									<button class="content cu-btn bg-white">
										<text class="text-olive cuIcon-title"></text>
										<text class="text-black">{{name.name}}</text>
									</button>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-list menu margin-top" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" v-if="index == 1">
					<view class="checkitem" v-for="(item,index) in companyFoo" :key="index" style="width: 750upx;" v-if="companyFoo[0].isCheckInEnd == '已结束'">
						<view class="checkitem" @click="showLevel2" :data-info="item">
							
							<button class="content cu-btn bg-white">
								<text class="text-orange cuIcon-title"></text>
								
								<text class="text-black">{{item.company}}</text>
							</button>
							<button class="content cu-btn bg-white">
								<text class=" text-black" style="float: right;">缺勤：{{item.absentees}}</text>
								<text class=" text-black" :class="item.shownext? 'cuIcon-unfold' : 'cuIcon-right'"></text>
							</button>
							
						</view>
						<view class="checkitem borderTop" v-if="item.shownext" >
							<view class="checkitem" v-for="(site,indexx) in item.detail" :key="indexx" style="padding-left: 80rpx;">
								<view class="checkitem" style="min-height: 70upx;">
									
									<button class="content cu-btn bg-white">
										<text class="text-yellow cuIcon-title"></text>
										<text class="text-black">{{site.name}}</text>
									</button>
								</view>
							</view>
						</view>
					</view>
					<view v-if="companyFoo[0].isCheckInEnd != '已结束'" class="checkToast bg-white">
						考勤暂未结束
					</view>
				</view>
				
			</view>
			<!-- <view class="check-button" @click="search">
				查询
			</view> -->
		</view>
	</view>
</template>

<script>
	import now from "../../../getTime.js";
	export default {
		data() {
			return {
				menuArrow: true,
				menuBorder: false,
				menuCard: false,
				date: '',
				index: 0,
				picker: ['按工点查询','按公司查询'],
				isCompany: false,
				foo: [],
				companyFoo: [],
				today: ''
			}
		},
		methods: {
			showLevel2(e) {
				
				var infoo = e.currentTarget.dataset.info;
				for (let s of this.companyFoo) {
					if (s.company == infoo.company) {
						s.shownext = !s.shownext;
					}
				}
				
			},
			showLevel(e) {
				
				var infoo = e.currentTarget.dataset.info;
				for (let s of this.foo) {
					if (s.XZCD == infoo.XZCD) {
						s.shownext = !s.shownext;
					}
				}
				
			},
			PickerChange(e) {
				this.index = e.detail.value;
				
				if (this.index == 0) {
					this.isCompany = false
				} else {
					this.isCompany = true;
				}
				this.getData();
			},
			DateChange(e) {
				this.date = e.detail.value;
				this.getData();
			},
			search() {
				this.getData()
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
			getData() {
				uni.showLoading({
					title:'加载中。。。',
					mask:true
				})
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Web/Query_CheckIn',
					data:{
						time: self.date,
						isCompany: self.isCompany
					}
				}).then(data => {
					var [error, res] = data;
					
					if (res.data.code == 0) {
						if (self.isCompany) {
							for (let s of res.data.data) {
								
								s.shownext = false;
								
							}
							self.companyFoo = res.data.data;
						} else {
							for (let s of res.data.data) {
								s.people = 0;
								s.shownext = false;
								if (s.companys.length>0) {
									for (let k of s.companys) {
										s.people = s.people + k.users.length;
									}
								} else {
									s.people =  0;
								}
							}
							self.foo = res.data.data;
						}
						
					} else {
						self.showToast('查询出错')
					}
					uni.hideLoading()
					
				})
			}
		},
		mounted() {
			this.date = now.now();
			this.today = now.now()
			this.getData()
		}
	}
</script>

<style>
	.check-row {
		position: absolute;
		top: 0upx;
		bottom: 0upx;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.person-list {
		width: 100%;
		flex: 1;
		box-sizing: border-box;
		padding: 20upx 0;
	}

	.check-button {
		width: 100%;
		height: 100upx;
		background-color: #409EFF;
		line-height: 100upx;
		font-size: 14px;
		text-align: center;
		color: #ffffff;
		letter-spacing: 3px;
	}

	.check-title {
		width: 100%;
		height: 80upx;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #DCDFE6;
	}

	.check-title-kid {
		height: 80upx;
		width: 25%;
		line-height: 80upx;
		text-align: center;

	}

	.steptitle {
		text-align: justify;
		padding-right: 30upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		width: 200upx;
	}

	.stepFlex {
		flex: 1;
		text-align: right;
	}
	.checkitem{
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding: 0rpx;
		min-height: 100rpx;
		background-color: #ffffff;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		flex-wrap: wrap;
		width: 750upx;
		font-size: 24upx;
	}
	
	.borderTop{
		border-top: 1px solid #DCDFE6
	}
	
	.checkToast{
		width: 710upx;
		height: 100upx;
		text-align: center;
		margin-left: 20upx;
		line-height: 100upx;
		font-size: 15px;
		font-weight: bold;
	}
</style>
