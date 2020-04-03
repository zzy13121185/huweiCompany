<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="false"><block slot="content">{{header}}</block></cu-custom>

		<temHome v-if='active == 1'></temHome>
		<search v-if="active == 2"></search>
		
		
		
		
		
		
		<view v-if="active == 5">
			<view class="user-title" v-if="!isCheckIn">
				忽微交通工程智慧安全
				<view class="user-name">
					{{userInfo.RYMC}}
				</view>
				<view class="user-head">
					<open-data type="userAvatarUrl"></open-data>
				</view>
			</view>
			<view class="user-title" v-if="isCheckIn">
				{{userInfo.DWMC}}
				<view class="user-name">
					{{userInfo.RYMC}}
				</view>
				<view class="user-head">
					<open-data type="userAvatarUrl"></open-data>
				</view>
			</view>
			<view style="width: 600upx;margin: 0 auto;margin-top: 100upx;border-radius: 8px;overflow: hidden;">
				<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
					<view class="cu-item" @click="showModal">
						<button class="content cu-btn">
							<text class="cuIcon-homefill text-olive"></text>
							<text class="text-grey">关于我们</text>
						</button>
					</view>
					<view class="cu-item"  @click="gotoScore" v-if="!isCheckIn">
						<button class="content cu-btn">
							<text class="cuIcon-upload text-olive"></text>
							<text class="text-grey">查看分数</text>
						</button>
					</view>
					<view class="cu-item" @click="gotoFile" v-if="userInfo.ROLEID == 6&&!isCheckIn">
						<button class="content cu-btn">
							<text class="cuIcon-settings text-orange"></text>
							<text class="text-grey">隐患归档</text>
						</button>
					</view>
					<view class="cu-item">
						<button class="cu-btn content" open-type="share">
							<text class="cuIcon-share text-olive"></text>
							<text class="text-grey">分享小程序</text>
						</button>
					</view>
					<view class="cu-item"  @click="reloginCount">
						<button class="cu-btn content">
							<text class="cuIcon-warnfill text-red"></text>
							<text class="text-grey">退出登录</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">关于我们</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					杭州忽微软件有限公司技术支持
				</view>
	
			</view>
		</view>
		
		
		
		<view class="btBar">
			<view class="cu-bar tabbar bg-black">
				<view class="action " :class="{'text-red': active == 1, 'text-gray': active != 1}"  @click="linkTo('home')">
					<view class="cuIcon-homefill"></view>
					首页
				</view>
				<view class="action" @click="linkTo('search')" :class="{'text-red': active == 2, 'text-gray': active != 2}" v-if="!isCheckIn">
					<view class="cuIcon-search"></view>
					查询
				</view>
				<view class="action" @click="linkTo('my')" :class="{'text-red': active == 5, 'text-gray': active != 5}">
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
			title: '忽微交通工程智慧安全',
			path: '/pages/basic/login/login',
			imageUrl: 'http://huwei-soft.com/HWWechat/static/logo.png',
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
			modalName: null,
			show: false,
			BuilderId: null,
			isCheckIn: false
		};
	},
	methods: {
		gotoScore() {
			uni.navigateTo({
				url: '/pages/some/score/score'
			})
		},
		gotoFile() {
			uni.navigateTo({
				url: '/pages/some/dangerFile/dangerFile'
			})
		},
		showModal(e) {
			this.modalName = "Modal"
			console.log(e)
		},
		hideModal(e) {
			this.modalName = null
		},
		//授权
		shouquan() {
			var self = this;
			uni.authorize({
				scope: 'scope.userLocation',
				success(res) {
					
				}
			});
		},
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
		var foo = JSON.parse(this.userInfo.Module);
		this.isCheckIn = foo.checkIn;
		console.log(this.isCheckIn)
		
		
		this.shouquan();
		this.getTodoNum();
	}
};
</script>

<style></style>