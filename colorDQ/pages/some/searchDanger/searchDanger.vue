<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">隐患查询</block></cu-custom>
		
		<scroll-view scroll-x class="bg-white nav"  style="position: fixed;z-index: 1111;">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-mauve cur':''" v-for="(item,index) in tabRow" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		
		<view style="margin-bottom: 180upx;position: relative;margin-top: 120upx;">
			<view v-if="TabCur == 0">
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
			<view v-if="TabCur == 1">
				<view class="nodataRow" v-if="hisList.length == 0&&show">
					<image src="http://huwei-soft.com/HWWechat/static/nodata.png" mode="aspectFit"></image>
				</view>
				
				<view v-if="hisList.length > 0" class="cu-list menu" style="margin-bottom: 200upx;">
					<view class="cu-item" v-for="(item, index) in hisList" :key="index" @click="showHisDetail(item)">
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
		</view>
		
		
		<view class="dl-footer-btn">
			<picker mode="date" :value="startTime" start="2018-01-01" :end="now" @change="changetime" data-time="start">
				<view class="footer-time" style="width: 200upx;"> {{startTime || '起始时间'}}</view>
			</picker>
			<picker mode="date" :value="endTime" start="2018-01-01" :end="now" @change="changetime" data-time="end">
				<view class="footer-time" style="width: 200upx;"> {{endTime || '截止时间'}}</view>
			</picker>
			<view class="footer-search" @click="SearchMore()">
				<image src="http://huwei-soft.com/HWWechat/static/search2.png" mode="aspectFill" class="sa"></image>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import getTime from "../../../getTime.js";
	export default {
		data() {
			return {
				TabCur: 0,
				tabRow: ['当前隐患','历史隐患'],
				startTime: '',
				endTime: '',
				now: '',
				curList: [],
				hisList: [],
				show: false,
				active: 2
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			changetime(e) {
				if (e.target.dataset.time == 'start') {
					this.startTime = e.target.value;
				} else {
					this.endTime = e.target.value;
				}
			},
			getCurList() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Cur_Problems',
					data: {
						DWCD: self.$store.state.userInfo.DWCD,
						start_time: self.startTime,
						end_time: self.endTime
					}
				}).then(data => {
					var [error, res] = data;
					// console.log(res.data)
					if (res.data == '暂无数据') {
						self.curList = []
					} else {
						let foo = JSON.parse(res.data) 
						self.curList = foo;
						console.log(foo)
					}
				})
			},
			getHisList() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/His_Problems',
					data: {
						DWCD: self.$store.state.userInfo.DWCD,
						start_time: self.startTime,
						end_time: self.endTime,
						Keyword: ''
					}
				}).then(data => {
					var [error, res] = data;
					if (res.data == '暂无数据') {
						self.hisList = []
					} else {
						let foo = JSON.parse(res.data)
						console.log(foo)
						self.hisList = foo;
					}
				})
			},
			SearchMore() {
				uni.showLoading({
					title:"加载中",
					mask: true
				})
				this.getCurList();
				this.getHisList();
				this.$nextTick(() => {
					uni.hideLoading()
				})
			},
			
			showCurDetail(item) {
				uni.navigateTo({
					url: 'searchDangerDetail/searchDangerDetail?YHXH='+item.YHXH + '&No=' + item.todoid + '&state=0'
				})
			},
			showHisDetail(item) {
				uni.navigateTo({
					url: 'searchDangerDetail/searchDangerDetail?YHXH='+item.YHXH + '&No=' + item.todoid + '&state=1'
				})
			},
			linkTo(name) {
				
				switch (name) {
					case 'home':
						this.active = 1;
						this.header = '首页';
						uni.reLaunch({
							url: '/pages/basic/home/home'
						})
						break;
					case 'search':
						this.active = 2;
						this.header = '搜索';
						break;
					case 'todo':
						this.active = 4;
						this.header = '待办事项';
						break;
					case 'my':
						this.active = 5;
						this.header = '个人中心';
						break;
				}
			},
		},
		mounted() {
			this.now = getTime.now();
			uni.showLoading({
				title:"加载中",
				mask: true
			})
			this.getCurList();
			this.getHisList();
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

</style>
