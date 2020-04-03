<template>
	<view id="yhsb">
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">隐患上报</block>
		</cu-custom>

		<view class="cu-form-group">
			<view class="steptitle">隐患路径：</view>
			<view class="content stepFlex">
				{{dangerRoad}}{{chooedYS}}
			</view>
		</view>


		<scroll-view id="arrRow" style="600upx" scroll-y class="margin-top">


			<view v-if="!showDangerCheckBox">
				<view class="cu-list menu text-left solid-top" v-for="(item,index) in dangerInfoRow" :key="index" @click="getNext(item)">
					<view class="cu-item">
						<view class="content">
							<text class="text-black">{{item.XZMC}}</text>
						</view>
						<view class="action">
							<text class="cuIcon-right"></text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="showSearch" v-for="(item,index) in searchArr" :key="index">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange "></text>{{item.path}}
					</view>
				</view>
				<radio-group class="block" @change="searchradioChange" :data-info="index" :data-name="item.YSMC" style="box-sizing: border-box;padding-left: 60upx;background-color: #FFFFFF;">

					<view class="cu-form-group" v-for="(foo,indexx) in item.data" :key="indexx">
						<view class="title" style="height: auto;">{{foo.YSMC}}</view>
						<radio :value="foo.YSCD" :checked="foo.ischeck"></radio>
					</view>

				</radio-group>
			</view>
			<view v-if="showDangerCheckBox">
				<radio-group @change="radioChange" class="block">
					<label v-for="(item ,index) in dangerCheckBox" :key="item.id" class="cu-form-group solid-top">
						<view class="title">
							{{item.YSMC}}
						</view>
						<radio :value="item.YSCD" :checked="index === current" class="checked" />
					</label>
				</radio-group>
			</view>

		</scroll-view>

		<view class="cu-form-group margin-top" v-if="clickTime>0">
			<view class="title">隐患搜索</view>
			<input placeholder="请输入关键字" name="input" v-model="searchText"></input>
			<button class='cu-btn bg-green shadow' @click="search"><text class="cuIcon-search"></text>搜索</button></button>
		</view>
		<view class="cu-form-group margin-top">
			<view class="steptitle">排查要点：</view>
			<view class="content stepFlex">
				{{pcyd}}
			</view>
		</view>
		<view class="padding flex flex-direction" style="width: 300upx;float: left;">
			<button class="cu-btn bg-red" @click="reset">返回</button>
		</view>

		<view class="padding flex flex-direction" style="width: 300upx;float: right;">
			<button class="cu-btn bg-green" @click="gotoDetail">下一步</button>
		</view>
	</view>
</template>

