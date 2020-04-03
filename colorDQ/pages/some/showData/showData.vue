<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">隐患统计</block></cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in mon" :key="index" @tap="tabSelect" :data-id="index" style="width: 50%;">
				{{item}}
			</view>
		</scroll-view>
		<view class="cu-form-group margin-top">
			<view class="flex flex-wrap" style="width: 100%;text-align: center;justify-content:space-between">
				<view class="basis-three margin-xs padding-sm radius" style="width: 30%;">工点</view>
				<view class="basis-three margin-xs padding-sm radius" style="width: 30%;">隐患总数</view>
				<view class="basis-three margin-xs padding-sm radius" style="width: 30%;">整改完成数</view>
			</view>
		</view>
		<view class="cu-form-group" v-for="(item,index) in baseData" :key="index">
			<view class="flex flex-wrap" style="width: 100%;text-align: center;justify-content:space-between">
				<view class="basis-three margin-xs padding-sm radius" style="width: 30%;">{{item.BZM}}</view>
				<view class="basis-three margin-xs padding-sm radius" style="width: 30%;">{{item.YHZS}}</view>
				<view class="basis-three margin-xs padding-sm radius" style="width: 30%;">{{item.YHWCS}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseData: [],
				TabCur: 0,
				scrollLeft: 0,
				mon: ['当月','上月'],
				state: 0
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				console.log(e.currentTarget.dataset.id)
				this.state = e.currentTarget.dataset.id;
				this.getData();
			},
			getData() {
				uni.showLoading({
					title:'加载中。。。',
					mask:true
				})
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_CompletionDetails',
					data: {
						DWCD: self.$store.state.userInfo.DWCD,
						state: self.state
					},
					
				}).then(data => {
					var [error,res] = data;
					self.baseData = res.data;
					console.log(self.baseData);
					uni.hideLoading()
				})
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style>

</style>
