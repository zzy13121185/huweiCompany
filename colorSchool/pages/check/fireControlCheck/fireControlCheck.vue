<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">消防检查</block>
		</cu-custom>
		<view style="display: flex;flex-direction: column;width: 100%;height: 100vh;position: relative;" id="row">
			<view class="flex solid-bottom justify-around bg-white" style="height: 100upx;position: absolute;top: 0px;width: 100%;">
				<view class="bg-white padding"><text class="cuIcon-title text-orange"></text>待检查:{{overDue}}</view>
				<view class="bg-white padding"><text class="cuIcon-title text-green"></text>已检查:{{finish}}</view>
			</view>
			<view class="cu-form-group" style="border-top: 1upx solid #eee;margin-top: 101upx;">
				<view class="title">选择轮次</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">{{ index > -1 ? picker[index] : '请选择轮次' }}</view>
				</picker>
			</view>
			
			<view class="padding" style="flex: 1;">
				<view class="cu-form-group" v-if="showBuilding">
					<view class="title" style="width: 200upx">地点</view>
					<view style="width: 120upx;">
						<text class="cuIcon-title text-yellow"></text>
						待检查
						
					</view>
					<view style="width: 120upx;">
						<text class="cuIcon-title text-green"></text>
						已检查
						
					</view>
					<view style="width: 90upx;">
						<text class="cuIcon-title text-red"></text>
						隐患
					</view>
				</view>
				<view class="cu-form-group" v-for="(item, index) in placeArr" :key="index" @click="next(item)" v-if="showBuilding">
					<view class="title"  style="width: 200upx;">{{ item.Name }}</view>
					<view style="width: 120upx;text-align: center;color: #fbbd08">
						<!-- <text class="cuIcon-title text-orange"></text> -->
						{{item.overdue}}
						
					</view>
					<view style="width: 120upx;text-align: center;color: #39b54a;">
						<!-- <text class="cuIcon-title text-green"></text> -->
						{{item.finish}}
						
					</view>
					<view style="width: 90upx;text-align: center;color: #e54d42;">
						<!-- <text class="cuIcon-title text-red"></text> -->
						{{item.danger}}
					</view>
				</view>
				<view class="basis-sm bg-white margin-xs padding-sm radius" v-for="(item, index) in placeArr" :key="index" v-if="!showBuilding" @click="gotoDetail(item)">
					<view>{{ item.Name }}</view>
					<view>
						状态：
						<text class="cuIcon-title text-yellow" v-if="!item.isSafe"></text>
						<text v-if="!item.isSafe">待检查</text>
						
						<text class="cuIcon-title text-green" v-if="item.isSafe == 'True'"></text>
						<text v-if="item.isSafe == 'True'">安全</text>
						
						<text class="cuIcon-title text-red" v-if="item.isSafe == 'False'"></text>
						<text v-if="item.isSafe == 'False'">隐患</text>
					</view>
				</view>
				
			</view>
			<view class="padding"><button class="cu-btn bg-olive margin-tb-sm lg" style="width: 100%;" @click="reset" v-if="showBack">返回</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			schoolId: 'S000099100001',
			dataRow: [],
			endTime: '',
			index: 0,
			picker: [],
			placeArr: [],
			showBuilding: true,
			origanalArr: [],
			showBack: false,
			finish: 0,
			overDue: 0,
			timeRow: []
		};
	},
	methods: {
		gotoDetail(item) {
			console.log(item)
			if (!item.isSafe) {
				this.showModel('该地点暂未检查！')
			} else {
				uni.navigateTo({
					url: 'FCCdetail/FCCdetail?placeNo='+item.placeNo +"&time=" +this.endTime
				})
			}
		},
		reset() {
			uni.showLoading({
				title:'加载中。。。',
				mask:true
			})
			this.placeArr = this.origanalArr;
			this.showBack = false;
			this.showBuilding = true;
			uni.hideLoading();
		},
		next(foo) {
			this.showBack = true;
			console.log(foo);
			if (foo.ChildYS[0].ChildYS) {
				uni.showLoading({
					title: '加载中。。。',
					mask: true
				});
				this.placeArr = foo.ChildYS;
				uni.hideLoading();
			} else {
				uni.showLoading({
					title: '加载中。。。',
					mask: true
				});
				this.placeArr = foo.ChildYS;
				uni.hideLoading();
				this.showBuilding = false;
			}
			
		},
		PickerChange(e) {
			this.index = e.detail.value;
			console.log(this.picker[this.index])
			var time = this.timeRow[this.index];
			time = time.split('-');
			time = time[1];
			this.endTime = time;
			uni.showLoading({
				title:"加载中。。。",
				mask:true
			});
			this.showBuilding = true;
			this.showBack = false;
			this.getTreeData();
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
		getXFPlace() {
			var self = this;
			uni
				.request({
					url: self.$store.state.urlPrefix + '/web/Query_CheckInfo',
					data: {
						campusplaceNo: self.schoolId,
						type: 'XF'
					}
				})
				.then(data => {
					var [error, res] = data;
					console.log(res.data);
					for (let s of res.data.data) {
						let b = s.endTime || '未结束';
						let aa = s.startTime + '-' + b;
						self.timeRow.push(aa)
						self.picker.push(s.XFRoundName);
					}
					var time = this.timeRow[0];
					time = time.split('-');
					time = time[1];
					this.endTime = time;
					this.getTreeData();
				});
		},

		getTreeData() {
			this.finish = this.overDue = 0;
			var data = {};
			if (this.endTime == '未结束') {
				data = {
					campusplaceNo: this.schoolId,
					endTime: ''
				};
			} else {
				data = {
					campusplaceNo: this.schoolId,
					endTime: this.endTime
				};
			}

			var self = this;
			uni
				.request({
					url: self.$store.state.urlPrefix + '/Web/Get_XF_lastXZ',
					data: data
				})
				.then(data => {
					var [error, res] = data;
					self.placeArr = res.data.data;
					for (let s of self.placeArr) {
						self.overDue = s.overdue + self.overDue;
						self.finish  = s.finish + self.finish;
					}
					self.origanalArr = res.data.data;
					uni.hideLoading();
				});
		}
	},
	onLoad(option) {},
	mounted() {
		uni.showLoading({
			title: '加载中。。。',
			mask: true
		});
		this.getXFPlace();
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
.fccwidth {
	width: 300upx;
}
</style>
