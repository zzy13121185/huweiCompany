<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">安全施工日志</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 施工现场安全状况
			</view>

		</view>
		<view v-for="(item,number) in tableData" :key="number">
			<view class="cu-form-group borderTop" :class="{'margin-top' : number==4}">
				<view class="title" :class="{sll : number<4}">{{item.name}}</view>
				<switch class='olive' @change="SwitchB" :class="item.switch?'checked':''" :checked="item.switch?true:false"
				 :data-info="number"></switch>
			</view>
			<view v-if="!item.switch">
				<view class="cu-bar bg-white borderTop sll">
					<view class="action">
						图片上传
					</view>
					<view class="action">
						{{item.imgList.length}}/4
					</view>
				</view>
				<view class="cu-form-group slll">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(foo,index) in item.imgList" :key="index" @tap="ViewImage" :data-url="item.imgList[index]"
						 :data-info="number">
							<image :src="item.imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index" :data-info="number">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="item.imgList.length<4" :data-info="number">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-form-group align-start slll">
					<view class="title">状况描述:</view>
					<textarea maxlength="-1" :placeholder="item.placeholder" @input="textareaDInput" v-model="item.content" :data-info="number" />
					</view>
			</view>
		</view>
		
	
		<view class="padding flex flex-direction" style="width: 300upx;float: left;">
			<button class="cu-btn bg-red" @click="reset">重新填写</button>
		</view>
		
		<view class="padding flex flex-direction" style="width: 300upx;float: right;">
			<button class="cu-btn bg-green" @click="gotoDetail">提交</button>
		</view>
	</view>
</template>

<script>
	import getTime from "../../../getTime.js";
	export default {
		data() {
			return {
				tableData: [
					{
						switch: true,
						imgList: [],
						content: '',
						name: '安全防护',
						placeholder: '请输入安全防护情况',
						id: 1
					},
					{
						switch: true,
						imgList: [],
						content: '',
						name: '安全警示标志设置',
						placeholder: '请输入安全警示标志设置情况',
						id: 2
					},
					{
						switch: true,
						imgList: [],
						content: '',
						name: '作业人员防护用品佩戴情况',
						placeholder: '请输入作业人员防护用品佩戴情况',
						id: 3
					},
					{
						switch: true,
						imgList: [],
						content: '',
						name: '其他',
						placeholder: '请输入其他情况',
						id: 4
					},
					{
						switch: true,
						imgList: [],
						content: '',
						name: '危险性较大工程施工安全措施落实',
						placeholder: '请输入危险性较大工程施工安全措施落实情况',
						id: 5
					},
					{
						switch: true,
						imgList: [],
						content: '',
						name: '施工临时用电安全措施落实',
						placeholder: '请输入施工临时用电安全措施落实情况',
						id: 6
					},
					{
						switch: true,
						imgList: [],
						content: '',
						name: '危险源，危险点安全监控措施及销号',
						placeholder: '请输入危险源，危险点安全监控措施及销号情况',
						id: 7
					},
					{
						switch: true,
						imgList: [],
						content: '',
						name: '其他有关活动记录',
						placeholder: '请输入其他有关活动记录',
						id: 8
					},
				],
				lon: '',
				lat: '',
				uploadTime: 0
			}
		},
		methods: {
			showMoadel(title) {
				uni.showModal({
					title: '提示',
					content: title,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							
						}
					}
				});
			},
			showMoadels(title) {
				uni.showModal({
					title: '提示',
					content: title,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url:"../../basic/home/home"
							})
						}
					}
				});
			},
			getLocation() {
				var self = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log(res)
						self.lon = res.longitude;
						self.lat = res.latitude;
					}
				});
			},
			gotoDetail() {
				var info = [];
				var uploadArr = [];
				for (let foo of this.tableData) {
					if (!foo.switch) {
						if (foo.imgList.length == 0 || foo.content == '') {
							this.showMoadel("请完善信息!");
							break;
						}
					} 
				}
				
				
				for (let s of this.tableData) {
					info.push({
						isSafe: s.switch,
						id: s.id,
						content: s.content
					})
					if (!s.switch) {
						uploadArr.push({
							id: s.id,
							data: s.imgList
						})
					}
				}
				
				console.log(uploadArr);
				var sum = 0;
				var len = uploadArr.length;
				for (let i = 0;i<len;i++) {
					sum = sum + uploadArr[i].data.length;
				}
				console.log(sum);
				var self = this;
				uni
					.request({
						url: self.$store.state.urlPrefix + '/Home/Add_SafetyConstructionDiary',
						data: {
							userid: self.$store.state.userInfo.RYXH,
							detail: JSON.stringify(info),
							lat: self.lat,
							lng: self.lon
						}
					})
					.then(data => {
						var [error, res] = data;
						console.log(res);
						if (res.data.code == 0) {
							for (let first of uploadArr) {
								for (let path of first.data) {
									self.uploadImgid(first.id,path,sum,res.data.data)
								}
							}
						} else {
							self.showMoadels(res.data.msg)
						}
					});
			},
			
			uploadImgid(id,path,sum,numb) {
				var self = this;
				var postImgUrl = self.$store.state.urlPrefix + '/Home/Add_SafetyConstructionDiaryImg';
				uni.uploadFile({
					url: postImgUrl,
					filePath: path,
					name: 'image',
					formData: {
						userid: self.$store.state.userInfo.RYXH,
						explain: "",
						typeId: id,
						id: numb
					},
					success(res) {
						console.log(res);
						self.uploadTime = self.uploadTime + 1;
						if (res.data == "ok") {
							if (self.uploadTime == sum) {
								self.showMoadels('图片上传成功')
							}
						} else {
							self.showMoadels('图片上传失败！')
						}
					}
				})
			},
			SwitchB(e) {
				console.log(e)
				var z = e.currentTarget.dataset.info;
				// this.infoRow[z].switch = e.detail.value
				
				this.tableData[z].switch = e.detail.value;
				this.tableData[z].content = '';
				this.tableData[z].imgList = [];
			},
			
			textareaDInput(e) {
				// z代表数组的第几个元素
				var z = e.currentTarget.dataset.info;
				this.tableData[z].content = e.detail.value
			},
			ChooseImage(e) {
				var z = e.currentTarget.dataset.info;
				console.log(e)
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'], //从相册选择
					success: (res) => {
						if (this.tableData[z].imgList.length != 0) {
							this.tableData[z].imgList = this.tableData[z].imgList.concat(res.tempFilePaths)
						} else {
							this.tableData[z].imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				var z = e.currentTarget.dataset.info;
				uni.previewImage({
					urls: this.tableData[z].imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				var z = e.currentTarget.dataset.info;
				uni.showModal({
					title: '提示',
					content: '确定要删除这张照片？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.tableData[z].imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		},

		mounted() {
			this.getLocation()
		}
	}
</script>

<style>
.borderTop{
	border-top: 1rpx solid #eee;

}
.sll{
	padding-left: 40upx;
}
.slll{
	padding-left: 70upx;
}
</style>
