<template>
	<view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 信息查询
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" @click="jump(item.color)">
				<view>
					<image :src="item.url" mode="aspectFit" class="search-icon"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'temHome',
		props:{
			msg: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				gridCol: 3,
				gridBorder: false,
				cuIconList: [{
					url: 'http://huwei-soft.com/HWWechat/static/sdanger.png',
					color: '/pages/some/searchDanger/searchDanger',
					name: '隐患查询'
				}, {
					url: 'http://huwei-soft.com/HWWechat/static/ssafe.png',
					color: '/pages/some/safeSearch/safeSearch',
					name: '巡查记录'
				}],
			};
		},
		onLoad() {
			// {
			// 	url: '../../static/stask.png',
			// 	color: '/pages/some/taskTroubleshooting/taskTroubleshooting',
			// 	badge: 1,
			// 	name: '任务排查'
			// },
		},
		methods:{
			jump(url) {
				uni.navigateTo({
					url: url
				})
			}
			
		}
	}
</script>

<style>
.search-icon{
	width: 60upx;
	height: 60upx;
}
</style>
