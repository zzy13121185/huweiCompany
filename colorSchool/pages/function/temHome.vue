<template>
	<view>
		<view class="home-img"><image :src="bg" class="home-img-image"></image></view>

		<view class="home-middle">
			<!-- 下达任务   人人上报   查看报表   待办事项 -->
			<view class="home-middle-box" @click="gotoChild('task')">
				<image mode="aspectFit" :src="aqxc" class="home-middle-box-image"></image>
				<view class="home-middle-box-title">保安巡查</view>
			</view>
			<view class="home-middle-box" @click="gotoChild('todo')">
				<image mode="aspectFit" :src="dbsx" class="home-middle-box-image"></image>
				<view class="home-middle-box-title">
					待办事项
					<uni-badge :text="todoNum" type="error" size="small"></uni-badge>
				</view>
			</view>
			<view class="home-middle-box" @click="gotoChild('report')">
				<image mode="aspectFit" :src="yhsb" class="home-middle-box-image"></image>
				<view class="home-middle-box-title">隐患上报</view>
			</view>

			<view class="home-middle-box" @click="gotoChild('file')">
				<image mode="aspectFit" :src="yhgd" class="home-middle-box-image"></image>
				<view class="home-middle-box-title">隐患归档</view>
			</view>
		</view>
		
		<view class="itemInfo">
			<view class="smallBox" @click="gotoSearch('yh')">
				<view class="cu-form-group">
					<view class="title">当前隐患数量：</view>
					<view class="content">
						<text class="itemInfo-text">{{ info.allYHTotal }}</text>
						个
					</view>
				</view>
			</view>
		</view>
		<view class="itemInfo" style="margin-bottom: 200upx;">
			<view class="cu-form-group">
				<view class="title">今日统计：</view>
			</view>
			<view class="smallBox" @click="gotoSearch('xf')">
				<view class="cu-form-group">
					<view class="title">消防检查：</view>
					<view class="content">
						<text class="itemInfo-text">{{ info.XFFinish || 0 }}</text>
						
					</view>
				</view>
			</view>
			<view class="smallBox" @click="gotoSearch('xg')">
				<view class="cu-form-group">
					<view class="title">巡更巡查：</view>
					<view class="content">
						<text class="itemInfo-text">{{ info.XGFinish || 0 }}</text>
					</view>
				</view>
			</view>
			<view class="smallBox" @click="gotoSearch('pc')">
				<view class="cu-form-group">
					<view class="title">区域排查：</view>
					<view class="content">
						<text class="itemInfo-text">{{ info.PCFinish || 0  }}</text>
					</view>
				</view>
			</view>
			<view class="smallBox" @click="gotoSearch('kj')">
				<view class="cu-form-group">
					<view class="title">物防技防：</view>
					<view class="content">
						<text class="itemInfo-text">{{ info.KJFinish || 0  }}</text>
					</view>
				</view>
			</view>
			<view class="smallBox" @click="gotoSearch('cc')">
				<view class="cu-form-group">
					<view class="title">安全抽查：</view>
					<view class="content">
						<text class="itemInfo-text">{{ info.CC || 0 }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniBadge from "@/common/uni-badge/uni-badge.vue"
export default {
	name: 'temHome',
	props: {
		msg: {
			type: String,
			default: ''
		}
	},
	components:{uniBadge},
	data() {
		return {
			todoNum: '',
			bg: 'http://data.huwei-soft.cn/schooltest/static/background.jpg',
			aqxc: 'http://data.huwei-soft.cn/schooltest/static/dengji.png',
			dbsx: 'http://data.huwei-soft.cn/schooltest/static/todo.png',
			yhsb: 'http://data.huwei-soft.cn/schooltest/static/commit.png',
			yhgd: 'http://data.huwei-soft.cn/schooltest/static/renwu.png',
			info: {}
		};
	},
	mounted() {
		this.getTodoNum();
		this.getData();
	},
	onLoad() {
		
	},
	methods: {
		gotoSearch(type) {
			switch (type) {
				case 'yh':
					uni.navigateTo({
						url: '/pages/check/hiddenDangerQuery/hiddenDangerQuery'
					});
					break;
				case 'xg':
					uni.navigateTo({
						url: '/pages/check/schoolCheck/schoolCheck'
					});
					break;
				case 'pc':
					uni.navigateTo({
						url: '/pages/check/blockCheck/blockCheck'
					});
					break;
				case 'xf':
					uni.navigateTo({
						url: '/pages/check/fireControlCheck/fireControlCheck'
					});
					break;
				case 'kj':
					uni.navigateTo({
						url: '/pages/check/preventionOfMaterialDefense/preventionOfMaterialDefense'
					});
					break;
				case 'cc':
					uni.navigateTo({
						url: '/pages/check/spotCheck/spotCheck'
					});
					break;
				default: 
					break;
			}
		},
		gotoChild(type) {
			switch (type) {
				case 'report':
					uni.navigateTo({
						url: '/pages/some/report/report'
					});
					break;
				case 'task':
					uni.navigateTo({
						url: '/pages/some/anquanxuncha/anquanxuncha'
					});
					break;
				case 'todo':
					uni.navigateTo({
						url: '/pages/some/todoPage/todoPage'
					});
					break;
				case 'file':
					if (this.$store.state.userInfo.ROLEID == 6 || this.$store.state.userInfo.ROLEID == 3) {
						uni.navigateTo({
							url: '/pages/some/dangerFile/dangerFile'
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '没有权限',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {}
							}
						});
					}
			}
		},
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
					
					if (res.data == '暂无数据') {
						self.todoNum = '';
					} else {
						let data = JSON.parse(res.data);
						let len = data.length;
						len = len > 99 ? 99 : len;
						self.todoNum = len;
					}
					console.log(self.todoNum)
				});
		},
		getData() {
			var self = this;
			uni
				.request({
					url: self.$store.state.urlPrefix + '/school/Get_HomePageInfo',
					data: {
						campusPlaceNo: 'S000099100001'
					}
				})
				.then(data => {
					var [error, res] = data;
					
					console.log(res.data)
					self.info = res.data.data;
				});
		}
	}
};
</script>

