<template>
	<view id='yhsb'>
		<view class="cu-form-group align-start">
			<view class="title">隐患名称:</view>
			<textarea  :value="name" auto-height/>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">排查要点:</view>
			<textarea auto-height :value="pcyd"/>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">检查记录:</view>
			<textarea auto-height placeholder="请输入检查记录"  @input="textareaBInput"/>
		</view>
		<view class="cu-form-group" id="sss">
			<view class="title">隐患类型:</view>
			<switch class='switch-sex red sss-switch-sex' @change="changeType" :class="isDanger?'checked':''" :checked="isDanger?true:false" color="#e54d42" style="font-size: 20upx;"></switch>
		</view>
		<view class="cu-form-group align-start" v-if="isDanger">
			<view class="title">隐患部位:</view>
			<textarea auto-height placeholder="请输入隐患部位"  @input="textareaCInput"/>
		</view>
		<view class="cu-form-group align-start" v-if="isDanger">
			<view class="title">隐患描述:</view>
			<textarea auto-height placeholder="请输入隐患描述"  @input="textareaDInput" v-model="dec"/>
			<button class="bg-green shadow cu-btn round" style="margin-top: 15upx;" @click="changeDec">获取描述</button>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
				 <image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @click="commit">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			yscd: {
				type: String,
				default: 'yscd'
			},
			name: {
				type: String,
				default: 'name'
			},
			firstLevelId: {
				type: String,
				default: 'firstLevelId'
			},
		},
		data() {
			return{
				// yscd: '',
				pcyd: '',
				disabled: true,
				// name: '',
				description: '',
				isDanger: true,
				place: '',
				dec: '',
				desRow: [],
				imgList: [],
				lon: '',
				lat: '',
				commitTime: 0,
				// firstLevelId: '',
			}
		},
		methods:{
			changeDec() {
				var self = this;
				uni.showActionSheet({
					itemList: self.desRow,
					success: function(res) {
						self.dec = self.desRow[res.tapIndex]
					},
					fail: function(res) {
					}
				});
			},
			changeType(e) {
				this.isDanger = e.detail.value
			},
			textareaBInput(e) {
				this.description = e.detail.value
			},
			textareaCInput(e) {
				this.place = e.detail.value
			},
			textareaDInput(e) {
				this.dec = e.detail.value
			},
			getPCYD() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_PCYD',
					method: 'GET',
					data: {
						YSCD: self.yscd
					},
					header: {
						'custom-header': 'application/json'
					},
					success: (res) => {;
						self.pcyd = res.data;
						console.log(self.pcyd)
					}
				});
			},
			getDescription() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_BZ',
					method: 'GET',
					data: {
						YSCD: self.yscd
					},
					header: {
						'custom-header': 'application/json'
					},
					success: (res) => {
						var data = res.data;
						data = JSON.parse(data);
						for (let s of data) {
							self.desRow.push(s.CZWT)
						}
					}
				});
			},
			
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这张照片？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
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
			commit() {
				console.log(this.isDanger)
				if (this.isDanger) {
					this.dangerCommit()
				} else {
					this.safeCommit()
				}
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
			dangerCommit() {
				var self = this;
				var len = self.imgList.length;
				if (self.imgList.length == 0) {
					self.showMoadel('请完善隐患信息！');
				} else if (self.description == '' || self.dec== '' || self.place == '') {
					self.showMoadel('请完善隐患信息！');
				} else {
					uni.showLoading({
						title: '提交中。。。',
						mask:true
					});
					self.uploadDangerImg(len)
				}
			},
			safeCommit() {
				var self = this;
				var len = self.imgList.length;
				console.log(self.imgList)
				if (!this.description) {
					self.showMoadel('请输入检查记录')
				} else if (self.imgList.length == 0) {
					self.showMoadel('请拍摄照片！')
				} else {
					uni.showLoading({
						title: '提交中。。。',
						mask:true
					});
					self.uploadSafeImg(len)
				}
			},
			uploadSafeImg(len) {
				var self = this;
				setTimeout(() => {
					uni.hideLoading()
				},15000)
				var postImgUrl = self.$store.state.urlPrefix + '/Process/Everyone_safe_images2';
				uni.uploadFile({
					url: postImgUrl,
					filePath: self.imgList[self.commitTime],
					name: 'image',
					formData: {
						RYXH: self.$store.state.userInfo.RYXH,
						HDID: self.yscd,
					},
					success(res) {
						self.commitTime = self.commitTime + 1;
						if (res.data == 'ok') {
							if (self.commitTime<len) {
								self.uploadSafeImg(len)
							} else {
								//commit words
								self.commitTime = 0;
								self.commitSafeWord()
							}
						} else {
							self.commitTime = 0;
							uni.hideLoading();
							uni.showModal({
								title: '提示',
								content: '上报失败！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../../basic/home/home'
										})
									}
								}
							});
						}
					}
				})
			},
			commitSafeWord() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Everyone_safe2',
					data: {
						DWCD: self.$store.state.userInfo.DWCD,
						RYXH: self.$store.state.userInfo.RYXH,
						YSCD: self.yscd,
						position: self.description,
						lon: self.lon,
						lat: self.lat
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						uni.hideLoading();
						if (res.data == 'ok') {
							uni.showModal({
								title: '提示',
								content: '上报成功！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../../basic/home/home'
										})
									}
								}
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '上报失败！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../../basic/home/home'
										})
									}
								}
							});
						}
					}
				})
			},
			
			
			//危险提交
			uploadDangerImg(len) {
				var self = this;
				var postImgUrl = self.$store.state.urlPrefix + '/Process/Everyone_Sava_images2';
				uni.uploadFile({
					url: postImgUrl,
					filePath: self.imgList[self.commitTime],
					name: 'image',
					formData: {
						RYXH: self.$store.state.userInfo.RYXH,
						YSCD: self.yscd,
					},
					success(res) {
						self.commitTime = self.commitTime + 1;
						if (res.data == 'ok') {
							if (self.commitTime<len) {
								self.uploadDangerImg(len)
							} else {
								//commit words
								self.commitTime = 0;
								self.commitDangerWord()
							}
						} else {
							self.commitTime = 0;
							uni.hideLoading();
							uni.showModal({
								title: '提示',
								content: '上报失败！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../../basic/home/home'
										})
									}
								}
							});
							
						}
						
					}
				})
			},
			
			commitDangerWord() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Everyone_reports2',
					data: {
						DWCD: self.$store.state.userInfo.DWCD,
						RYXH: self.$store.state.userInfo.RYXH,
						YSCD: self.yscd,
						CZWT: self.dec,
						position: self.description,
						lon: self.lon,
						lat: self.lat,
						place: self.place,
						XZCD: self.firstLevelId
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						uni.hideLoading()
						var data = res.data
						console.log(data)
						if (data.code == 0) { 
							if (data.data) {
								var navigatorId = data.data[0].BranchId;
								var item = data.data[0];
								console.log(item);
								let info = JSON.stringify(item)
								navigatorId = navigatorId.split('-');
								navigatorId = navigatorId[navigatorId.length - 1];
								uni.showModal({
								    title: '提示',
								    content: '是否前往隐患复核页面？',
								    success: function (res) {
								        if (res.confirm) {
													console.log('confirm')
								            uni.navigateTo({
								            	url: '/pages/steps/dangerReview/dangerReview?info='+ info
								            })
								        } else if (res.cancel) {
								            uni.reLaunch({
								            	url: '../../basic/home/home'
								            })
								        }
								    }
								});
							} else {
								uni.showModal({
									title: '提示',
									content: '上报成功！',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.reLaunch({
												url: '../../basic/home/home'
											})
										}
									}
								});
							}
						} else {
							uni.showModal({
								title: '提示',
								content: '上报失败！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '../../basic/home/home'
										})
									}
								}
							});
						}
					}
				})
			},
		},
		mounted() {
			console.log(this._props)
			this.getLocation()
			this.getPCYD();
			this.getDescription()
		}
	}
</script>

<style>
	.sss-switch-sex::after {
		content: "隐患";
		font-size: 20upx;
	}
	
	.sss-switch-sex::before {
		content: "安全";
		font-size: 20upx;
	}
</style>
