<template>
	<view>
		<view class="check-row">
			<cu-custom bgColor="bg-red" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">考勤</block>
			</cu-custom>
			<view class="person-list">
				<view class="cu-form-group">
					<view class="title">工点选择:</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'请选择工点'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">已考勤人数：{{peopleNumber}}</view>
					<button class='cu-btn bg-green shadow' @click="commit">{{commitWord}}</button>
				</view>
				<view v-if="showPerson">
					<swiper class="card-swiper" :autoplay="true" interval="5000" duration="500" @change="cardSwiper">
						<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
							<view class="swiper-item" @click="ViewImage" :data-url="swiperList[index]">
								<image :src="item" mode="aspectFit"></image>
							</view>
						</swiper-item>
					</swiper>
					<view class="cu-form-group">
						<view class="title">上传/更改照片:</view>
						<button class="cu-btn bg-green" @click="ChooseImage">拍摄</button>
						<!-- <button class="cu-btn bg-olive" @click="uploadImg">上传</button> -->
					</view>
					<view class="cu-form-group">
						<view class="steptitle">姓名：</view>
						<view class="content stepFlex">
							{{peopleList.name}}
						</view>
					</view>
					<view class="cu-form-group">
						<view class="steptitle">工号：</view>
						<view class="content stepFlex">
							{{peopleList.jobNo}}
						</view>
					</view>
					<view class="cu-form-group">
						<view class="steptitle">所属公司：</view>
						<view class="content stepFlex">
							{{peopleList.company}}
						</view>
					</view>
					<view class="padding flex flex-direction" style="width: 300upx;float: left;">
						<button class="cu-btn bg-red" @click="reset">取消</button>
					</view>
					<view class="padding flex flex-direction" style="width: 300upx;float: right;">
						<button class="cu-btn bg-green" @click="checkIn">给他打卡</button>
					</view>
				</view>


			</view>
			<view class="check-button" @click="getCode">
				扫描二维码考勤
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				picker: [],
				peopleList: {},
				swiperList: [],
				cardCur: 0,
				showPerson: false,
				id: '',
				pickerRow: [],
				pickerId: '',
				peopleNumber: 0,
				right: true,
				commitWord: '结束考勤'
			}
		},
		methods: {
			//获取考情人数
			getNumber() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Web/Get_CheckInNum',
					data:{
						xzcd: self.pickerId,
					}
				}).then(data => {
					var [error, res] = data;
					console.log(res.data)
					self.peopleNumber = res.data.data || 0;
				})
			},
			PickerChange(e) {
				this.index = e.detail.value;
				this.pickerId = this.pickerRow[this.index].XZCD;
				console.log(this.pickerId)
				this.getNumber();
				this.judgeRight()
			},
			ChooseImage() {
				var self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', "album"], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths)
						self.swiperList = [chooseImageRes.tempFilePaths[0]];
						var postImgUrl = self.$store.state.urlPrefix + '/Web/Add_BuildersImg';
						const uploadTask = uni.uploadFile({
							url: postImgUrl, //仅为示例，非真实的接口地址
							filePath: self.swiperList[0],
							name: 'image',
							formData: {
								'builderId': self.id
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
						console.log(uploadTask)
						uploadTask.onProgressUpdate((res) => {
							console.log('上传进度' + res.progress);
							// console.log('已经上传的数据长度' + res.totalBytesSent);
							// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
							uni.showLoading({
								title:"上传中:"+res.progress+'%',
								mask:true
							})
							if (res.progress == 100) {
								uni.hideLoading()
							}
						});
					}
				});
			},
			reset() {
				var self = this;
				uni.showModal({
					title: '提示',
					content: '是否取消此次考勤？',
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							self.showPerson = false;
							self.id = "";
							self.peopleList = {},
								self.swiperList = []
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
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
			commit() {
				var self = this;
				
				if (self.right) {
					self.showToast('考勤已经结束！');
					
				} else {
					uni.showModal({
						title: '提示',
						content: '是否结束此次考勤？',
						showCancel: true,
						success: function(res) {
							
							if (res.confirm) {
								uni.showLoading({
									title:'加载中。。。',
									mask:true
								})
								uni.request({
									url: self.$store.state.urlPrefix + '/Web/CheckInEnd',
									data:{
										xzcd: self.pickerId,
										userId: self.$store.state.userInfo.RYXH
									}
								}).then(data => {
									var [error, res] = data;
									console.log(res.data)
									uni.hideLoading()
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			getCode() {
				if(this.right) {
					this.showToast('考勤已经结束！')
				} else {
					var self = this;
					uni.showLoading({
						title: '扫描中。。。',
						mask: true
					})
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							console.log(res)
							var path = res.result;
							
							var builderId = path.split("builderId=");
							self.id = builderId[1];
							console.log(self.id)
							// self.checkIn(builderId);
							self.getData()
						},
						fail() {
							uni.hideLoading();
							self.showToast('扫描失败！')
						}
					})
				}
			},
			getData() {
				var self = this;
				self.showPerson = false;
				uni.request({
					url: self.$store.state.urlPrefix + '/Web/Get_Web_BuildersInfo',
					data:{
						builderId: self.id
					}
				}).then(data => {
					var [error, res] = data;
					console.log(res.data);
					uni.hideLoading();
					self.peopleList = res.data[0];
					// res.data.data.imgPath = "";
					self.swiperList.push(res.data[0].imgPath);
					self.showPerson = true;
				})
			},
			checkIn() {
				uni.showLoading({
					title: "考勤中。。。",
					mask: true
				})
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Web/Builders_CheckIn',
					data: {
						builderId: self.id,
						userId: self.$store.state.userInfo.RYXH,
						xzcd: self.pickerId
					}
				}).then(data => {
					var [error, res] = data;
					console.log(res.data);
					self.getNumber();
					uni.hideLoading();
					if (res.data.code == 0) {
						self.showToast('考勤成功');
						self.showPerson = false;
						self.id = "";
						self.peopleList = {},
							self.swiperList = []
					} else if (res.data.code == 1) {
						self.showToast(res.data.msg);
						self.showPerson = false;
						self.id = "";
						self.peopleList = {},
							self.swiperList = []
					} else {
						self.showToast('考勤失败')
					}
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
			getXZ() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Web/Get_XZ_Role',
					data: {
						userId: self.$store.state.userInfo.RYXH
					}
				}).then(data => {
					var [error, res] = data;
					console.log(res.data);
					self.pickerRow = res.data.data;
					for (let s of res.data.data) {
						self.picker.push(s.XZMC)
					}
					self.pickerId = self.pickerRow[self.index].XZCD;
					self.getNumber();
					self.judgeRight();
				})
			},
			//判断是否可以扫描   不能扫描返回true
			judgeRight() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/web/Get_IsCheckInEnd',
					data: {
						xzcd: self.pickerId
					}
				}).then(data => {
					var [error, res] = data;
					console.log(res.data);
					self.right = res.data.data;
					if (self.right) {
						self.commitWord = '考勤已结束'
					} else {
						self.commitWord = '结束考勤'
					}
				})
			}
		},
		mounted() {
			this.getXZ();
			
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
</style>

