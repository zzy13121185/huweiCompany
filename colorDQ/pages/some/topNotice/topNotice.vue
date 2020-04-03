<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">上级整改通知</block></cu-custom>
		<!-- <view class="cu-form-group margin-top">
			<view class="title">通知来源：</view>
			<input placeholder="请选择通知来源" name="input" v-model="noticeFrom" style="font-size: 14px;"></input>
			<button class='cu-btn bg-green shadow' @click="chooseFrom">选择</button>
		</view> -->
		
		<view class="cu-form-group margin-top">
			<view class="title">通知来源：</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{toast}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">截止日期:</view>
			<picker mode="date" :value="date" :start="now" end="2030-09-01" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="steptitle">请选择隐患：</view>
			<view class="content stepFlex">
				{{dangerRoad}}
			</view>
		</view>
		<scroll-view style="height: auto" scroll-y class="cu-form-group">
			<view v-if="!showDangerCheckBox">
				<view class="cu-list menu text-left solid-top" v-for="(item,index) in dangerInfoRow" :key="index" @click="getNext(item)" style="margin-top: 0px;">
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
		<view class="padding flex flex-direction" style="width: 750upx;float: right;">
			<button class="cu-btn bg-orange" @click="reset"><text class="cuIcon-refresh"></text>重新选择</button>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">隐患位置：</view>
			<input placeholder="请输入隐患所在部位" name="input" v-model="place"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">隐患描述：</view>
			<input placeholder="请输入隐患描述" name="input" v-model="dec"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">整改要求：</view>
			<input placeholder="请输入隐患整改要求" name="input" v-model="yaoqiu"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">处理意见：</view>
			<input placeholder="请输入处理意见" name="input" v-model="proposal"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">是否上报领导</view>
			<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#e54d42"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">是否一般隐患</view>
			<switch class='red' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false" color="#e54d42"></switch>
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
		<view class="padding flex flex-direction" style="margin-bottom: 60upx;">
			<button class="cu-btn bg-blue lg" @click="commit"><text class="cuIcon-upload"></text>提交</button>
		</view>
	</view>
</template>

<script>
	import helper from "../../../common/helper.js";
	export default {
		data() {
			return {
				index: -1,
				picker: [
					
					],
				pickerID: [],
				pointsType: '',
				toast: '请选择通知来源',
				dangerRoad: '',
				noticeFrom: '',
				date: '请选择整改截止日期',
				now: '',
				originalData: [],
				dangerInfoRow: [],
				showDangerCheckBox: false,
				choose: '',
				current: -1,
				dangerCheckBox: [],
				place: '',
				dec: '',
				yaoqiu: '',
				switchB: false,
				switchC: false,
				imgList: [],
				commitTime: 0
			}
		},
		methods: {
			PickerChange(e) {
				console.log(e)
				this.index = e.detail.value;
				this.toast = this.picker[this.index];
				for (let s of this.pickerID) {
					if (this.toast == s.deptName) {
						this.pointsType = s.pointsType
					}
				}
				console.log(this.pointsType)
			},
			getFrom() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_pointsType',
					data: {
						source: '上级通知'
					}
				}).then(data => {
					var [error,res] = data;
					console.log(res.data);
					if (res.data.code == 0) {
						self.pickerID = res.data.data;
						for (let s of self.pickerID) {
							self.picker.push(s.deptName)
						}
					}
				})
			},
			chooseFrom() {
				
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
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
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
			SwitchB(e) {
				this.switchB = e.detail.value
				console.log(this.switchB)
			},
			SwitchC(e) {
				this.switchC = e.detail.value
				console.log(this.switchC)
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			reset() {
				this.dangerInfoRow = this.originalData;
				this.dangerCheckBox = [];
				this.showDangerCheckBox = false;
				this.dangerRoad = '';
				this.choose = '';
				this.current = -1;
			},
			getInfo() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_AllBZ2',
					data: {
						DWCD: self.$store.state.userInfo.DWCD,
						// RYXH: self.$store.state.userInfo.RYXH
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
				// this.getPCYD(evt.target.value)
				for (let i = 0; i < this.dangerCheckBox.length; i++) {
					if (this.dangerCheckBox[i].YSCD === evt.target.value) {
						this.current = i;
						this.choose = evt.target.value;
						this.dangerRoad = this.dangerRoad + '->'+this.dangerCheckBox[i].YSMC
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
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Choose_YS3',
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
							self.dangerRoad = self.dangerRoad + item.XZMC + '->';
						} else {
							self.dangerCheckBox = data;
							self.dangerRoad = self.dangerRoad + item.XZMC;
							self.showDangerCheckBox = true;
						}
						uni.hideLoading()
					}
				});
			},
			commit() {
				console.log('commit')
				var self = this;
				var len = self.imgList.length;
				if (!self.place||!self.dec||!self.proposal||!self.yaoqiu||!self.pointsType) {
					self.showMoadel('请完善隐患信息！');
				} else if (this.date == '请选择整改截止日期') {
					self.showMoadel('请选择整改截止日期!')
				}else if (!self.choose) {
					self.showMoadel('请选择隐患!');
				} else if (self.imgList.length == 0){
					self.showMoadel('请选择隐患照片!');
				} else {
					uni.showLoading({
						title:'提交中。。。',
						mask: true
					})
					self.uploadimg(len)
				}
			},
			uploadimg(len) {
				var self = this;
				var postImgUrl = self.$store.state.urlPrefix + '/Process/Everyone_Sava_images2';
				uni.uploadFile({
					url: postImgUrl,
					filePath: self.imgList[self.commitTime],
					name: 'image',
					formData: {
						RYXH: self.$store.state.userInfo.RYXH,
						YSCD: self.choose,
					},
					success(uploadFileRes) {
						self.commitTime = self.commitTime + 1;
						if (uploadFileRes.data == 'ok') {
							if (self.commitTime<len) {
								self.uploadimg(len)
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
											url: '/pages/basic/home/home'
										})
									}
								}
							});
							
						}
					},
					
				})
			},
			commitSafeWord() {
				var self = this;
					let grade;
					if (self.switchC) {
						grade = 2
					} else {
						grade = 1
					}
					uni.request({
						url: self.$store.state.urlPrefix + '/Home/Add_AbarbeitungInform',
						data: {
							
							EndTime: self.date,
							RYXH: self.$store.state.userInfo.RYXH,
							YSCD: self.choose,
							place: self.place,
							describe: self.dec,
							require: self.yaoqiu,
							opinion: self.proposal,
							isReport: self.switchB,
							grade: grade,
							pointsType: self.pointsType
						},
						method: 'GET',
						header: {
							'content-type': 'application/json' // 默认值
						},
						success(res) {
							uni.hideLoading()
							if (res.data.code == 0){
								uni.showModal({
								    title: '提示',
								    content: '提交成功',
										showCancel: false,
								    success: function (res) {
								        if (res.confirm) {
								            uni.reLaunch({
															url: '/pages/basic/home/home'
														})
								        }
								    }
								});
							} else {
								uni.showModal({
								    title: '提示',
								    content: '提交失败',
										showCancel: false,
								    success: function (res) {
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
				}
		},
		mounted() {
			this.now = helper.now();
			// this.date = this.now;
			this.getInfo();
			this.getFrom();
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
	width: 220upx;
}
.stepFlex{
	flex: 1;
}
</style>
