<template>
	<view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>
				信息查询
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol, gridBorder ? '' : 'no-border']">
			<view class="cu-item" v-for="(item, index) in cuIconList" :key="index" v-if="index < gridCol * 2" @click="jump(item.color)">
				<view><image :src="item.url" mode="aspectFit" class="search-icon"></image></view>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'temHome',
	props: {
		msg: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			gridCol: 3,
			gridBorder: false,
			cuIconList: [
				{
					url: 'http://data.huwei-soft.cn/schooltest/static/sdanger.png',
					color: '/pages/check/hiddenDangerQuery/hiddenDangerQuery',
					name: '隐患查询'
				},
				{
					url: 'http://data.huwei-soft.cn/schooltest/static/ssafe.png',
					color: '/pages/check/schoolCheck/schoolCheck',
					name: '校园巡更'
				},
				{
					url: 'http://data.huwei-soft.cn/schooltest/static/xf.png',
					color: '/pages/check/fireControlCheck/fireControlCheck',
					name: '消防检查'
				},
				{
					url: 'http://data.huwei-soft.cn/schooltest/static/blockTroubleshooting.png',
					color: '/pages/check/blockCheck/blockCheck',
					name: '区域排查'
				},
				{
					url: 'http://data.huwei-soft.cn/schooltest/static/xxhdpi.png',
					color: '/pages/check/preventionOfMaterialDefense/preventionOfMaterialDefense',
					name: '物防技防'
				},
				{
					url: 'http://data.huwei-soft.cn/schooltest/static/spotCheck.png',
					color: '/pages/check/spotCheck/spotCheck',
					name: '安全抽查'
				}
			]
		};
	},
	onLoad() {
		
	},
	methods: {
		jump(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style>
.search-icon {
	width: 60upx;
	height: 60upx;
}
</style>
