<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">隐患归档列表</block></cu-custom>
		<view style="text-align: center;margin-top: 300upx;" v-if="todoList.length == 0"><image src="http://huwei-soft.com/HWWechat/static/nodata.png" mode="aspectFit"></image></view>
		<view v-if="todoList.length > 0" class="cu-list menu" style="margin-bottom: 200upx;">
			<view class="cu-item" v-for="(item, index) in todoList" :key="index" @click="gotoNext(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-infofill text-red margin-right-xs"></text>
						{{ item.YSMC }}({{ item.XZMC }})
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
</template>

<script>
	export default {
		data() {
			return {
				todoList: []
			}
		},
		methods: {
			gotoNext(item) {
				uni.navigateTo({
					url: 'dangerFileDetail/dangerFileDetail?No=' + item.todoid + "&CLQK=" + item.CLQK + "&YSCD=" + item.YSCD + '&AQZK=' + item.AQZK + "&YHXH=" + item.YHXH
				})
			},
			getDate() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_MyCur_Problems',
					data: {
					
						RYXH: self.$store.state.userInfo.RYXH
					},
				}).then(data => {
					var [error,res] = data;
					
					if (res.data == '暂无数据') {
					} else {
						let data = JSON.parse(res.data);
						self.todoList = data;
						console.log(self.todoList);
					}
				})
			},
		},
		mounted() {
			this.getDate()
		},
		onShow() {this.getDate()}
	}
</script>

<style>

</style>
