<template>
	<view id="yhsb">
		<cu-custom bgColor="bg-olive" :isBack="true"><block slot="backText">返回</block><block slot="content">隐患上报</block></cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">二维码</view>
			<input name="input" disabled="true" placeholder="请扫描二维码" v-model="placeName"></input>
			<button class='cu-btn bg-green shadow' @click="getCode">扫描</button>
		</view>
		
		<scan v-if="active == 3" :msg="scanMsg" :type="scanType" :fromm="fromm"></scan>
		
		<reportScan v-if="active == 6"  :msg="scanMsg" :type="scanType" :fromm="fromm"></reportScan>
		
		<view v-if="active == 0">
			<view class="task-toast">
				请选择隐患源：<text class="dangerToast" v-if="dangerRow.length == 0">*</text>{{dangerRoad}}{{chooedYS}}
			</view>
			<view class="cu-form-group">
				<view class="title">隐患搜索</view>
				<input placeholder="请输入关键字" name="input" v-model="searchText"></input>
				<button class='cu-btn bg-green shadow' @click="search"><text class="cuIcon-search"></text>搜索</button></button>
			</view>
			<scroll-view id="arrRow" style="height: 400upx" scroll-y>
				<view v-if="!showDangerCheckBox">
					<view class="cu-list menu text-left solid-top" v-for="(item,index) in dangerInfoRow" :key="index" @click="getNext(item)">
						<view class="cu-item">
							<view class="content">
								<text class="text-black">{{item.XZMC}}</text>
							</view>
							<view class="action">
								<text class="cuIcon-right"></text>
							</view>
						</view>
					</view>
				</view>
				
				<view v-if="showDangerCheckBox">
					<radio-group @change="radioChange" class="block">
						<label v-for="(item ,index) in dangerCheckBox" :key="item.id" class="cu-form-group solid-top">
							<view class="title">
								{{item.YSMC}}
							</view>
							<radio :value="item.YSCD" :checked="index === current"  class="checked"/>
						</label>
					</radio-group>
				</view>
				
			</scroll-view>
			<view class="cu-form-group margin-top" v-if="pcyd.length>0">
				<view class="steptitle">排查要点：</view>
				<view class="content stepFlex">
					{{pcyd}}
				</view>
			</view>
			<view class="padding flex flex-direction" style="width: 300upx;float: right;">
				<button class="cu-btn bg-orange" @click="reset">返回</button>
			</view>
			
			<view class="padding flex flex-direction" style="width: 750upx;float: right;">
				
				<button class="cu-btn bg-red margin-tb-sm lg" @click="gotoDetail">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from "../../../utils.js";
	export default {
		data() {
			return {
				radio: '',
				originalData: [],
				dangerInfoRow: [],
				dangerCheckBox: [],
				showDangerCheckBox: false,
				current: -1,
				choose: '',
				pcyd: '',
				dangerRoad: '',
				chooedYS: '',
				chooedXZCD: '',
				clickTime: 0,
				scanMsg: '',
				scanType: '',
				active: 0,
				fromm: '隐患上报',
				placeName: '',
				searchText: '',
				searchXZCD: ''
			}
		},
		methods: {
			getPCYD(YSCD) {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_PCYD',
					method: 'GET',
					data: {
						YSCD: YSCD
					},
					header: {
						'custom-header': 'application/json'
					},
					success: res => {
						self.pcyd = res.data;
					}
				});
			},
			search() {
				var self = this;
				if (!self.searchXZCD) {
					self.showMoadel('请选择地点！')
				} else {
					if (self.searchText) {
						uni.showLoading({
							title: '搜索中',
							mask:true
						})
						uni.request({
							url: self.$store.state.urlPrefix + '/Home/Query_YS',
							method: 'GET',
							data: {
								xzcd: self.searchXZCD,
								key: self.searchText.replace(/\s+/g,"")
							},
							header: {
								'custom-header': 'application/json'
							},
							success: (res) => {
								uni.hideLoading()
								if (res.data.length>2) {
									var data = JSON.parse(res.data)
									self.dangerCheckBox = data;
									self.showDangerInfo = false;
									self.showDangerCheckBox = true;
								} else {
									self.showMoadel('未搜索到与"'+self.searchText+'"有关的信息')
								}
							}
						});
					} else {
						self.showMoadel('请输入搜索内容')
					}
				}
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
			getCode() {
				var self = this;
				uni.showLoading({
					title:'扫描中。。。',
					mask:true
				})
				uni.scanCode({
					
					success: function(res) {
						if (utils.GetUrlParam('id',res.result)) {
							let id = utils.GetUrlParam('id',res.result);
							let type = utils.GetUrlParam('type',res.result) || 'XF';
							// let type = 'XG';
							self.scanMsg = id;
							self.scanType = type;
							self.getPlace(id,type)
							if (self.scanType == 'XF') {
								self.active = 3;
							} else if(self.scanType == 'XG'){
								self.active = 6;
							} else {
								self.active = 6;
							}
							uni.hideLoading();
						} else {
							uni.hideLoading();
							self.showMoadel('扫描失败')
						}
					},
					fail() {
						uni.hideLoading();
						self.showMoadel('扫描失败')
					}
				})
			},
			reset() {
				this.dangerInfoRow = this.originalData;
				this.dangerCheckBox = [];
				this.showDangerCheckBox = false;
				this.dangerRoad = '';
				this.choose = '';
				this.pcyd = '';
				this.current = -1;
				this.chooedYS = '';
				this.dangerRoad = '';
				this.clickTime = 0;
				this.chooedXZCD = '';
				this.searchXZCD = '';
				this.searchText = '';
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
			getInfo() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_AllBZ',
					data: {
						DWCD: self.$store.state.userInfo.DWCD
					},
					method: 'GET',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
			
						let data = JSON.parse(res.data)
						if (res.data.length == 0) {
							self.showMoadel('此处没有隐患源')
						} else {
							self.originalData = data;
							self.dangerInfoRow = data;
						}
					}
				})
			},
			radioChange: function(evt) {
				this.getPCYD(evt.target.value)
				for (let i = 0; i < this.dangerCheckBox.length; i++) {
					if (this.dangerCheckBox[i].YSCD === evt.target.value) {
						this.chooedYS = this.dangerCheckBox[i].YSMC;
						this.current = i;
						this.choose = evt.target.value;
						console.log(this.choose)
						break;
					}
				}
			},
			getNext(item) {
				var self = this;
				
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				if (self.clickTime == 1) {
					self.chooedXZCD = item.XZCD;
					
				}
				self.searchXZCD = item.XZCD;
				self.clickTime = self.clickTime+1;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Choose_YS2',
					method: 'GET',
					data: {
						id: item.XZCD,
						RYXH: self.$store.state.userInfo.RYXH
					},
					header: {
						'custom-header': 'application/json'
					},
					success: (res) => {
						let data = JSON.parse(res.data);
						if (data.length == 0) {
							self.showMoadel('此处没有隐患源')
						} else if (data[0].XZMC) {
							self.dangerInfoRow = data;
							self.dangerRoad = self.dangerRoad + item.XZMC + '--';
						} else {
							self.dangerCheckBox = data;
							self.dangerRoad = self.dangerRoad + item.XZMC + '--';
							self.showDangerCheckBox = true;
						}
						uni.hideLoading()
					},
					
				});
			},
			gotoDetail() {
				if (!this.choose) {
					this.showMoadel('请选择隐患源！')
				} else {
					uni.navigateTo({
						url: '../reportDetail/reportDetail?yscd='+this.choose + "&name="+this.chooedYS + "&firstlevel=" + this.chooedXZCD
					})
				}
			}
		},
		onLoad(option) {
			
		},
		mounted() {
			this.getInfo()
		}
	}
</script>

<style>
#yhsb .cu-list+.cu-list {
	margin-top: 1upx
}
#yhsb .task-toast {
		width: 710upx;
		height: 110upx;
		line-height: 2;
		margin: 0 auto;
	}

#yhsb .dangerToast {
		color: #F56C6C;
		text-indent: 1em;
		font-size: 16px;
	}
#yhsb .footItem {
	position: fixed;
	z-index: 1111;
	bottom: 0upx;
	width: 750upx;
	height: 240upx;
}

#arrRow {
	
	/* margin-top: 110upx; */
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
.stepFlex{
	flex: 1;
}
</style>
