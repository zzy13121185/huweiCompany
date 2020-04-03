<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">待办事项</block></cu-custom>
		<view style="text-align: center;margin-top: 300upx;" v-if="todoList.length == 0"><image src="http://huwei-soft.com/HWWechat/static/nodata.png" mode="aspectFit"></image></view>
		<view v-if="todoList.length > 0" class="cu-list menu" style="margin-bottom: 200upx;">
			<view class="cu-item" v-for="(item, index) in todoList" :key="index" @click="gotoNext(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-infofill text-red margin-right-xs"></text>
						{{ item.Discrible }}({{ item.Node_Describe }})
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
			todoList: []
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
				case '15':
					//隐患复核
					uni.navigateTo({
						url: '/pages/steps/dangerReview/dangerReview?info=' + info
					});
					break;
				case '17':
					//隐患整改
					uni.navigateTo({
						url: '/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info=' + info
					});
					break;
				case '25':
					//隐患整改
					uni.navigateTo({
						url: '/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info=' + info
					});
					break;
				case '26':
					//隐患整改
					uni.navigateTo({
						url: '/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info=' + info
					});
					break;
				case '27':
					//隐患整改
					uni.navigateTo({
						url: '/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info=' + info
					});
					break;
				case '28':
					//隐患整改
					uni.navigateTo({
						url: '/pages/steps/hiddenDangerRectification/hiddenDangerRectification?info=' + info
					});
					break;
				case '21':
					//整改复核
					uni.navigateTo({
						url: '/pages/steps/changeReview/changeReview?info=' + info
					});
					break;
					case '18':
						//整改复核
						uni.navigateTo({
							url: '/pages/steps/changeReview/changeReview?info=' + info
						});
						break;
				case '19':
					//整改复核
					uni.navigateTo({
						url: '/pages/steps/changeReview/changeReview?info=' + info
					});
					break;
				case '23':
					//整改复核
					uni.navigateTo({
						url: '/pages/steps/changeReview/changeReview?info=' + info
					});
					break;
				case '16':
					//科长处理
					uni.navigateTo({
						url: '/pages/steps/chiefDeal/chiefDeal?info=' + info
					});
					break;
				case '20':
					//科长处理
					uni.navigateTo({
						url: '/pages/steps/chiefDeal/chiefDeal?info=' + info
					});
					break;
				case '22':
					//副经理处理
					uni.navigateTo({
						url: '/pages/steps/presidentDeal/presidentDeal?info=' + info
					});
					break;
				case '7':
					//逾期处理
					uni.navigateTo({
						url: '/pages/steps/overDue/overDue?info='+info
					});
					break;
				case '8':
					//逾期处理
					uni.navigateTo({
						url: '/pages/steps/overDue/overDue?info='+info
					});
					break;
				case '9':
					//逾期处理
					uni.navigateTo({
						url: '/pages/steps/overDue/overDue?info='+info
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
