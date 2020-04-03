<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="false"><block slot="content">{{header}}</block></cu-custom>

		<temHome v-if='active == 1' @gotoTodo="toTodo"></temHome>
		
		<search v-if="active == 2"></search>
		
		<todoList v-if='active == 4'></todoList>
		
		<!-- <user ></user> -->
		
		
		<view v-if="active == 5">
			<view class="user-title">
				电子信息学校
				<view class="user-name">
					{{userInfo.RYMC}}
				</view>
				<view class="user-head">
					<open-data type="userAvatarUrl"></open-data>
				</view>
			</view>
			
			<view style="width: 600upx;margin: 0 auto;margin-top: 100upx;border-radius: 8px;overflow: hidden;">
				<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<button class="content cu-btn">
							<text class="cuIcon-homefill text-olive"></text>
							<text class="text-grey">关于我们</text>
						</button>
					</view>
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<button class="content cu-btn">
							<text class="cuIcon-settings text-olive"></text>
							<text class="text-grey">修改密码</text>
						</button>
					</view>
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<button class="cu-btn content" open-type="share">
							<text class="cuIcon-share text-olive"></text>
							<text class="text-grey">分享小程序</text>
						</button>
					</view>
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<button class="cu-btn content" @click="reloginCount">
							<text class="cuIcon-warnfill text-red"></text>
							<text class="text-grey">退出登录</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		
		<view class="btBar">
			<view class="cu-bar tabbar bg-black">
				<view class="action " :class="{'text-green': active == 1, 'text-gray': active != 1}"  @click="linkTo('home')">
					<view class="cuIcon-homefill"></view>
					首页
				</view>
				<view class="action" @click="linkTo('search')" :class="{'text-green': active == 2, 'text-gray': active != 2}">
					<view class="cuIcon-search"></view>
					查询
				</view>
				<view class="action" @click="linkTo('my')" :class="{'text-green': active == 5, 'text-gray': active != 5}">
					<view class="cuIcon-my"></view>
					我的
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from "../../../utils.js";
export default {
	onShareAppMessage: function(res) {
		
		if (res.from == 'button') {
			
		}
		return {
			title: '电子信息学校',
			path: '/pages/basic/login/login',
			imageUrl: 'http://data.huwei-soft.cn/schooltest/static/logo.png',
			success: function(res) {
				uni.showToast({
				    title: '分享成功',
				    duration: 2000
				});
			}
		};
	},
	data() {
		return {
			userInfo: {},
			todoNum: '',
			active: 1,
			scanMsg: '',
			scanType: '',
			header: '主页',
			menuArrow: true,
			menuBorder: false,
			menuCard: false,
		};
	},
	methods: {
		hide() {
			uni.hideLoading();
		},
		showModel(content) {
			uni.showModal({
			    title: '提示',
			    content: content,
					showCancel: false,
			    success: function (res) {
			        if (res.confirm) {
			            
			        }
			    }
			});
		},
		reloginCount() {
			uni.showModal({
				title: '提示',
				content: '退出登录?',
				success: function(res) {
					if (res.confirm) {
						uni.reLaunch({
							url: '/pages/basic/login/login'
						});
					} else if (res.cancel) {
						
					}
				}
			});
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
				});
		},

		linkTo(name) {
			
			switch (name) {
				case 'home':
					this.active = 1;
					this.header = '首页';
					break;
				case 'search':
					this.active = 2;
					this.header = '搜索';
					break;
				case 'todo':
					this.active = 4;
					this.header = '待办事项';
					break;
				case 'my':
					this.active = 5;
					this.header = '个人中心';
					break;
			}
		},
		scanCode() {
			var self = this;
			uni.showLoading({
				title:'扫描中。。。',
				mask:true
			})
			uni.scanCode({
				success: function(res) {
					
					if (utils.GetUrlParam('id',res.result)) {
						let id = utils.GetUrlParam('id',res.result);
						let type = utils.GetUrlParam('type',res.result) || 'XF';
						// let type = 'XG';
						self.scanMsg = id;
						self.scanType = type;
						if (self.scanType == 'XF') {
							self.active = 3;
							self.header = '消防检查'
						} else if(self.scanType == 'XG'){
							self.active = 6;
							self.header = '巡更检查'
						} else {
							self.active = 7;
							self.header = '区域排查'
						}
						uni.hideLoading();
					} else {
						uni.hideLoading();
						self.showModel('扫描失败')
					}
				},
				fail() {
					self.active = 1;
					self.header = '首页'
					uni.hideLoading();
				}
			})
		},
		gotohome() {
			this.active = 1;
			this.header = '首页';
			this.getTodoNum();
		},
		toTodo() {
			this.active = 4;
			this.header = '待办事项';
			this.getTodoNum();
		}
	},
	mounted() {
		this.userInfo = this.$store.state.userInfo;
		
		this.getTodoNum();
	}
};
</script>

<style></style>