<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true"><block slot="backText">返回</block><block slot="content">整改复核</block></cu-custom>
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
				
				<view style="height: 600upx;">
					<view class="cu-form-group margin-top">
						<view class="title">是否通过：</view>
						<switch @change="SwitchC" :class="switchPass?'checked':''" :checked="switchPass?true:false"></switch>
					</view>
					<view class="cu-form-group" v-if="!switchPass">
						<view class="title">选择日期:</view>
						<picker mode="date" :value="date" :start="today" end="2030-09-01" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group align-start margin-top" v-if="!switchPass">
						<view class="title">请输入驳回理由：</view>
						<textarea  placeholder="请输入驳回理由" v-model="handlingOpinion" auto-height></textarea>
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
	import helper from "../../../common/helper.js";
	export default {
		data() {
			return {
				info: {},
				TabCur: 0,
				tabRow: ['隐患信息','隐患处理'],
				switchPass: true,
				date: '请选择截止日期',
				today: '',
				handlingOpinion: '',
				buttonInfo: {}
			}
		},
		methods: {
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
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			SwitchC(e) {
				this.switchPass = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			commit() {
				if (this.switchPass) {
					this.pass()
				} else {
					if (this.date == '请选择截止日期') {
						this.showMoadel('请选择截止日期')
					} else {
						this.unpass()
					}
					
				}
			},
			pass() {
				var self = this;
				uni.showLoading({
					title:'提交中。。。',
					mask:true
				})
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Handle9',
					data: {
						StepOrder: self.info.StepOrder,
						BranchId: self.info.BranchId,
						No: self.info.No,
						RYXH: self.$store.state.userInfo.RYXH,
						next_ReceiveType: self.buttonInfo.ReceiveType,
						next_StepOrder: self.buttonInfo.StepOrder,
						next_BranchId: self.buttonInfo.BranchId,
					},
				}).then(data => {
					var [error,res] = data;
					uni.hideLoading();
					if (res.data == 'ok') {
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
			unpass() {
				if (!this.handlingOpinion) {
					this.showMoadel('请输入驳回理由！')
				} else {
					var self = this;
					uni.showLoading({
						title:'提交中。。。',
						mask:true
					})
					uni.request({
						url: self.$store.state.urlPrefix + '/Process/Handle10',
						data: {
							StepOrder: self.info.StepOrder,
							ReceiveType: self.info.ReceiveType,
							No: self.info.No,
							BranchId: self.info.BranchId,
							RecordRemarks: self.handlingOpinion,
							RYXH: self.$store.state.userInfo.RYXH,
							JSSJ: self.date
						},
					}).then(data => {
						var [error,res] = data;
						uni.hideLoading();
						if (res.data == 'ok') {
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
				}
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
						
						self.buttonInfo = data[0];
					}
					
				})
			},
		},
		onLoad(option) {
			this.info = JSON.parse(option.info)
			console.log(this.info)
		},
		mounted() {
			
			// this.date = helper.now();
			this.today = helper.now();
			
			this.getButton();
		}
	}
</script>

<style>

</style>
