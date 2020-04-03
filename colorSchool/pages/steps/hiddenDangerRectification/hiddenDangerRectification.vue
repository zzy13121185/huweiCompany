<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true"><block slot="backText">返回</block><block slot="content">隐患整改</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center" style="position: fixed;z-index: 1111;">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabRow" :key="index" @tap="tabSelect" :data-id="index" style="width: 50%;">
				{{item}}
			</view>
		</scroll-view>
		
		<view style="position: relative;margin-top: 120upx;">
			<view v-show="TabCur == 0">
				<stepInfo :option="info"></stepInfo>
			</view>
			
			<view v-show="TabCur == 1">
				<view class="cu-form-group align-start margin-top">
					<view class="title">请输入整改回复：</view>
					<textarea  placeholder="请输入处理意见" v-model="handlingOpinion" auto-height></textarea>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				TabCur: 0,
				tabRow: ['隐患信息','隐患处理'],
				handlingOpinion: '',
				imgList: [],
				buttonInfo: {},
				commitTime: 0
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
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
			getButton() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_Handle',
					data: {
						StepOrder: self.info.StepOrder,
						BranchId: self.info.BranchId,
						No: self.info.No
					},
				}).then(data => {
					var [error,res] = data;
					if (res.data == "暂无数据") {
					
					} else {
						var data = JSON.parse(res.data)
						
						for (let s of data) {
							if (s.ReceiveType == '提交') {
								self.buttonInfo = s;
								console.log(self.buttonInfo)
							}
						}
					}
					
				})
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
			commit() {
				if (!this.handlingOpinion) {
					this.showMoadel('请输入整改回复!')
				} else if (this.imgList.length == 0) {
					this.showMoadel('请拍摄照片!')
				} else {
					var len = this.imgList.length;
					uni.showLoading({
						title:'提交中。。。',
						mask:true
					})
					this.uploadImg(len);
				}
			},
			uploadImg(len) {
				var self = this;
				var postImgUrl = self.$store.state.urlPrefix + '/Process/Handle_SavaImg2';
				uni.uploadFile({
					url: postImgUrl,
					filePath: self.imgList[self.commitTime],
					name: 'image',
					formData: {
						RYXH: self.$store.state.userInfo.RYXH,
						YSCD: self.info.YSCD,
						No: self.info.No
					},
				}).then(data => {
					let [error,res] = data;
					self.commitTime = self.commitTime + 1;
					if (res.data == 'ok') {
						if (self.commitTime<len) {
							self.uploadImg(len)
						} else {
							self.commitTime = 0;
							self.uploadWord();
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
				})
			},
			uploadWord() {
				var self = this;
				var postUrl = self.$store.state.urlPrefix + '/Process/Handle5';
				uni.request({
					url: postUrl,
					data: {
						YSCD: self.info.YSCD,
						BranchId: self.info.BranchId,
						RYXH: self.$store.state.userInfo.RYXH,
						StepOrder: self.info.StepOrder,
						next_ReceiveType: self.buttonInfo.ReceiveType,
						next_StepOrder: self.buttonInfo.StepOrder,
						No: self.info.No,
						next_BranchId: self.buttonInfo.BranchId,
						RecordRemarks: self.handlingOpinion
					},
				}).then(data => {
					var [error,res] = data;
					if (res.data == 'ok') {
						self.commitTime = 0;
						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: '提交成功！',
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
						self.commitTime = 0;
						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: '提交失败！',
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
				})
			},
		},
		onLoad(option) {
			this.info = JSON.parse(option.info)
			console.log(this.info)
		},
		mounted() {
			this.getButton()
		}
	}
</script>

<style>

</style>
