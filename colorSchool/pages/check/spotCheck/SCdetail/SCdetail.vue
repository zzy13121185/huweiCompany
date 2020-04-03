<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">安全抽查</block>
		</cu-custom>
		<view style="overflow: scroll;padding: 30upx 0;box-sizing: border-box;">
			<view class="cu-timeline margin-top">
				<view class="cu-item cur" v-for="(item, index) in dataRow" :key="index" @click="showDetail" :data-info="item">
					<view class="content shadow-blur bg-green" v-if="item.isSafe == 'True'">
						<!-- <text></text> -->
						<view class="">
							{{ item.PlaceName }}(安全)
						</view>
						<view>
							{{ item.CheckTime }}
						</view>
						
					</view>
					<view class="content shadow-blur bg-red" v-if="item.isSafe != 'True'">
						
						<view class="">
							{{ item.PlaceName }}(存在隐患)
						</view>
						<view>
							{{ item.CheckTime }}
						</view>
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
				dataRow: [],
				time: '',
				type: ''
			}
		},
		methods: {
			showDetail(e) {
				var item = e.currentTarget.dataset.info;
				uni.navigateTo({
					url: '../spotDetail/spotDetail?placeNo=' + item.placeNo + '&time=' + item.CheckTime + '&YHXH='+item.YHXH +"&CCType=" + item.type
				});
				
			},
			getData() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Web/Get_query_CC',
					data: {
						campusplaceNo: 'S000099100001',
						time: self.time,
						type: self.type
					}
				}).then(data => {
					var [error,res] = data;
					console.log(res.data)
					self.dataRow = res.data.data
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.time = option.time;
			this.type = option.type;
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style>

</style>
