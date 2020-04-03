<template>
	<view>
		<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="false"><block slot="content">登录</block></cu-custom> -->
		<view class="login-title bg-red">
			忽微交通工程智慧安全
		</view>
		<view class="login-row shadow shadow-lg">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabRow" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
				
				<view v-if="TabCur == 0">
					<view class="cu-form-group margin-top">
						<input placeholder="请输入您的账号" name="input" v-model="loginForm.account"></input>
					</view>
					<view class="cu-form-group btmLine">
						<input placeholder="请输入您的密码" name="input" v-model="loginForm.password" password></input>
					</view>
				</view>
				<view v-if="TabCur == 1">
					<view class="cu-form-group margin-top">
						<input placeholder="请输入您的手机号" name="input" v-model="telNum"></input>
					</view>
					<view class="cu-form-group btmLine">
						<input placeholder="请输入验证码" name="input" v-model="yzm"></input>
						<button class='cu-btn bg-green shadow' @click="getCheckCode">{{checkCodeText}}</button>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="login-commit">
			<button class="cu-btn bg-red commit-btn" @click="commit">{{loginWay}}</button>
		</view>
		<view class="diviceLine">
			<view class="diviceLineTitle">
				社交账号登录
			</view>
			<view class="diviceLineIn">
				
			</view>
		</view>
		<view class="wx-icon-r">
			<view class="wx-icon-row">
				<image src="http://huwei-soft.com/HWWechat/static/wx.png" mode="aspectFit" class="wx-icon" @click="loginByWechat"></image>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				tabRow: ['登录','注册'],
				loginForm: {
					account: '',
					password: ''
				},
				userOriginalCode: '',
				checkCodeText: '获取验证码',
				yzm: '',
				checkCode: '',
				telNum: '',
				loginWay: '登录'
			}
		},
		methods: {
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
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if (this.TabCur == 0) {
					this.loginWay = '登录'
				} else {
					this.loginWay = '注册'
				}
			},
			
			//获取验证码
			getCheckCode() {
				let i = 60;
				if (this.telNum.length == 11) {
					if (this.checkCodeText == '获取验证码' || this.checkCodeText == '重新获取') {
						this.setInter = setInterval(() => {
							if (i == 0) {
								clearInterval(this.setInter)
								this.checkCodeText = '重新获取';
								this.yzm = '';
							} else {
								this.checkCodeText = i + '秒';
								i = i - 1;
							}
						}, 1000);
						var self = this;
						uni.request({
							url: self.$store.state.urlPrefix + '/Home/Get_Code',
							data: {
								phone: self.telNum
							},
							method: 'GET',
							header: {
								'content-type': 'application/json' // 默认值
							},
							success(res) {
								self.yzm = '';
								if (res.data == '系统中没有该手机号码') {
									self.showToast('请输入正确的手机号')
									clearInterval(self.setInter)
									self.checkCodeText = '获取验证码';
								} else {
									self.checkCode = res.data.substring(res.data.length - 4, res.data.length);
								}
							},
							complete: (res) => {}
						})
					}
				} else {
					this.showToast('请输入正确的手机号')
				}
			},
			
			//微信登录
			loginByWechat() {
				var self = this;
				self.getUserCode();
				uni.showLoading({
					title: '登录中。。。',
					mask: true
				});
				uni.request({
				  url: self.$store.state.urlPrefix + '/Home/We_Login',
					data: {
						wechat: self.userOriginalCode
					},
				})
				.then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
					uni.hideLoading()
				    var [error, res]  = data;
				    if (res.data == '暂无数据') {
				    	self.showToast('账号或者密码错误')
				    } else {
				    	let userInfo = JSON.parse(res.data);
				    	self.$store.state.userInfo = userInfo[0];
				    	uni.reLaunch({
				    		url: '../home/home'
				    	})
				    }
				})
			},
			
			//获取用户id
			getUserCode() {
				var self = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						self.userOriginalCode = loginRes.code;
						
					}
				});
			},
			
			//账号登录
			loginByAccount() {
				var self = this;
				uni.showLoading({
					title:'登录中...',
					mask:true
				});
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Login',
					data: {
						NM: self.loginForm.account,
						PSD: self.loginForm.password
					}
				}).then(data => {
					uni.hideLoading();
					var [error, res] = data;
					
					if (res.data == '暂无数据') {
						self.showToast('账号或者密码错误')
					} else {
						let userInfo = JSON.parse(res.data);
						console.log(userInfo)
						self.$store.state.userInfo = userInfo[0];
						uni.reLaunch({
							url: '../home/home'
						})
					}
				})
			},
			
			
			//注册
			registerCommit() {
				if (this.yzm != '') {
					if (this.checkCode != this.yzm) {
						this.showToast('请输入正确的验证码')
					} else {
						var self = this;
						uni.request({
							url: self.$store.state.urlPrefix + '/Home/Phone_Zhuche',
							data: {
								phone: self.telNum,
								wechat: self.userOriginalCode
							},
							method: 'GET',
							header: {
								'content-type': 'application/json' // 默认值
							},
							success(res) {
								
								if (res.data == 'no') {
									self.showToast('该手机号没有权限')
									self.checkCode = '';
									self.telNum = '';
									self.yzm = '';
								} else if (res.data == 'ok') {
									uni.showModal({
										title: '提示',
										content: '注册成功',
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												self.TabCur = 0;
											}
										}
									});
									self.checkCode = '';
									self.yzm = '';
									self.telNum = '';
								} else {
									self.showToast('注册失败')
									self.checkCode = '';
									self.yzm = '';
									self.telNum = '';
								}
								clearInterval(self.setInter)
								self.checkCodeText = '获取验证码';
							}
						})
					}
				} else {
					this.showToast('请输入正确的验证码')
				}
			},
			
			commit() {
				if (this.TabCur == 0) {
					this.loginByAccount()
				} else {
					this.registerCommit()
				}
			}
		},
		mounted() {
			this.getUserCode();
		}
	}
</script>

<style>

</style>