<style>
.home-img {
	width: 750upx;
	height: 300upx;
}
.home-img-image {
	width: 100%;
	height: 100%;
}
.home-middle {
	width: 700upx;
	height: 190upx;
	background-color: white;
	z-index: 999;
	margin-left: 25upx;
	margin-top: 30upx;
	border-radius: 10px;
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
}
.home-bottom {
	width: 700upx;
	/* height: 190upx; */
	background-color: white;
	z-index: 999;
	margin-left: 25upx;
	margin-top: 30upx;
	border-radius: 10px;
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
}
.home-middle-box {
	width: 25%;
	height: 200upx;
	float: left;
	text-align: center;
}

.home-middle-box-image {
	width: 32px;
	height: 32px;
	margin-top: 30upx;
}

.home-middle-box-title {
	width: 100%;
	height: 60upx;
	line-height: 60upx;
	color: #555555;
	text-align: center;
	color: #8a8a8a;
}

.itemInfo {
	width: 700upx;
	margin-left: 25upx;
	height: auto;
	line-height: 100upx;
	text-align: left;
	/* padding-left: 20upx; */
	box-sizing: border-box;
	color: #303133;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
	margin-top: 20upx;
	float: left;
	padding: 20upx;
}
.itemInfoTitle {
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	box-sizing: border-box;
	padding-left: 20upx;
}
.itemInfo-text {
	color: #f56c6c;
	font-size: 22px;
	/* font-weight: 700; */
	margin: 0 10upx;
}
.smallBox {
	width: 600upx;
	margin: 0 auto;
	height: auto;
}
.smallBoxItem {
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	color: #99a9bf;
	border-bottom: 1px solid #dcdfe6;
	letter-spacing: 2upx;
}
.smallBoxItemright {
	/* font-size: 22px; */
	color: #303133;
	float: right;
}
.smallBoxItemright-text {
	font-size: 22px;
	color: #f56c6c;
}
</style>
