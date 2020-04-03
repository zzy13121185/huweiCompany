<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="false"><block slot="content">用户二维码</block></cu-custom>
		<image :src="url" mode="aspectFit" style="width: 700upx;height: 700upx;margin-left: 25upx;margin-top: 100upx;" @click="ViewImage"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		methods: {
			ViewImage(e) {
				uni.previewImage({
					urls: [this.url],
					current: this.url
				});
			},
			showToast(title) {
				uni.showModal({
					title: '提示',
					content: title,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {}
					}
				});
			},
			getData() {
				console.log(this.$store.state.userInfo)
				uni.showLoading({
					title:'加载中。。。',
					mask:true
				})
				var self = this;
				self.showPerson = false;
				uni.request({
					url: self.$store.state.urlPrefix + "/Web/Get_Web_BuildersInfo",
					data:{
						builderId: self.$store.state.userInfo.BuilderId
					}
				}).then(data => {
					var [error, res] = data;
					console.log(res.data);
					uni.hideLoading();
					if (res.data.code == 0) {
						self.url = res.data.data.QRCode;
					} else {
						self.showToast('获取失败！')
					}
				})
			},
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style>

</style>
