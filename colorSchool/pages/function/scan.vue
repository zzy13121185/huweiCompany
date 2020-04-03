<template>
	<view>
		<view v-if="qrCodeType == 'XF'" style="margin-bottom: 200upx;">
			<view v-for="(item,index) in xfData" :key="index">
				<view class="cu-form-group margin-top">
						<view class="title">{{item.Name}}</view>
				</view>
				<view class="cu-form-group" v-for="(site, siteindex) in item.Detail" :key="siteindex" style="padding: 0 40upx;min-height: 80upx;">
						<view class="title" style="min-height: 60upx;height: auto;">{{site.content}}</view>
						<switch @change="SwitchA" :class="switchA?'checked':''" :checked="site.isCheck" :data-info="site" :data-title="item.Name"></switch>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgrow.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(photo,photoindex) in imgrow" :key="photoindex" @tap="ViewImage" :data-url="imgrow[photoindex]">
					 <image :src="photo" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="photoindex">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @click="ChooseImage" v-if="imgrow.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group align-start margin-top">
				<view class="title">检查记录</view>
				<textarea v-model="position" placeholder="请输入检查记录"></textarea>
			</view>
			<view v-if="showlist">
				<view class="cu-form-group margin-top">
					<view class="title">详细位置：</view>
					<input placeholder="请输入详细位置" name="input" v-model="place"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">隐患描述：</view>
					<textarea v-model="dec" placeholder="请输入隐患描述"></textarea>
				</view>
			</view>
			<view class="cu-form-group margin-top" style="padding: 0 40upx;min-height: 80upx;" v-if="showlist">
				<view class="title" style="min-height: 60upx;height: auto;">现场整改</view>
				<switch @change="SwitchB" :class="switchB ? 'checked' : ''" :checked="switchB?true:false"></switch>
			</view>
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="commitXf">提交</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: 'temHome',
		props:{
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
				qrCodeType:'',
				laizi:'',
				xfData: [],
				imgrow: [],
				xgData: [],
				HYid: '',
				placeNo: '',
				lon: '',
				lat: '',
				commitTime: 0,
				isDanger: true,
				dec: '',
				position: '',
				place: '',
				showlist: false,
				switchB: false
			};
		},
		onLoad() {
			
		},
		mounted() {
			this.qrCode = this._props.msg;
			this.qrCodeType = this._props.type;
			this.laizi = this._props.fromm;
			this.getData();
			this.$emit('hideLoading',0.1);
			this.getLocation()
			console.log(this.laizi)
		},
		methods:{
			sceneRepot() {
				var self = this;
				var hdDetailData = [];
				hdDetailData.push({
					HDID: self.HYid,
					CZWT: self.dec,
					position: self.position,
					place: self.place
				})
				hdDetailData = JSON.stringify(hdDetailData)
				uni.request({
					url: self.$store.state.urlPrefix + '/School/Everyone_reports_self_Check',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						type: self.qrCodeType,
						RYXH: self.$store.state.userInfo.RYXH,
						placeNo: self.placeNo,
						hdDetail: hdDetailData,
						lat: self.lat,
						lon: self.lon
					},
				}).then(data => {
					var [error, res] = data;
					uni.hideLoading()
					if (res.data.code == 0) {
						uni.showModal({
							title: '提示',
							content: '提交成功！',
							showCancel:false,
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									})
								}
							}
						})
					} else if (res.data.code == 1){
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel:false,
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									})
								}
							}
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '上传失败',
							showCancel:false,
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									})
								}
							}
						})
					}
				})
			},
			SwitchB(e) {
				this.switchB = e.detail.value;
				console.log(this.switchB)
			},
			SwitchA(e) {
				
				let Judge = [];
				for (let name of this.xfData) {
					
					if (name.Name == e.currentTarget.dataset.title) {
						for (let word of name.Detail) {
							if (word.content == e.currentTarget.dataset.info.content) {
								word.isCheck = e.detail.value;
								if (!e.detail.value) {
									this.dec = this.dec + e.currentTarget.dataset.info.content + ',';
								} else {
									this.dec = this.dec.replace(e.currentTarget.dataset.info.content + ',', '');
								}
								 
							}
						}
					}
					
					for (let kid of name.Detail) {
						Judge.push(kid.isCheck);
					}
				}
				console.log(Judge)
				if (
					Judge.every(item => {
						return item == true;
					})
				) {
					this.showlist = false;
				} else {
					this.showlist = true;
				}
				console.log(this.xfData)
			},
			showModel(title) {
				uni.showModal({
				    title: '提示',
				    content: title,
						showCancel: false,
				    success: function (res) {
				        if (res.confirm) {
				            
				        }
				    }
				});
			},
			getData() {
				var self = this;
				console.log(self.fromm)
				let isCheck;
				if (self.fromm == '隐患上报') {
					isCheck = 'false'
				} else {
					isCheck = 'true'
				}
				uni.request({
					url: self.$store.state.urlPrefix + '/School/Get_HD',
					data: {
						QRCode: self.qrCode,
						type: self.qrCodeType,
						RYXH: self.$store.state.userInfo.RYXH,
						isCheck: isCheck
					},
				}).then(data => {
					// console.log(data)
					var [error, res] = data;
					console.log(res.data)
					if (res.data.code == 0) {
						if (self.qrCodeType == 'XF') {
							self.xfData = res.data.data[0].Detail;
							self.HYid = res.data.data[0].ID;
							self.placeNo = res.data.data[0].placeNo;
							console.log(self.xfData)
							for (let s of self.xfData) {
								if (s.Detail[s.Detail.length-1] == ';') {
									s.Detail = s.Detail.substr(0,s.Detail.length-1);
								}
								let word = s.Detail.split(";");
								s.Detail = [];
								for (let cont of word) {
									s.Detail.push({
										isCheck: true,
										content: cont
									})
								}
							}
							
						}
					} else if (res.data.code == 1){
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
					}
				})
			},
			
			
			//图片相关
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						console.log(res)
						this.imgrow.push(res.tempFilePaths[0])
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgrow,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				console.log(e)
				uni.showModal({
					title: '删除',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgrow.splice(e.currentTarget.dataset.index, 1)
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
			commitXf() {
				
				var len = this.imgrow.length;
				let pcyd = [];
				for (let site of this.xfData) {
					for (let foo of site.Detail) {
						if (foo.isCheck == false) {
							pcyd.push({
								content: foo.content,
								title: site.Name
							})
						}
					}
				}
				
				let pcydWord = '';
				for (let s of pcyd) {
					pcydWord = pcydWord + `${s.title}:${s.content}.`
				}
				console.log(pcydWord);
				if (!pcydWord) {
					this.isDanger = false;
				} else {
					this.isDanger = true;
				}
				if (this.imgrow.length == 0) {
					this.showModel('请拍摄照片！')
				} else if (!this.place && this.isDanger) {
					this.showModel('请输入详细位置！')
				} else {
					uni.showLoading({
						title:'提交中。。。',
						mask:true
					})
					this.dec = pcydWord
					
					this.uploadSafeImg(len);
				}
				
				
			},
			//来源为  消防检查提交
			safeCommit() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/School/ScanQRCode_Check_Safe',
					data: {
						type: self.qrCodeType,
						RYXH: self.$store.state.userInfo.RYXH,
						placeNo: self.placeNo
					},
				}).then(data => {
					var [error, res] = data;
					uni.hideLoading()
					if (res.data.code == 0) {
						uni.showModal({
							title: '提示',
							content: '提交成功！',
							showCancel:false,
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									})
								}
							}
						})
					} else if (res.data.code == 1){
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel:false,
							confirmText: '确定',
							success: res => {
								uni.reLaunch({
									url: '/pages/basic/home/home'
								})
							}
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '上传失败',
							showCancel:false,
							confirmText: '确定',
							success: res => {
								uni.reLaunch({
									url: '/pages/basic/home/home'
								})
							}
						})
					}
				})
			},
			dangerCommit() {
				var self = this;
				var hdDetailData = [];
				hdDetailData.push({
					HDID: self.HYid,
					CZWT: self.dec,
					position: self.position,
					place: self.place
				})
				hdDetailData = JSON.stringify(hdDetailData)
				uni.request({
					url: self.$store.state.urlPrefix + '/School/ScanQRCode_Check_Danger',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						type: self.qrCodeType,
						RYXH: self.$store.state.userInfo.RYXH,
						placeNo: self.placeNo,
						hdDetail: hdDetailData,
						lat: self.lat,
						lon: self.lon
					},
				}).then(data => {
					var [error, res] = data;
					uni.hideLoading()
					if (res.data.code == 0) {
						uni.showModal({
							title: '提示',
							content: '提交成功！',
							showCancel:false,
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									})
								}
							}
						})
					} else if (res.data.code == 1){
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel:false,
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									})
								}
							}
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '上传失败',
							showCancel:false,
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/basic/home/home'
									})
								}
							}
						})
					}
				})
			},
			
			uploadSafeImg(len) {
				var self = this;
				var postImgUrl = self.$store.state.urlPrefix + '/Process/Everyone_safe_images2';
				uni.uploadFile({
					url: postImgUrl,
					filePath: self.imgrow[self.commitTime],
					name: 'image',
					formData: {
						RYXH: self.$store.state.userInfo.RYXH,
						HDID: self.HYid,
					},
					success(res) {
						self.commitTime = self.commitTime + 1;
						if (res.data == 'ok') {
							if (self.commitTime<len) {
								self.uploadSafeImg(len)
							} else {
								//commit words
								self.commitTime = 0;
								if (self.isDanger) {
									if (self.switchB) {
										self.sceneRepot()
									} else {
										self.dangerCommit()
									}
								} else {
									self.safeCommit()
								}
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
											url: '/pages/basic/home/home'
										})
									}
								}
							});
						}
					}
				})
			},
			}
	}
</script>

<style>
.detail-des{
	width: 100%;
	min-height: 120upx;
	line-height: 1.5;
	padding: 20upx 0;
	text-align: left;
	height: auto;
	
}
</style>
