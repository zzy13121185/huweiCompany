<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			const updateManager = uni.getUpdateManager();
			
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				// console.log(res.hasUpdate);
			});
			
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
			});
			
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation({
						type: 'wgs84',
						success: function(res) {
							console.log(res)
						}
					});
				},
				fail() {
					wx.showModal({
						title: '警告',
						content: '您点击了拒绝授权,将无法正常使用小程序,点击确定重新获取授权。',
						success: function(res) {
							if (res.confirm) {
								wx.openSetting({
									success: (res) => {
										if (res.authSetting["scope.userLocation"]) { ////如果用户重新同意了授权登录
											wx.getLocation({
												success: function(res) {
													
													
												}
											})
										}
									},
									fail: function(res) {
			
									}
								})
							}
						}
					})
				}
			});
			uni.getSystemInfo({
		success: function(e) {
			// #ifndef MP
			Vue.prototype.StatusBar = e.statusBarHeight;
			if (e.platform == 'android') {
				Vue.prototype.CustomBar = e.statusBarHeight + 50;
			} else {
				Vue.prototype.CustomBar = e.statusBarHeight + 45;
			};
			// #endif
			// #ifdef MP-WEIXIN
			Vue.prototype.StatusBar = e.statusBarHeight;
			let custom = wx.getMenuButtonBoundingClientRect();
			Vue.prototype.Custom = custom;
			Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			// #endif		
			// #ifdef MP-ALIPAY
			Vue.prototype.StatusBar = e.statusBarHeight;
			Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			// #endif
		}
	})
		},
		onShow: function() {
			// console.log('App Show')
			// console.log(this.$store.state.urlPrefix)
			
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/user.css";
	.steptitle {
		text-align: justify;
		padding-right: 30upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		width: 200upx;
	}
	.stepFlex{
		flex: 1;
	}
</style>
