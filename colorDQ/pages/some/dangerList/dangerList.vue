<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true"><block slot="backText">返回</block><block slot="content">危险源清单查询</block></cu-custom>
		<view class="cu-form-group margin-top">
			<view class="steptitle">请选择工点</view>
			<view class="content stepFlex">
				{{dangerRoad}}
			</view>
		</view>
		<scroll-view style="height: auto;min-height: 600upx;" scroll-y class="cu-form-group">			
			<view v-if="!showDangerCheckBox">
				<radio-group @change="radioChange" class="block">
					<label v-for="(item ,index) in dangerInfoRow" :key="item.id" class="cu-form-group solid-top">
						<view class="title">
							{{item.XZMC}}
						</view>
						<radio :value="item.XZCD" :checked="index === current"  class="checked"/>
					</label>
				</radio-group>
			</view>
			
			<view v-if="showDangerCheckBox">
				<view class="cu-form-group" v-for="(item,index) in source" :key="index">
					<view class="content stepFlex">{{item.Content}}</view>
					<view class="steptitle" v-if="ROLEID == 3 || ROLEID == 6"><button class='cu-btn bg-grey shadow sm' @tap="showModal" :data-target="item" style="margin-right: 20upx;">修改</button>
					<button class='cu-btn bg-red shadow sm' @click="deleteItem(item)">删除</button></view>
				</view>
			</view>
		</scroll-view>
		
		<view class="padding flex flex-direction" style="width: 750upx;float: right;">
			<button class="cu-btn bg-orange" @click="reset" style="width: 300upx;margin-left: 390upx;">重新选择</button>
		</view>
		
		<view class="padding flex flex-direction" style="width: 750upx;float: right;">
			
			<button class="cu-btn bg-green shadow lg" @click="search">查询</button>
		</view>
		
		
		
		
		<!-- 模态框 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改危险源</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<input v-model="newdec" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-gray text-gray" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="editName">确定</button>
					</view>
				</view>
			</view>
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
			getNext(item) {
				console.log(item);
				var self = this;
				uni.showLoading({
					title: '加载中',
					mask:true
				});
				
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Choose_YS2',
					method: 'GET',
					data: {
						id: item.XZCD,
						RYXH: self.$store.state.userInfo.RYXH
					},
					header: {
						'custom-header': 'application/json'
					},
					success: res => {
						let data = JSON.parse(res.data);
						console.log(data);
						self.dangerCheckBox = data;
						self.dangerRoad = self.dangerRoad + item.XZMC;
						self.showDangerInfo = false;
						self.showDangerCheckBox = true;
						uni.hideLoading();
					}
				});
			},
			search() {
				var self = this;
				if (!self.choose) {
					self.showMoadel('请选择工点!');
				} else {
					uni.showLoading({
						title:'查询中。。。',
						mask:true
					});
					setTimeout(() => {
						uni.request({
							url: `${self.$store.state.urlPrefix}/home/Get_JournalAccount`,
							data: {
								XZCD: self.choose
							}
						}).then(data => {
							var [error, res] = data;
							// console.log(res.data)
							if (res.data != '[]') {
								console.log(JSON.parse(res.data))
								self.source = JSON.parse(res.data);
								self.showDangerCheckBox = true;
							} else {
								self.showMoadel('此处没有危险源！')
							}
							uni.hideLoading();
						})
					},1000)
				}
				
			},
			commit() {
				var self = this;
				if (!self.choose) {
					self.showMoadel('请选择工点！');
				} else if (!self.place) {
					self.showMoadel('请输入危险源！');
				} else {
					uni.showLoading({
						title:'提交中。。。',
						mask: true
					})
					setTimeout(() => {
						uni
							.request({
								url: `${self.$store.state.urlPrefix}/home/Add_JournalAccount`,
								data: {
									content: self.place,
									userid: self.$store.state.userInfo.RYXH,
									XZCD: self.choose
								}
							})
							.then(data => {
								var [error, res] = data;
								
								uni.hideLoading();
								
								if (res.data.code == 0) {
									self.showMoadel('添加成功')
								} else {
									self.showMoadel('添加失败')
								}
								self.place = '';
								self.reset();
							});
					},1000)
				}
			},
			deleteItem(item) {
				var self = this;
				uni.showModal({
				    title: '提示',
				    content: '是否删除该危险源？',
						confirmColor: '#F56C6C',
				    success: function (res) {
				        if (res.confirm) {
				            uni.showLoading({
				            	title: '删除中。。。',
											mask:true
				            })
										setTimeout(() => {
											uni.request({
												url: `${self.$store.state.urlPrefix}/home/Delete_JournalAccount`,
												data: {
													id: item.ID,
													userid: self.$store.state.userInfo.RYXH,
												}
											}).then(data => {
												var [error, res] = data;
												if (res.data.code == 0) {
													self.showMoadel('删除成功');
													for (let i=0;i<self.source.length;i++) {
														if (self.source[i].ID == item.ID) {
															self.source.splice(i,1)
														}
													}
												} else {
													self.showMoadel('删除失败')
												}
												uni.hideLoading();
											})
										},1000)
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},

			showModal(e) {
				this.newdec = e.currentTarget.dataset.target.Content;
				this.chooseed = e.currentTarget.dataset.target;
				this.modalName = "Modal"
				console.log(e)
			},
			hideModal(e) {
				this.modalName = null
			},
			editName() {
				var self = this;
				self.modalName = null;
				uni.showLoading({
					title:'修改中。。。',
					mask:true
				});
				setTimeout(() => {
					uni.request({
						url: `${self.$store.state.urlPrefix}/home/Amend_JournalAccount`,
						data: {
							content: self.newdec,
							id: self.chooseed.ID
						}
					}).then(data => {
						var [error, res] = data;
						console.log(res.data)
						if (res.data.code == 0) {
							self.showMoadel('修改成功')
							for (let i=0;i<self.source.length;i++) {
								if (self.source[i].ID == self.chooseed.ID) {
									self.source[i].Content = self.newdec;
								}
							}
						} else {
							self.showMoadel('修改失败')
						}
						uni.hideLoading();
					})
				},1000)
			}
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
.stepFlex{
	flex: 1;
}
</style>
