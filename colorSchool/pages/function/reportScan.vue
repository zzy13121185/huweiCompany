<template>
	<view id="xg">
		<view style="margin-bottom: 200upx;">
			<view v-for="(item, index) in xgData" :key="index">
				<view class="cu-form-group margin-top">
					<view class="title">{{ item.Name }}</view>
				</view>
				<view class="cu-form-group" v-for="(site, siteindex) in item.Detail" :key="siteindex" style="padding: 0 40upx;min-height: 80upx;">
					<view class="title" style="min-height: 60upx;height: auto;">{{ site.content }}</view>
					<switch @change="SwitchA" :class="switchA ? 'checked' : ''" :checked="site.isCheck" :data-info="site" :data-title="item.Name"></switch>
				</view>
				<view v-if="
						!item.Detail.every(foo => {
							return foo.isCheck == true;
						})
					">
					<view class="cu-form-group align-start">
						<view class="title">隐患描述</view>
						<textarea v-model="item.yhms" placeholder="请输入隐患描述"></textarea>
					</view>
					<view class="cu-form-group align-start">
						<view class="title">隐患位置</view>
						<textarea v-model="item.yhbw" placeholder="请输入隐患位置"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white" v-if="
						!item.Detail.every(foo => {
							return foo.isCheck == true;
						})
					">
					<view class="action">图片上传</view>
					<view class="action">{{ imgrow[index].url.length }}/4</view>
				</view>
				<view class="cu-form-group" v-if="
						!item.Detail.every(foo => {
							return foo.isCheck == true;
						})
					">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(photo, photoindex) in imgrow[index].url" :key="photoindex" @tap="ViewImage"
						 :data-url="imgrow[index].url[photoindex]" :data-index="index">
							<image :src="photo" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="photoindex" :data-chooes="index"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @click="ChooseImage(index)" v-if="imgrow[index].url.length < 4"><text class="cuIcon-cameraadd"></text></view>
					</view>
				</view>
			</view>
			<view id="safe" v-if="showimgList">
				<view class="cu-form-group align-start margin-top">
					<view class="title">检查记录</view>
					<textarea v-model="yhposition" placeholder="请输入检查记录"></textarea>
				</view>
				<view class="cu-bar bg-white margin-top">
					<view class="action">图片上传</view>
					<view class="action">{{ imgList.length }}/4</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImageSafe" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImgSafe" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @tap="ChooseImageSafe" v-if="imgList.length < 4"><text class="cuIcon-cameraadd"></text></view>
					</view>
				</view>
			</view>

			<view class="cu-form-group margin-top" style="padding: 0 40upx;min-height: 80upx;" v-if="!showimgList">
				<view class="title" style="min-height: 60upx;height: auto;">现场整改</view>
				<switch @change="SwitchB" :class="switchB ? 'checked' : ''" :checked="switchB?true:false"></switch>
			</view>
			<view class="padding flex flex-direction margin-top"><button class="cu-btn bg-red margin-tb-sm lg" @click="nextStep">提交</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'temHome',
		props: {
			msg: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			fromm: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				qrCode: '',
				qrCodeType: '',
				xgData: [],
				current: -1,
				chooseId: '',
				choosePlace: '',
				imgrow: [],
				lon: '',
				lat: '',
				commitTime: 0,
				uploadImgRow: [],
				laizi: '',
				isAllCheck: [],
				safeImgRow: [],
				imgList: [],
				showimgList: true,
				safePosition: '',
				yhposition: '',
				switchB: false
			};
		},
		methods: {
			//图片相关
			ChooseImageSafe() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: res => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths);
						} else {
							this.imgList = res.tempFilePaths;
						}
					}
				});
			},
			ViewImageSafe(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImgSafe(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除这张照片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1);
						}
					}
				});
			},
			ChooseImage(index) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: res => {
						console.log(res);
						this.imgrow[index].url.push(res.tempFilePaths[0]);
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgrow[e.currentTarget.dataset.index].url,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg2(e) {
				console.log(e);
				uni.showModal({
					title: '删除',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.safeImgRow.url.splice(e.currentTarget.dataset.index, 1);
						}
					}
				});
			},
			showModel(title) {
				uni.showModal({
					title: '提示',
					content: title,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {}
					}
				});
			},
			SwitchB(e) {
				this.switchB = e.detail.value;
				console.log(this.switchB)
			},
			SwitchA(e) {
				console.log(e);
				let Judge = [];
				for (let name of this.xgData) {
					if (name.Name == e.currentTarget.dataset.title) {
						if (!e.detail.value) {
							name.yhms = name.yhms + e.currentTarget.dataset.info.content + ',';
						} else {
							name.yhms = name.yhms.replace(e.currentTarget.dataset.info.content + ',', '');
						}
						for (let word of name.Detail) {
							if (word.content == e.currentTarget.dataset.info.content) {
								word.isCheck = e.detail.value;
							}
						}
					}
					for (let kid of name.Detail) {
						Judge.push(kid.isCheck);
					}
				}
				// console.log(this.xgData)
				if (
					Judge.every(item => {
						return item == true;
					})
				) {
					this.showimgList = true;
				} else {
					this.showimgList = false;
				}
			},
			getData() {
				var self = this;
				uni
					.request({
						url: self.$store.state.urlPrefix + '/School/Get_HD',
						data: {
							QRCode: self.qrCode,
							type: self.qrCodeType,
							RYXH: self.$store.state.userInfo.RYXH,
							isCheck: 'false'
						}
					})
					.then(data => {
						var [error, res] = data;

						if (res.data.code == 0) {
							self.xgData = res.data.data;
							self.choosePlace = self.xgData[0].placeNo;
							for (let cont of self.xgData) {
								cont.yhms = '';
								cont.yhbw = '';
								self.imgrow.push({
									name: cont.ID,
									url: []
								});
								if (cont.Detail[cont.Detail.length - 1] == ';') {
									cont.Detail = cont.Detail.substr(0, cont.Detail.length - 1);
								}
								let content = cont.Detail.split(';');
								cont.Detail = [];
								for (let word of content) {
									cont.Detail.push({
										isCheck: true,
										content: word
									});
								}
							}
							console.log(self.xgData);
							console.log(self.imgrow);
						} else {
							uni.showToast({
								title: '扫描失败',
								duration: 2000,
								icon: 'loading'
							});
						}
					});
			},
			nextStep() {
				uni.showLoading({
					title: "提交中。。。",
					mask: true
				})


				let judge = [];
				let DangerIndex = [];
				let postData = [];
				let checkBox = [];
				console.log(this.imgrow);
				//获取排查要点
				for (let levelOne of this.xgData) {
					if (levelOne.yhms.length > 0) {
						postData.push({
							HDID: levelOne.ID,
							CZWT: levelOne.yhms,
							place: levelOne.yhbw,
							position: this.yhposition
						});
					}
					//position原接口为检查记录
					for (let levelTwo of levelOne.Detail) {
						judge.push(levelTwo.isCheck);
					}
				}

				console.log(postData);

				//判断是否安全
				if (
					judge.every(item => {
						return item == true;
					})
				) {
					// this.showModel('请选择隐患！')
					// this.uploadSafeImg()
					if (this.imgList.length == 0) {
						uni.hideLoading()
						this.showModel('请选择照片！');
					} else {
						var len = this.imgList.length;
						this.uploadSafeImg(len);
					}
				} else {
					for (let i = 0; i < this.xgData.length; i++) {
						if (
							!this.xgData[i].Detail.every(item => {
								return item.isCheck == true;
							}) &&
							this.imgrow[i].url.length == 0
						) {
							uni.hideLoading()
							this.showModel('请完善隐患照片！');
							return;
						} else if (
							!this.xgData[i].Detail.every(item => {
								return item.isCheck == true;
							}) &&
							this.xgData[i].yhbw.length == 0
						) {
							uni.hideLoading()
							this.showModel('请完善隐患部位！');
							return;
						} else if (
							!this.xgData[i].Detail.every(item => {
								return item.isCheck == true;
							})
						) {
							//根据i的数量获取隐患的数量
							DangerIndex.push(i);
						}
					}
					var len = 0;
					for (let j = 0; j < DangerIndex.length; j++) {
						let imgNumber = this.imgrow[DangerIndex[j]].url.length;
						for (let zzy of this.imgrow[DangerIndex[j]].url) {
							this.uploadImgRow.push({
								id: this.imgrow[DangerIndex[j]].name,
								url: zzy
							});
						}
						len = len + imgNumber;
					}

					if (len > 0) {
						uni.showLoading({
							title: '提交中。。。',
							mask: true
						});
						this.uploadDangerImg(len, postData);
					}
				}


			},

			uploadDangerImg(len, postData) {
				var self = this;
				var postImgUrl = self.$store.state.urlPrefix + '/Process/Everyone_safe_images2';
				uni.uploadFile({
					url: postImgUrl,
					filePath: self.uploadImgRow[self.commitTime].url,
					name: 'image',
					formData: {
						RYXH: self.$store.state.userInfo.RYXH,
						HDID: self.uploadImgRow[self.commitTime].id
					},
					success(res) {
						self.commitTime = self.commitTime + 1;
						if (res.data == 'ok') {
							if (self.commitTime < len) {
								self.uploadDangerImg(len, postData);
							} else {

								if (self.switchB) {
									self.sceneReport(postData)
								} else {
									self.HYdangerCommit(postData);
								}

								self.commitTime = 0;
							}
						} else {
							uni.hideLoading();
							uni.showModal({
								title: '提示',
								content: '上报失败！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						}
					}
				});
			},
			uploadSafeImg(len) {
				var self = this;
				var postImgUrl = self.$store.state.urlPrefix + '/Process/Everyone_safe_images2';
				let hdid = '';

				uni.uploadFile({
					url: postImgUrl,
					filePath: self.imgList[self.commitTime],
					name: 'image',
					formData: {
						RYXH: self.$store.state.userInfo.RYXH,
						HDID: self.choosePlace
					},
					success(res) {
						self.commitTime = self.commitTime + 1;
						if (res.data == 'ok') {
							if (self.commitTime < len) {
								self.uploadSafeImg(len);
							} else {
								self.HYsafeCommit();

								self.commitTime = 0;
							}
						} else {
							uni.hideLoading();
							uni.showModal({
								title: '提示',
								content: '上报失败！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						}
					}
				});
			},
			//来自隐患上报

			HYdangerCommit(postData) {
				var self = this;
				var hdDetailData = [];
				let ddd = JSON.stringify(postData);
				uni
					.request({
						url: self.$store.state.urlPrefix + '/school/ScanQRCode_report',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							RYXH: self.$store.state.userInfo.RYXH,
							hdDetail: ddd,
							lat: self.lat,
							lon: self.lon,
							type: self.qrCodeType
						}
					})
					.then(data => {
						var [error, res] = data;
						uni.hideLoading();
						if (res.data.code == 0) {
							uni.showModal({
								title: '提示',
								content: '提交成功！',
								showCancel: false,
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						} else if (res.data.code == 1) {
							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '上传失败',
								showCancel: false,
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						}
					});
			},

			HYsafeCommit() {
				var self = this;
				uni
					.request({
						url: self.$store.state.urlPrefix + '/school/ScanQRCode_report_safe',
						data: {
							RYXH: self.$store.state.userInfo.RYXH,
							placeNo: self.choosePlace,
							position: self.yhposition,
							type: self.qrCodeType,
							place: ''
						}
					})
					.then(data => {
						var [error, res] = data;
						uni.hideLoading();
						if (res.data.code == 0) {
							uni.showModal({
								title: '提示',
								content: '提交成功！',
								showCancel: false,
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						} else if (res.data.code == 1) {
							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								confirmText: '确定',
								success: res => {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									});
								}
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '上传失败',
								showCancel: false,
								confirmText: '确定',
								success: res => {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									});
								}
							});
						}
					});
			},
			getPlace(id, type) {
				var self = this;
				uni
					.request({
						url: self.$store.state.urlPrefix + '/School/Get_PlaceWay',
						data: {
							QRCode: this.qrCode,
							type: this.qrCodeType
						}
					})
					.then(data => {
						var [error, res] = data;
						console.log(res);
						if (res.data.code == 0) {
							self.safePosition = res.data.data;
						}
					});
			},
			getLocation() {
				var self = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						self.lon = res.longitude;
						self.lat = res.latitude;
					}
				});
			},
			
			//现场整改
			sceneReport(postData) {
				console.log('postData')
				var self = this;
				var hdDetailData = [];
				let ddd = JSON.stringify(postData);
				uni
					.request({
						url: self.$store.state.urlPrefix + '/School/ScanQRCode_report_slef',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							type: self.qrCodeType,
							RYXH: self.$store.state.userInfo.RYXH,
							placeNo: self.choosePlace,
							hdDetail: ddd,
							lat: self.lat,
							lon: self.lon
						}
					})
					.then(data => {
						var [error, res] = data;
						uni.hideLoading();
						if (res.data.code == 0) {
							uni.showModal({
								title: '提示',
								content: '提交成功！',
								showCancel: false,
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						} else if (res.data.code == 1) {
							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '上传失败',
								showCancel: false,
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/basic/home/home'
										});
									}
								}
							});
						}
					});
			}
		},
		mounted() {
			this.qrCode = this._props.msg;
			this.qrCodeType = this._props.type;

			this.$emit('hideLoading', 0.1);

			this.getData();
			this.getLocation();
			this.getPlace();
		}
	};
</script>

<style></style>
