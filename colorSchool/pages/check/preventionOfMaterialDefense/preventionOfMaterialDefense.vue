<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">物防技防</block>
		</cu-custom>
		<view style="display: flex;flex-direction: column;width: 100%;height: 100vh;" id="row">
			<view class="cu-form-group">
				
				<button class="cu-btn" @click="ChooseDay(2)" :class="{ SafeActive: day.today }">今天</button>
				<button class="cu-btn" @click="ChooseDay(3)" :class="{ SafeActive: day.yestoday }">昨天</button>
			</view>
			<view class="cu-form-group" style="border-top: 1upx solid #eee" v-if="day.now">
				<view class="steptitle">时间：</view>
				<view class="content stepFlex">{{ start }}--{{ end }}</view>
			</view>
			
			<view class="cu-form-group-state">
				<view class="state-child">
					<text class="cuIcon-title text-olive"></text>
					安全：{{ checked }}
				</view>
				<view class="state-child">
					<text class="cuIcon-title text-red"></text>
					隐患：{{ wait }}
				</view>
			</view>
			<view style="flex: 1;overflow: scroll;">
				<view class="cu-timeline margin-top">
					<view class="cu-item cur" v-for="(item, index) in dataRow" :key="index" @click="showDetail" :data-info="item">
						<view class="content shadow-blur bg-green" v-if="item.isSafe == 'True' && item.isCheck == 'True'">
							<!-- <text></text> -->
							
							<view class="">
								{{ item.PlaceName }}(安全)
							</view>
							<view>
								{{ item.checkTime }}
							</view>
						</view>
						<view class="content shadow-blur bg-red" v-if="item.isSafe != 'True' && item.isCheck == 'True'">
							<view class="">
								{{ item.PlaceName }}(存在隐患)
							</view>
							<view>
								{{ item.checkTime }}
							</view>
							
							
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
				
				today: true,
				yestoday: false
			},
			
			today: '',
			yestoday: '',
			
			endTime: ''
		};
	},
	methods: {
		ChooseDay(num) {
			 if (num == 2) {
				this.day.today = true;
				this.day.now = this.day.yestoday = false;
				//获取今天数据
				this.dataRow = [];
				
				
				this.checked = this.wait = 0;
				
				this.PickerChangeItem(2)
			} else {
				this.day.yestoday = true;
				this.day.now = this.day.today = false;
				this.dataRow = [];
				
				
				this.checked = this.wait = 0;
				
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
		
		
		showDetail(e) {
			console.log(e);
			uni.navigateTo({
				url: 'PMDdetail/PMDdetail?placeNo=' + e.currentTarget.dataset.info.placeNo + '&time=' + e.currentTarget.dataset.info.checkTime
			});
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
				url: self.$store.state.urlPrefix + '/web/Get_query_CheckPoint',
				data: {
					campusplaceNo: self.schoolId,
					type: 'KJ',
					endTime: time
				}
			}).then(data => {
				var [error, res] = data;
				uni.hideLoading();
				if (res.data.code == 0) {
					var info = res.data.data;
					if (info.length > 0) {
						self.dataRow = info;
						for (let s of info) {
							if (s.isSafe == 'True') {
								self.checked  = self.checked + 1;
							} else {
								self.wait = self.wait+1;
							}
						}
					} else {
						self.showModel('该天没有记录')
					}
					
				} else {
					self.showModel('查询失败')
				}
			})
		},
		
	},
	mounted() {
		
		console.log(now.yestoday(-1, '-'));
		this.today = now.now();
		// this.today = '2020-01-07'
		this.yestoday = now.yestoday(-1, '-');
		
		this.PickerChangeItem(2)
	},
	created() {
		
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
