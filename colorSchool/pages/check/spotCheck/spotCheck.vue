<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">安全抽查</block>
		</cu-custom>
		<view style="display: flex;flex-direction: column;width: 100%;height: 100vh;" id="row">
			<view class="cu-form-group">
				<view class="title">选择月份</view>
				<picker mode="date" :value="date" start="2019-09-01" end="2024-09-01" @change="DateChange" fields="month">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="sc-name">
					类型
				</view>
				<view class="sc-name">
					已完成
				</view>
				<view class="sc-name">
					详情
				</view>
			</view>
			<view class="cu-form-group" v-for="(item,index) in arr" :key="index">
				<view class="sc-name">
					{{formate(item.type)}}
				</view>
				<view class="sc-name">
					{{item.finish}}
				</view>
				<view class="sc-name">
					<button class="cu-btn round bg-olive shadow" @click="showDetail(item)">查看</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import nowMon from '../../../getTime.js';
	export default {
		data() {
			return {
				date: '',
				arr: []
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
			showDetail(item) {
				console.log(item)
				var type = item.type;
				if (item.type == 'common') {
					type = 'CC'
				}
				if (item.finish > 0) {
					uni.navigateTo({
						url: 'SCdetail/SCdetail?time=' + item.time + '&type=' + type
					})
				} else {
					this.showMoadel('该天没有记录')
				}
				
			},
			DateChange(e) {
				this.date = e.detail.value
				console.log(this.date)
				this.getDate()
			},
			getDate() {
				uni.showLoading({
					title:'加载中。。。',
					mask:true
				})
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/web/Query_CheckInfo',
					data: {
						type: 'CC',
						campusplaceNo: 'S000099100001',
						queryTime: this.date
					}
				}).then(data => {
					var [error, res] = data;
					uni.hideLoading();
					self.arr = res.data.data;
				})
			},
			formate(a) {
				if (a == 'XF') {
					return '消防检查'
				} else if (a == 'XG') {
					return '校园巡更'
				} else if (a == 'PC') {
					return '区域排查'
				} else if (a == 'KJ') {
					return '物防技防'
				} else {
					return '部门检查'
				}
			}
		},
		mounted() {
			this.date = nowMon.nowMon();
			this.getDate()
		}
	}
</script>

<style>
.sc-name{
	width: 250upx;
	text-align: center;
}
</style>
