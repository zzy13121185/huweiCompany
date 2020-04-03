<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">校园巡更</block>
		</cu-custom>
		<view style="display: flex;flex-direction: column;width: 100%;height: 100vh;" id="row">

			<view class="cu-form-group">
				<button class="cu-btn" @click="ChooseDay(1)" :class="{ SafeActive: day.now }">当前</button>
				<button class="cu-btn" @click="ChooseDay(2)" :class="{ SafeActive: day.today }">今天</button>
				<button class="cu-btn" @click="ChooseDay(3)" :class="{ SafeActive: day.yestoday }">昨天</button>
			</view>
			<view class="cu-form-group" style="border-top: 1upx solid #eee" v-if="day.now">
				<view class="steptitle">时间：</view>
				<view class="content stepFlex">{{ start }}--{{ end }}</view>
			</view>
			<view class="cu-form-group" v-if="!day.now">
				<view class="title">选择轮次</view>
				<picker @change="PickerChange" :value="index" :range="Rotation"><view class="picker">{{index>-1?Rotation[index]:'请选择轮次'}}</view></picker>
			</view>
			<view class="cu-form-group-state">
				<view class="state-child">
					<text class="cuIcon-title text-olive"></text>
					已检查：{{ checked }}
				</view>
				<view class="state-child">
					<text class="cuIcon-title text-red"></text>
					未检查：{{ wait }}
				</view>
			</view>
			<view style="flex: 1;overflow: scroll;">
				<view class="cu-timeline margin-top">
					<view class="cu-item cur" v-for="(item, index) in dataRow" :key="index" @click="showDetail" :data-info="item">
						<view class="content shadow-blur bg-green" v-if="item.isSafe == 'True' && item.isCheck == 'True'">
							<text>{{ item.CheckTime }}</text>
							{{ item.PlaceName }}(安全)
						</view>
						<view class="content shadow-blur bg-red" v-if="item.isSafe != 'True' && item.isCheck == 'True'">
							<text>{{ item.CheckTime }}</text>
							&nbsp;&nbsp;{{ item.PlaceName }}(存在隐患)
						</view>
						<view class="content shadow-blur bg-orange" v-if="item.isCheck == 'False'">
							<text>{{ item.CheckTime }}</text>
							&nbsp;&nbsp;{{ item.PlaceName }}(暂未检查)
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import now from '../../../getTime.js';
export default {
	data() {
		return {
			index: -1,
			picker: ['丁桥校区', '翠苑校区'],
			idRow: ['S000099100001', 'S000099100002'],
			schoolId: 'S000099100001',
			dataRow: [],
			modalName: null,
			modalContent: '',
			yhname: '',
			start: '',
			end: '',
			now: '',
			isCurrent: false,
			checked: 0,

			wait: 0,

			day: {
				now: true,
				today: false,
				yestoday: false
			},
			Rotation: [],
			today: '',
			yestoday: '',
			choosedRotation: '',
			endTime: ''
		};
	},
	methods: {
		ChooseDay(num) {
			if (num == 1) {
				this.day.now = true;
				this.day.today = this.day.yestoday = false;
				this.dataRow = [];
				this.Rotation = [];
				this.index = -1;
				this.checked = this.wait = 0;
				this.endTime = '';
				this.getData();
			} else if (num == 2) {
				this.day.today = true;
				this.day.now = this.day.yestoday = false;
				//获取今天数据
				this.dataRow = [];
				this.Rotation = [];
				this.index = -1;
				this.checked = this.wait = 0;
				this.endTime = '';
				this.PickerChangeItem(2)
			} else {
				this.day.yestoday = true;
				this.day.now = this.day.today = false;
				this.dataRow = [];
				this.Rotation = [];
				this.index = -1;
				this.checked = this.wait = 0;
				this.endTime = '';
				//获取昨天数据
				this.PickerChangeItem(3)
			}
		},
		showModel(title) {
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
		PickerChange(e) {
			this.index = e.detail.value;
			this.choosedRotation = this.Rotation[e.detail.value];
			console.log(this.choosedRotation);
			this.endTime = this.Rotation[e.detail.value];
			if (this.Rotation[this.index]) {
				this.getDataByDay();
			}
		},
		getData() {
			uni.showLoading({
				title: '查询中。。。',
				mask: true
			});
			var self = this;
			self.dataRow = [];
			uni
				.request({
					url: self.$store.state.urlPrefix + '/School/Query_Cur_Check',
					data: {
						placeNo: self.schoolId,
						type: 'XG'
					}
				})
				.then(data => {
					var [error, res] = data;
					uni.hideLoading();
					if (res.data.code == 0) {
						var foo = res.data.data.detail;
						for (let site of foo) {
							// if (site.CheckTime != '') {
							// 	self.dataRow.push(site)
							// }
							self.dataRow.push(site);
							self.start = res.data.data.startTime;
							self.end = res.data.data.endTime || '未结束';
			
							self.isCurrent = res.data.data.isCurrent;
							self.wait = res.data.data.wait || 0;
							self.checked = res.data.data.checked || 0;
						}
					} else {
						self.showModel('查询失败！');
					}
				});
		},
		showDetail(e) {
			console.log(e);
			if (e.currentTarget.dataset.info.isSafe == 'True' && e.currentTarget.dataset.info.isCheck == 'True') {
				// this.showModel('此处不存在隐患!')
				uni.navigateTo({
					url: 'SCdetail/SCdetail?placeNo=' + e.currentTarget.dataset.info.placeNo + '&time=' + this.endTime
				});
			} else if (e.currentTarget.dataset.info.isCheck == 'False') {
				this.showModel('该地点暂未检查！');
			} else if (e.currentTarget.dataset.info.isSafe == 'False' && e.currentTarget.dataset.info.isCheck == 'True') {
				uni.navigateTo({
					url: 'SCdetail/SCdetail?placeNo=' + e.currentTarget.dataset.info.placeNo + '&time=' + this.endTime
				});
			}
		},
		hideModal(e) {
			this.modalName = null;
		},
		PickerChangeItem(num) {
			var time;
			if (num == 2) {
				time = this.today
			} else {
				time = this.yestoday
			}
			// /Web/Get_query_round_xg?campusplaceNo=S000099100001&type=XG&time=' + time
			uni.showLoading({
				title: '查询中。。。',
				mask: true
			});
			var self = this;
			uni.request({
				url: self.$store.state.urlPrefix + '/Web/Get_query_round_xg',
				data: {
					campusplaceNo: self.schoolId,
					type: 'XG',
					time: time
				}
			}).then(data => {
				var [error, res] = data;
				uni.hideLoading();
				if (res.data.code == 0) {
					var info = res.data.data;
					if (info.length > 0) {
						for (let s of info) {
							this.Rotation.push(s.startTime+ '-' + s.endTime);
							this.wait = this.wait + s.overdue;
							this.checked = this.checked + s.finish
						}
					} else {
						self.showModel('该天没有记录')
					}
					
				} else {
					self.showModel('查询失败')
				}
			})
		},
		getDataByDay() {
			uni.showLoading({
				title: '查询中。。。',
				mask: true
			});
			// web/Get_query_CheckPoint
			var time = this.Rotation[this.index];
			time = time.split('-');
			time = time[1];
			time = time.replace(/\//g, '-');
			
			var self = this;
			uni.request({
				url: self.$store.state.urlPrefix + '/web/Get_query_CheckPoint',
				data: {
					campusplaceNo: self.schoolId,
					type: 'XG',
					endTime: time
				}
			}).then(data => {
				var [error, res] = data;
				uni.hideLoading();
				if (res.data.code == 0) {
					var info = res.data.data;
					self.dataRow = info
					
				} else {
					self.showModel('查询失败')
				}
			})
		}
	},
	mounted() {
		this.getData();
		console.log(now.yestoday(-1, '-'));
		this.today = now.now();
		this.yestoday = now.yestoday(-1, '-');
	},
	created() {
		// var height = wx.getSystemInfoSync().windowHeight;
		// console.log(height)
		// var doc = document.getElementById('row');
		// doc.height = height+ 'px'
	}
};
</script>

<style>
.bottom-search {
	position: fixed;
	z-index: 1111;
	width: 750upx;
	height: 240upx;
	bottom: 0upx;
}
.cu-form-group-state {
	width: 750upx;
	height: 100upx;
	display: flex;
	background-color: #ffffff;
	border-top: 1upx solid #eee;
	line-height: 100upx;
	padding: 1rpx 30rpx;
}
.state-child {
	width: 50%;
	text-align: left;
}

.SafeActive {
	background-color: #409eff !important;
	color: #ffffff;
}
</style>
