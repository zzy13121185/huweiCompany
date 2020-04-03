<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">危险源清单录入</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="steptitle">请选择工点</view>
			<view class="content stepFlex">
				{{dangerRoad}}
			</view>
		</view>
		<scroll-view style="height: auto" scroll-y class="cu-form-group">
			<view v-if="!showDangerCheckBox">
				<radio-group @change="radioChange" class="block">
					<label v-for="(item ,index) in dangerInfoRow" :key="item.id" class="cu-form-group solid-top">
						<view class="title">
							{{item.XZMC}}
						</view>
						<radio :value="item.XZCD" :checked="index === current" class="checked" />
					</label>
				</radio-group>
			</view>
		</scroll-view>
		<view class="padding flex flex-direction" style="width: 300upx;float: left;">
			<button class="cu-btn bg-red" @click="reset">重新选择</button>
		</view>

		<view class="padding flex flex-direction" style="width: 300upx;float: right;">
			<button class="cu-btn bg-green" @click="gotoDetail">下一步</button>
		</view>
		

		

	</view>
</template>

<script>
	import helper from "../../../common/helper.js"
	export default {
		data() {
			return {
				dangerRoad: '',
				showDangerCheckBox: false,
				dangerInfoRow: [],
				dangerCheckBox: [],
				current: -1,
				choose: '',
				ROLEID: 0,
				today: '',
				originalData: [],
				place: '',
				source: [],
				newdec: '',
				chooseed: {},
				show: false,
				modalName: null
			}
		},
		mounted() {
			this.ROLEID = this.$store.state.userInfo.ROLEID;
			this.today = helper.now();
			this.getInfo();
			console.log(this.ROLEID)
		},
		methods: {
			gotoDetail() {
				if (!this.choose) {
					this.showMoadel('请选择工点！')
				} else {
					console.log(this.choose)
					uni.navigateTo({
						url: 'writeDetail/writeDetail?id='+ this.choose
					})
				}
			},
			showMoadel(title) {
				uni.showModal({
					title: '提示',
					content: title,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {}
					}
				});
			},
			reset() {
				this.dangerInfoRow = this.originalData;
				this.dangerCheckBox = [];
				this.showDangerCheckBox = false;
				this.dangerRoad = '';
				this.choose = '';
				this.current = -1;
			},
			getInfo() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_AllBZ',
					data: {
						DWCD: self.$store.state.userInfo.DWCD,
						// RYXH: self.$store.state.userInfo.RYXH
					},
					method: 'GET',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {

						let data = JSON.parse(res.data)
						console.log(data)
						if (res.data.length == 0) {
							self.showMoadel('此处没有隐患源')
						} else {
							self.originalData = data;
							self.dangerInfoRow = data;
						}
					}
				})
			},
			radioChange: function(evt) {
				// this.getPCYD(evt.target.value)
				for (let i = 0; i < this.dangerInfoRow.length; i++) {
					if (this.dangerInfoRow[i].XZCD === evt.target.value) {
						this.current = i;
						this.choose = evt.target.value;
						this.dangerRoad = this.dangerInfoRow[i].XZMC
						break;
					}
				}
			},
			
			
			
		}
	}
</script>

<style>
	.steptitle {
		text-align: justify;
		padding-right: 0upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		width: 220upx;
		padding-left: 20upx;
	}

	.stepFlex {
		flex: 1;
	}
</style>
