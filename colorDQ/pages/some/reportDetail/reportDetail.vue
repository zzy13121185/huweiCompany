<template>
	<view id="yhsb">
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">隐患上报</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center" style="position: fixed;z-index: 1111;">
			<view class="cu-item" :class="index == TabCur ? 'text-blue cur' : ''" v-for="(item, index) in tabRow" :key="index" @tap="tabSelect" :data-id="index" style="width: 50%;">
				{{ item }}
			</view>
		</scroll-view>
		<view style="position: relative;margin-top: 120upx;">
			<view v-if="TabCur == 0"><normal :yscd="yscd" :name="name" :firstLevelId="firstLevelId"></normal></view>
			<view v-if="TabCur == 1"><scene :yscd="yscd" :name="name" :firstLevelId="firstLevelId"></scene></view>
		</view>
	</view>
</template>

<script>
import normal from '../../function/normalReport.vue';
import scene from '../../function/sceneReport.vue';
export default {
	components: {
		normal,
		scene
	},
	data() {
		return {
			TabCur: 0,
			tabRow: ['一般整改', '现场整改'],
			yscd: '',
			name: '',
			firstLevelId: ''
		};
	},
	methods: {
		
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			console.log(this.TabCur)
		},
	},
	onLoad(option) {
		console.log(option);
		this.yscd = option.yscd;
		this.name = option.name;
		this.firstLevelId = option.firstlevel;
	},
	mounted() {}
};
</script>

<style>

#yhsb .footItem {
	position: fixed;
	z-index: 1111;
	bottom: 0upx;
	width: 750upx;
	height: 200upx;
}
</style>
