<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true"><block slot="backText">返回</block><block slot="content">科长处理</block></cu-custom>
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
					
					<view class="cu-form-group align-start margin-top" v-if="!switchPass">
						<view class="title">请输入处理意见：</view>
						<textarea  placeholder="请输入处理意见" v-model="handlingOpinion" auto-height></textarea>
					</view>
					<view class="cu-form-group">
						<view class="title">选择日期:</view>
						<picker mode="date" :value="date" :start="today" end="2030-09-01" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">是否上报上级：</view>
						<switch @change="SwitchC" :class="switchReport?'checked':''" :checked="switchReport?true:false"></switch>
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
				handlingOpinion: '',
				date: '请选择截止日期',
				today: '',
				switchReport: false,
				btnArr: []
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
			DateChange(e) {
				this.date = e.detail.value
			},
			SwitchC(e) {
				this.switchReport = e.detail.value
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
						
						self.btnArr = data;
						console.log(data);
					}
					
				})
			},
			commit() {
				if (!this.handlingOpinion) {
					this.showMoadel('请输入处理意见！')
				} else if (this.date == '请选择截止日期') {
					this.showMoadel("请选择截止日期")
				}else {
					uni.showLoading({
						title:'加载中',
						mask: true
					})
					let foo = {}
					if (this.switchReport) {
						for (let s of this.btnArr) {
							if (s.ReceiveType == '上报') {
								foo = s;
							}
						}
					} else {
						for (let s of this.btnArr) {
							if (s.ReceiveType == '不上报') {
								foo = s;
							}
						}
					}
					
					this.dangerCommit(foo)
					
					
				}
			},
			
			dangerCommit(foo) {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Handle11',
					data: {
						YSCD: self.info.YSCD,
						BranchId: self.info.BranchId,
						RYXH: self.$store.state.userInfo.RYXH,
						StepOrder: self.info.StepOrder,
						next_ReceiveType: foo.ReceiveType,
						next_StepOrder: foo.StepOrder,
						No: self.info.No,
						next_BranchId: foo.BranchId,
						RecordRemarks: self.handlingOpinion,
						Endtime: self.date
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
