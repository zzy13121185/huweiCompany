<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true"><block slot="backText">返回</block><block slot="content">待办事项</block></cu-custom>
		<view style="text-align: center;margin-top: 300upx;" v-if="todoList.length == 0"><image :src="nodata" mode="aspectFit"></image></view>
		<view v-if="todoList.length > 0" class="cu-list menu" style="margin-bottom: 200upx;">
			<view class="cu-item" v-for="(item, index) in todoList" :key="index" @click="gotoNext(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-infofill text-red margin-right-xs"></text>
						{{ item.YSMC }}({{ item.Node_Describe }})
					</view>
					<view class="text-grey text-df">
						<text class="cuIcon-peoplefill margin-right-xs"></text>
						来自：{{ item.RYMC }}
					</view>
					<view class="text-grey text-df">
						<text class="cuIcon-timefill margin-right-xs"></text>
						上报时间：{{ item.CreateTime }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'temHome',
	data() {
		return {
			todoList: [],
			nodata: 'http://data.huwei-soft.cn/schooltest/static/nodata.png',
		};
	},
	onLoad() {},
	methods: {
		getTodoNum() {
			var self = this;
			uni
				.request({
					url: self.$store.state.urlPrefix + '/Process/Get_Mytask',
					data: {
						RYXH: self.$store.state.userInfo.RYXH
					}
				})
				.then(data => {
					var [error, res] = data;
					// console.log(res.data);
					if (res.data == '暂无数据') {
					} else {
						let data = JSON.parse(res.data);
						self.todoList = data;
						console.log(self.todoList);
					}
				});
		},
		gotoNext(item) {
			let info = JSON.stringify(item);
			let navigatorId = item.BranchId;
			navigatorId = navigatorId.split('-');
			navigatorId = navigatorId[navigatorId.length - 1];
			console.log(navigatorId);
			switch (navigatorId) {
				case '2':
					//隐患复核
					uni.navigateTo({
						url: '/pages/steps/dangerReview/dangerReview?info=' + info
					});
					break;
				case '4':
					//隐患整改
					uni.navigateTo({
						url: '/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info=' + info
					});
					break;
				case '12':
					//隐患整改
					uni.navigateTo({
						url: '/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info=' + info
					});
					break;
				case '5':
					//整改复核
					uni.navigateTo({
						url: '/pages/steps/changeReview/changeReview?info=' + info
					});
					break;
				case '10':
					//科长处理
					uni.navigateTo({
						url: '/pages/steps/chiefDeal/chiefDeal?info=' + info
					});
					break;
				case '11':
					//副校长处理
					uni.navigateTo({
						url: '/pages/steps/presidentDeal/presidentDeal?info=' + info
					});
					break;
				default:
					break;
			}
		}
	},
	mounted() {
		uni.showLoading({
			title: '加载中。。。',
			mask: true
		});
		this.getTodoNum();
		this.$nextTick(function() {
			uni.hideLoading();
		});
	}
};
</script>

<style></style>
