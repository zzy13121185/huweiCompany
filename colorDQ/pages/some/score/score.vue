<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">工点扣分情况查询</block></cu-custom>
		
		<view v-if="rollId == 6">
			<view class="cu-form-group margin-top">
				<view class="steptitle">请选择工点:</view>
				<view class="content stepFlex">
					{{dangerRoad}}
				</view>
			</view>
			<scroll-view id="arrRow" style="height: 600upx" scroll-y>
				
				<view>
					<radio-group @change="radioChange" class="block">
						<label v-for="(item ,index) in dangerCheckBox" :key="item.id" class="cu-form-group solid-top">
							<view class="title">
								{{item.XZMC}}
							</view>
							<radio :value="item.XZCD" :checked="index === current"  class="checked"/>
						</label>
					</radio-group>
				</view>
			</scroll-view>
		</view>
		<view class="cu-form-group">
			<view class="title">月份选择</view>
			<picker mode="date" fields="month" :value="date" start="2019-09" :end="date" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		<view class="padding flex flex-direction" style="width: 750upx;float: right;">
			
			<button class="cu-btn bg-green lg" @click="upload('copy')">复制链接</button>
		</view>
		<view class="padding flex flex-direction" style="width: 750upx;float: right;padding-top: 0upx;">
			
			<button class="cu-btn bg-red margin-tb-sm lg" @click="upload('download')">下载</button>
		</view>
		
	</view>
</template>

<script>
	import helper from "../../../common/helper.js";
	export default {
		data() {
			return {
				originalData: [],
				dangerCheckBox: [],
				showDangerCheckBox: false,
				current: -1,
				choose: '',
				dangerRoad: '',
				date: '请选择月份',
				rollId: null
			}
		},
		methods: {
			DateChange(e) {
				this.date = e.detail.value
			},
			reset() {
				this.dangerCheckBox = this.originalData;
				this.choose = '';
				this.current = -1;
				this.dangerRoad = ';'
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
							self.dangerCheckBox = data;
						}
					}
				})
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.dangerCheckBox.length; i++) {
					if (this.dangerCheckBox[i].XZCD === evt.target.value) {
						this.current = i;
						this.choose = evt.target.value;
						break;
					}
				}
				console.log(this.choose)
			},
			copy(path) {
				uni.setClipboardData({
					data: this.$store.state.urlPrefix + path,
					success: function() {
						console.log('success');
					}
				});
				uni.getClipboardData({
					success: function(res) {
						console.log(res.data);
					}
				});
			},
			upload(type) {
				var self = this;
				
				if (self.rollId == 6) {
					if (!self.choose) {
						self.showMoadel('请选择工点！')
					} else if (this.date == '请选择月份') {
						self.showMoadel('请选择月份!')
					}else {
						uni.showLoading({
							title:'下载中。。。',
							mask:true
						})
						uni.request({
							url: self.$store.state.urlPrefix + '/Home/Get_PointsInfoByMonth',
							data:{
								xzcd: self.choose,
								time: self.date
							}
						}).then(data => {
							var [error,res] = data;
							uni.hideLoading();
							console.log(res.data,typeof(res.data))
							if (res.data.code == 0) {
								
								if (type == 'copy') {
									self.copy(res.data.data[0])
								} else {
									self.zzy(res.data.data[0])
								}
							} else {
								if (type == 'copy') {
									self.showMoadel('复制失败')
								} else {
									self.showMoadel('下载失败')
								}
							}
						})
					}
				} else {
					uni.request({									
						url: self.$store.state.urlPrefix + '/Home/Get_PointsInfoByMonthBySelf',
						data:{
							ryxh: self.$store.state.userInfo.RYXH,
							time: self.date
						}
					}).then(data => {
						var [error,res] = data;
						uni.hideLoading();
						console.log(res.data,typeof(res.data))
						if (res.data.code == 0) {
							self.zzy(res.data.data[0])
						} else {
							self.showMoadel('下载失败')
						}
					})
				}
			},
			zzy(path) {
				uni.downloadFile({
					url: this.$store.state.urlPrefix + path,
					success: res => {
						if (res.statusCode === 200) {
							// console.log(res.tempFilePath);
							var tempFilePath = res.tempFilePath;
			
							uni.openDocument({
								filePath: tempFilePath,
								success() {
			
								}
							})
						}
					}
				});
			}
		},
		mounted() {
			this.rollId = this.$store.state.userInfo.ROLEID;
			this.getInfo();
			// this.date = helper.nowMon();
		}
	}
</script>

<style>

</style>