<script>
	import utils from "../../../utils.js";
	export default {
		data() {
			return {
				radio: '',
				originalData: [],
				dangerInfoRow: [],
				dangerCheckBox: [],
				showDangerCheckBox: false,
				current: -1,
				choose: '',
				pcyd: '',
				dangerRoad: '',
				chooedYS: '',
				chooedXZCD: '',
				clickTime: 0,
				placeName: '',
				searchText: '',
				searchArr: [],
				showSearch: false
			}
		},
		methods: {
			// 对象归类
			dataSource(arr) {
				var map = {},
					dest = [];
				for (var i = 0; i < arr.length; i++) {
					var ai = arr[i];
					if (!map[ai.path]) {
						dest.push({
							path: ai.path,
							YSMC: ai.YSMC,
							data: [ai]
						});
						map[ai.path] = ai;
					} else {
						for (var j = 0; j < dest.length; j++) {
							var dj = dest[j];
							if (dj.path == ai.path) {
								dj.data.push(ai);
								break;
							}
						}
					}
				}

				for (let i = 0; i < dest.length; i++) {
					for (let j = 0; j < dest[i].data.length; j++) {
						dest[i].data[j].ischeck = false
					}
				}
				console.log(dest)
				this.searchArr = dest;
				this.showDangerCheckBox = true;
			},
			search() {
				// console.log(this.chooedXZCD)
				var self = this;
				if (!self.chooedXZCD) {
					self.showMoadel('请选择班组！')
				} else {
					if (self.searchText) {
						uni.showLoading({
							title: '搜索中',
							mask: true
						})
						uni.request({
							url: self.$store.state.urlPrefix + '/Home/Query_YH',
							method: 'GET',
							data: {
								BZCD: self.chooedXZCD,
								// key: self.searchText.replace(/\s+/g,"")
								keywords: self.searchText.replace(/\s+/g, "")
							},
							header: {
								'custom-header': 'application/json'
							},
							success: (res) => {

								uni.hideLoading()
								if (res.data.code == 0) {
									self.dataSource(res.data.data);
									self.showSearch = true;
								} else {
									self.showMoadel(res.data.msg)
								}

							}
						});
					} else {
						self.showMoadel('请输入搜索内容')
					}
				}
			},
			reset() {
				this.dangerInfoRow = this.originalData;
				this.dangerCheckBox = [];
				this.showDangerCheckBox = false;
				this.dangerRoad = '';
				this.choose = '';
				this.pcyd = '';
				this.current = -1;
				this.chooedYS = '';
				this.dangerRoad = '';
				this.clickTime = 0;
				this.chooedXZCD = '';
				this.showSearch = false;
				this.searchArr = [];
				this.searchText = '';
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
			getInfo() {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Home/Get_AllBZ',
					data: {
						DWCD: self.$store.state.userInfo.DWCD
					},
					method: 'GET',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {

						let data = JSON.parse(res.data)
						if (res.data.length == 0) {
							self.showMoadel('此处没有隐患源')
						} else {
							self.originalData = data;
							self.dangerInfoRow = data;
						}
					}
				})
			},
			getPCYD(YSCD) {
				var self = this;
				uni.request({
					url: self.$store.state.urlPrefix + '/Process/Get_PCYD',
					method: 'GET',
					data: {
						YSCD: YSCD
					},
					header: {
						'custom-header': 'application/json'
					},
					success: res => {
						self.pcyd = res.data;
					}
				});
			},
			searchradioChange: function(evt) {

				console.log(evt.currentTarget.dataset.name)
				this.getPCYD(evt.target.value)
				this.chooedYS = evt.currentTarget.dataset.name;
				this.choose = evt.target.value;
				for (let i = 0; i < this.searchArr.length; i++) {
					for (let j = 0; j < this.searchArr[i].data.length; j++) {
						this.searchArr[i].data[j].ischeck = false;
						if (this.searchArr[i].data[j].YSCD == evt.target.value) {
							this.searchArr[i].data[j].ischeck = true;

						}
					}
				}


			},
			radioChange: function(evt) {

				this.getPCYD(evt.target.value)
				for (let i = 0; i < this.dangerCheckBox.length; i++) {
					if (this.dangerCheckBox[i].YSCD === evt.target.value) {
						this.chooedYS = this.dangerCheckBox[i].YSMC;
						this.current = i;
						this.choose = evt.target.value;
						console.log(this.choose)
						break;
					}
				}
			},
			getNext(item) {
				var self = this;

				uni.showLoading({
					title: '加载中',
					mask: true
				})
				if (self.clickTime == 0) {
					self.chooedXZCD = item.XZCD;
				}

				self.clickTime = self.clickTime + 1;
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
					success: (res) => {
						let data = JSON.parse(res.data);
						if (data.length == 0) {
							self.showMoadel('此处没有隐患源')
						} else if (data[0].XZMC) {
							self.dangerInfoRow = data;
							self.dangerRoad = self.dangerRoad + item.XZMC + ' // ';
						} else {
							self.dangerCheckBox = data;
							self.dangerRoad = self.dangerRoad + item.XZMC + ' // ';
							self.showDangerCheckBox = true;
						}
						uni.hideLoading()
					},

				});
			},
			gotoDetail() {
				if (!this.choose) {
					this.showMoadel('请选择隐患源！')
				} else {
					uni.navigateTo({
						url: '../reportDetail/reportDetail?yscd=' + this.choose + "&name=" + this.chooedYS + "&firstlevel=" + this.chooedXZCD
					})
				}
			}
		},
		onLoad(option) {

		},
		mounted() {
			this.getInfo()
		}
	}
</script>

<style>
	#yhsb .cu-list+.cu-list {
		margin-top: 1upx
	}

	#yhsb .task-toast {
		width: 710upx;
		height: 110upx;
		line-height: 2;
		margin: 0 auto;
	}

	#yhsb .dangerToast {
		color: #F56C6C;
		text-indent: 1em;
		font-size: 16px;
	}

	#yhsb .footItem {
		position: fixed;
		z-index: 1111;
		bottom: 0upx;
		width: 750upx;
		height: 240upx;
	}

	.steptitle {
		text-align: justify;
		padding-right: 30upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		width: 200upx;
	}

	.stepFlex {
		flex: 1;
	}
</style>
