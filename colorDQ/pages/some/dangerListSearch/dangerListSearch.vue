<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">危险源清单</block></cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 危险源查询
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
		data() {
			return {
				gridCol: 3,
				gridBorder: false,
				cuIconList: [{
					url: 'http://huwei-soft.com/HWWechat/static/sdanger.png',
					color: '/pages/some/dangerList/dangerList',
					name: '危险源清单查询'
				}, {
					url: 'http://huwei-soft.com/HWWechat/static/ssafe.png',
					color: '/pages/some/writeInDangerLIst/writeInDangerLIst',
					name: '危险源清单录入'
				}],
			}
		},
		methods: {
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
