<template>
	<view>
		<view class="home-img bg-red">
			<view class="home-header-name" v-if="!info.FirstDWID">{{ info.DWMC }}</view>
			<view class="home-header-name" v-if="info.FirstDWID">
				<view @click="chooseDwmc" style="font-size: 14px;">{{ namet }}</view>
			</view>
		</view>

		<view class="margin-top">
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" @click="jump(item.type)">
					<view>
						<image :src="item.url" mode="aspectFit" class="search-icon"></image>
						<view class="cu-tag badge" v-if="item.type == 'todo' && todoNum">
							<block>{{todoNum}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
				<view class="cu-item" v-if="isCheckIn">
					<picker mode="date" :value="date" start="2020-03" :end="today" @change="DateChange" fields="month">
						<view>
							<image src="http://huwei-soft.com/HWWechat/static/grid.png" mode="aspectFit" class="search-icon"></image>

						</view>
						<text>考勤表下载</text>
					</picker>
				</view>
			</view>
		</view>

		<form v-if="!isCheckIn">

			<view class="cu-form-group margin-top" @click="gotoDangerList">
				<view class="steptitle">当前隐患数量：</view>
				<view class="content stepFlex">
					<text class="smallBoxItemright-text">{{DYYHS}}</text>个
				</view>
			</view>
			<view class="cu-form-group">
				<view style="width: 100%;text-align: center;">本月统计情况<text class="cuIcon-triangledownfill text-orange"></text></view>
			</view>
			<view class="cu-form-group" @click="gotoShowData">
				<view class="steptitle">隐患整改完成率：</view>
				<view class="content stepFlex">
					<text class="smallBoxItemright-text">{{dangerPer}}</text>%
				</view>
			</view>
			<view class="cu-form-group" @click="gotoShowData">
				<view class="steptitle">隐患整改数量：</view>
				<view class="content stepFlex">
					<text class="smallBoxItemright-text">{{taskNum}}</text>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import uniBadge from "@/common/uni-badge/uni-badge.vue";
	import now from "../../getTime.js";
	export default {
		name: 'temHome',
		props: {
			msg: {
				type: String,
				default: ''
			}
		},
		components: {
			uniBadge
		},
		data() {
			return {
				todoNum: '',
				date: '',
				info: {},
				DYYHS: 0,
				DQPCRWS: 0,
				dangerPer: 0,
				hasRight: false,
				namet: '请选择单位',
				dwmcRowList: [],
				dwmcRow: [],
				taskNum: 0,
				gridCol: 3,
				gridBorder: false,
				cuIconList: [],
				showBuilderROLEID: 1,
				showTable: true,
				isCheckIn: false,
				today: ''
			};
		},
		mounted() {
			this.date = now.nowmonth()
			this.today = now.nowmonth()
			if (this.$store.state.userInfo.FirstDWID) {

				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Admin/Get_ChildDWByParentID',
					method: 'GET',
					data: {
						parentId: this.$store.state.userInfo.FirstDWID
					},
					header: {
						'custom-header': 'application/json'
					},
					success: res => {
						// console.log(res.data.data)
						if (res.data.data.length > 0) {
							self.dwmcRow = res.data.data;
							// console.log(self.dwmcRow)
							for (let s of res.data.data) {
								if (s.SimpleDWMC != '') {
									self.dwmcRowList.push(s.SimpleDWMC)
								} else {
									self.dwmcRowList.push(s.DWMC)
								}

							}
						}
						// console.log(self.dwmcRowList)
					}
				});
			}
			this.info = this.$store.state.userInfo;
			console.log(this.info.Module, typeof(this.info.Module), JSON.parse(this.info.Module));
			var foo = JSON.parse(this.info.Module);
			this.isCheckIn = foo.checkIn;
			if (!this.isCheckIn) {
				this.cuIconList = [{
						url: 'http://huwei-soft.com/HWWechat/static/dengji.png',
						type: 'task',
						name: '危险源清单'
					}, {
						url: 'http://huwei-soft.com/HWWechat/static/todo.png',
						type: 'todo',
						name: '待办事项'
					}, {
						url: 'http://huwei-soft.com/HWWechat/static/commit.png',
						type: 'report',
						name: '隐患上报'
					}, {
						url: 'http://huwei-soft.com/HWWechat/static/renwu.png',
						type: 'file',
						name: '上级整改通知'
					},
					{
						url: 'http://huwei-soft.com/HWWechat/static/diary.png',
						type: 'diary',
						name: '安全施工日志'
					}

				]
				this.getTodoNum();
				this.getComplete();
				this.showTable = true;
			} else {

				this.showTable = false;
				this.cuIconList = [{
						url: 'http://huwei-soft.com/HWWechat/static/diary.png',
						type: 'check',
						name: '考勤'
					},
					{
						url: 'http://huwei-soft.com/HWWechat/static/chaxun2.png',
						type: 'checkSearch',
						name: '考勤查询'
					}

				]
			}
		},
		onLoad() {

		},
		methods: {
			zzy(path) {
				uni.downloadFile({
					url: path,
					success: res => {
						if (res.statusCode === 200) {
							// console.log(res.tempFilePath);
							var tempFilePath = res.tempFilePath;

							uni.openDocument({
								filePath: tempFilePath,
								success() {

								}
							})
						}
					}
				});
			},
			DateChange(e) {
				var self = this;
				uni.showModal({
					title: '提示',
					content: '是否下载该月统计表？',
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							self.date = e.detail.value;
							uni.showLoading({
								title: '下载中。。。',
								mask: true
							})
							uni.request({
								url: self.$store.state.urlPrefix + '/Web/Get_BuildersInfoExcel',
								method: 'GET',
								data: {
									time: self.date,
								},
								header: {
									'custom-header': 'application/json'
								},
								success: res => {
									uni.hideLoading();
									if (res.data.code == 0) {
										self.zzy(res.data.data);
									} else {
										uni.showModal({
											title: '提示',
											content: '下载失败',
											showCancel: false,
											success: function(res) {
												if (res.confirm){}
											}
										})
									}
									
								}
							});
						} else if (res.cancel) {

						}
					}
				});

				console.log(e)
			},
			jump(type) {
				switch (type) {
					case 'report':
						uni.navigateTo({
							url: '/pages/some/report/report'
						});
						break;
					case 'task':
						if (this.$store.state.userInfo.ROLEID == 6 || this.$store.state.userInfo.ROLEID == 3) {
							uni.navigateTo({
								url: '/pages/some/dangerListSearch/dangerListSearch'
							});
						} else {
							uni.navigateTo({
								url: '/pages/some/dangerList/dangerList'
							})
						}

						break;
					case 'todo':
						uni.navigateTo({
							url: '/pages/some/todoPage/todoPage'
						});
						break;
					case 'file':
						if (this.$store.state.userInfo.ROLEID == 6 || this.$store.state.userInfo.ROLEID == 3) {
							uni.navigateTo({
								url: '/pages/some/topNotice/topNotice'
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '没有权限',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {}
								}
							});
						}
						break;
					case 'diary':
						if (this.$store.state.userInfo.ROLEID == 6 || this.$store.state.userInfo.ROLEID == 3) {
							uni.navigateTo({
								url: '/pages/some/taskTroubleshooting/taskTroubleshooting'
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '没有权限',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {}
								}
							});
						}
						break;
					case 'check':

						if (this.$store.state.userInfo.BuilderROLEID == 27) {
							uni.navigateTo({
								url: '/pages/some/checkCard/checkCard'
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '没有权限',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {}
								}
							});
						}
						break;
					case 'checkSearch':
						uni.navigateTo({
							url: '/pages/some/checkSearch/checkSearch'
						})
						break;
					case 'download':
						console.log('download');
						break;
				}
			},
			gotoShowData() {
				uni.navigateTo({
					url: '/pages/some/showData/showData'
				})
			},
			gotoDangerList() {
				uni.navigateTo({
					url: '/pages/some/searchDanger/searchDanger'
				})
			},
			getComplete() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_YHCompletion',
					method: 'GET',
					data: {
						DWCD: self.$store.state.userInfo.DWCD
					},
					header: {
						'custom-header': 'application/json'
					},
					success: res => {
						var data = res.data;
						console.log(data)
						self.DYYHS = data[0].CurProblemsTotal || 0;
						self.taskNum = data[0].MonthFinishTotal || 0;
						if (data[0].MothProblemsTotal != 0) {
							self.dangerPer = Math.floor((data[0].MonthFinishTotal / data[0].MothProblemsTotal) * 100);
						} else {
							self.dangerPer = 0;
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
						// self.todoNum = '';
						// console.log(self.todoNum)
					});
			},

			//选择单位
			chooseDwmc() {
				// this.showDwmc = true;
				var self = this;
				uni.showActionSheet({
					itemList: self.dwmcRowList,
					success: function(res) {
						for (let s of self.dwmcRow) {
							if (self.dwmcRowList[res.tapIndex] == s.DWMC || self.dwmcRowList[res.tapIndex] == s.SimpleDWMC) {
								self.info.DWCD = s.DWCD;
								self.$store.state.userInfo.DWCD = s.DWCD;
								if (s.SimpleDWMC != '') {
									self.info.DWMC = s.SimpleDWMC;
									self.$store.state.userInfo.DWMC = s.SimpleDWMC;
									self.namet = s.SimpleDWMC;
								} else {
									self.info.DWMC = s.DWMC;
									self.$store.state.userInfo.DWMC = s.DWMC;
									self.namet = s.DWMC;
								}

								self.getTodoNum();
								self.getComplete();
							}
						}

					},
					fail: function(res) {

					}
				});
			}
		}
	};
</script>

<style>
	.home-img {
		width: 750upx;
		height: 140upx;
	}

	.home-img image {
		width: 100%;
		height: 100%;
	}

	.home-header-name {
		position: relative;
		height: 80upx;
		line-height: 60upx;
		text-align: center;
		color: white;
		font-size: 16px;
		padding: 0 20upx;
		top: 40upx;
		/* margin-top: 40upx; */
	}



	.smallBoxItemright-text {
		font-size: 22px;
		color: #f56c6c;
	}

	.search-icon {
		width: 60upx;
		height: 60upx;
	}
</style>
