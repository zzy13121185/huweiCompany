<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">隐患复核</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center" style="position: fixed;z-index: 1111;">
			<view class="cu-item" :class="index == TabCur ? 'text-blue cur' : ''" v-for="(item, index) in tabRow" :key="index" @tap="tabSelect" :data-id="index" style="width: 50%;">
				{{ item }}
			</view>
		</scroll-view>

		<view style="position: relative;margin-top: 120upx;">
			<view v-show="TabCur == 0"><stepInfo :option="info"></stepInfo></view>

			<view v-show="TabCur == 1">
				<view class="cu-form-group margin-top">
					<view class="title">检查单位：</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{toast}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">请输入处理意见：</view>
					<textarea placeholder="请输入处理意见" v-model="handlingOpinion" auto-height></textarea>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">是否安全：</view>
					<switch @change="SwitchA" :class="switchIsSafe?'checked':''" :checked="switchIsSafe?true:false"></switch>
				</view> -->

				<view class="cu-form-group" v-if="!switchIsSafe">
					<view class="title">是否一般隐患：</view>
					<switch @change="SwitchB" :class="switchDangerLevel ? 'checked' : ''" :checked="switchDangerLevel ? true : false"></switch>
				</view>

				<view class="cu-form-group">
					<view class="title">是否上报上级：</view>
					<switch @change="SwitchC" :class="switchReport ? 'checked' : ''" :checked="switchReport ? true : false"></switch>
				</view>

				<view class="cu-form-group">
					<view class="title">选择日期:</view>
					<picker mode="date" :value="date" :start="today" end="2030-09-01" @change="DateChange">
						<view class="picker">{{ date }}</view>
					</picker>
				</view>

				<view class="padding flex flex-direction"><button class="cu-btn bg-red margin-tb-sm lg" @click="commit">提交</button></view>
			</view>
		</view>
	</view>
</template>

<script>
import helper from '../../../common/helper.js';
export default {
	data() {
		return {
			info: {},
			handlingOpinion: '',
			switchIsSafe: false,
			switchDangerLevel: false,
			switchReport: false,
			date: '请选择截止日期',
			today: '',
			TabCur: 0,
			tabRow: ['隐患信息', '隐患处理'],
			checkBox: [],
			btnArr: [],
			choosedPeople: [],
			buttonInfo: {},
			index: -1,
			picker: [
				
				],
			pickerID: [],
			pointsType: '',
			toast: '请选择检查单位',
		};
	},
	methods: {
		getFrom() {
			var self = this;
			uni.request({
				url: self.$store.state.urlPrefix + '/Home/Get_pointsType',
				data: {
					source: '隐患上报'
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
		showMoadel(title) {
			uni.showModal({
				title: '提示',
				content: title,
				showCancel: false,
				success: function(res) {
					if (res.confirm) {
					}
				}
			});
		},
		CheckboxChange(e) {
			var items = this.checkBox,
				values = e.detail.value;
			this.choosedPeople = values;
			// console.log(this.choosedPeople)
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
		},
		SwitchA(e) {
			this.switchIsSafe = e.detail.value;
		},
		SwitchB(e) {
			this.switchDangerLevel = e.detail.value;
		},
		SwitchC(e) {
			this.switchReport = e.detail.value;
		},
		DateChange(e) {
			this.date = e.detail.value;
		},

		getButton() {
			var self = this;
			uni
				.request({
					url: self.$store.state.urlPrefix + '/Process/Get_Handle',
					data: {
						StepOrder: self.info.StepOrder,
						BranchId: self.info.BranchId,
						No: self.info.No
					}
				})
				.then(data => {
					var [error, res] = data;
					if (res.data == '暂无数据') {
					} else {
						var data = JSON.parse(res.data);

						self.btnArr = data;
						console.log(data);
					}
				});
		},
		commit() {
			if (!this.handlingOpinion) {
				this.showMoadel('请输入处理意见！！');
			} else if (!this.pointsType) {
				this.showMoadel('请选择检查单位！！');
			} else if (this.date == '请选择截止日期') {
				this.showMoadel('请选择截止日期')
			}else {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				if (this.switchReport) {
					for (let foo of this.btnArr) {
						if (foo.ReceiveType == '上报') {
							this.buttonInfo = foo;
						}
					}
				} else {
					for (let foo of this.btnArr) {
						if (foo.ReceiveType == '不上报') {
							this.buttonInfo = foo;
						}
					}
				}

				this.dangerCommit();
			}
		},
		dangerCommit() {
			var self = this;
			let AQZK;
			if (self.switchDangerLevel) {
				AQZK = 2;
			} else {
				AQZK = 1;
			}
			let userids;
			userids = self.choosedPeople.join(',');
			uni
				.request({
					url: self.$store.state.urlPrefix + '/Process/Handle3',
					data: {
						RYXH: self.$store.state.userInfo.RYXH,
						BranchId: self.info.BranchId,
						StepOrder: self.info.StepOrder,
						next_ReceiveType: self.buttonInfo.ReceiveType,
						next_StepOrder: self.buttonInfo.StepOrder,
						No: self.info.No,
						next_BranchId: self.buttonInfo.BranchId,
						RecordRemarks: self.handlingOpinion,
						Endtime: self.date,
						AQZK: AQZK,
						pointsType: self.pointsType
					}
				})
				.then(data => {
					var [error, res] = data;
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
									});
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
									});
								}
							}
						});
					}
				});
		}
	},
	onLoad(option) {
		this.info = JSON.parse(option.info);
		console.log(this.info);
	},
	mounted() {
		// this.date = helper.now();
		this.today = helper.now();
		this.getFrom();
		this.getButton();
	}
};
</script>

<style></style>
