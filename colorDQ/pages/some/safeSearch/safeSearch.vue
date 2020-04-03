<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">巡查记录</block></cu-custom>
			<view>
				<view class="nodataRow" v-if="curList.length == 0&&show">
					<image src="http://huwei-soft.com/HWWechat/static/nodata.png" mode="aspectFit"></image>
				</view>
				
				<view v-if="curList.length > 0" class="cu-list menu" style="margin-bottom: 200upx;">
					<view class="cu-item" v-for="(item, index) in curList" :key="index" @click="showCurDetail(item)">
						<view class="content padding-tb-sm">
							<view>
								<text class="cuIcon-infofill text-red margin-right-xs"></text>
								{{ item.YSMC }}({{ item.BZName }})
							</view>
							<view class="text-grey text-df">
								<text class="cuIcon-peoplefill margin-right-xs"></text>
								来自：{{ item.RYMC }}
							</view>
							<view class="text-grey text-df">
								<text class="cuIcon-timefill margin-right-xs"></text>
								上报时间：{{ item.FXSJ }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="dl-footer-btn">
				<picker mode="date" :value="startTime" start="2018-01-01" :end="now" @change="changetime" data-time="start">
					<view class="footer-time"> {{startTime || '请选择起始时间'}}</view>
				</picker>
				<picker mode="date" :value="endTime" start="2018-01-01" :end="now" @change="changetime" data-time="end">
					<view class="footer-time"> {{endTime || '请选择截止时间'}}</view>
				</picker>
				<view class="footer-search" @click="SearchMore()">
					<image src="../../../static/search2.png" mode="aspectFill" class="sa"></image>
				</view>
			</view>
	</view>
</template>

<script>
	import getTime from "../../../getTime.js";
	export default {
		data() {
			return {
				curList: [],
				show: false,
				now: '',
				startTime: '',
				endTime: ''
			}
		},
		methods: {
			changetime(e) {
				if (e.target.dataset.time == 'start') {
					this.startTime = e.target.value;
				} else {
					this.endTime = e.target.value;
				}
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
			
			showCurDetail(item) {
				
				console.log(item)
				uni.navigateTo({
					url: 'safeSearchDetail/safeSearchDetail?YHXH='+ item.YHXH + '&No=' + item.todoid + '&state=1&rymc='+item.RYMC
				})
			},
			getData() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_SafeReport',
					data: {
						DWCD: self.$store.state.userInfo.DWCD,
						start_time: self.startTime,
						end_time: self.endTime,
					},
					method: 'GET',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						
						if (res.data == '暂无数据') {
							self.curList = [];
						} else {
							var data = JSON.parse(res.data);
							console.log(data)
							self.curList = data;
							
							
						}
					}
				})
			},
			SearchMore() {
				uni.showLoading({
					title:"加载中",
					mask: true
				})
				this.getData()
				this.$nextTick(() => {
					uni.hideLoading()
				})
			},
		},
		mounted() {
			this.now = getTime.now();
			uni.showLoading({
				title:"加载中",
				mask: true
			})
			this.getData()
			this.$nextTick(() => {
				
				setTimeout(() => {
					uni.hideLoading();
					this.show = true;
				},1000)
			})
		}
	}
</script>

<style>
.bottom-search{
	position: fixed;
	z-index: 1111;
	width: 750upx;
	height: 240upx;
	bottom: 0upx;
}
</style>
