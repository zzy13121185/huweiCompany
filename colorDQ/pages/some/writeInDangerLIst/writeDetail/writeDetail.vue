<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">危险源清单录入</block>
		</cu-custom>
		<view>
			<form>

				<view v-for="(item,index) in arr" :key="index">
					<view class="cu-form-group margin-top">
						<view class="title">隐患源:</view>
						<input placeholder="请输入隐患源名称" name="input" @input="textareaBInput" :data-info="index" :value="item"></input>
						<button class='cu-btn bg-red shadow' @click="deleteNum" :data-info="index" v-if="index>0"><text class="cuIcon-delete"></text></button>
					</view>
				</view>

			</form>
		</view>

		<view class="padding flex flex-direction" style="width: 300upx;float: left;">
			<button class="cu-btn bg-gradual-orange" @click="add"><text class="cuIcon-add"></text>添加隐患源</button>
		</view>

		<view class="padding flex flex-direction" style="width: 300upx;float: right;">
			<button class="cu-btn bg-green" @click="commit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choose: '',
				arr: ['']
			}
		},
		methods: {
			deleteNum(e) {
				console.log(e)
				var a = e.currentTarget.dataset.info;

				var c = [];
				for (let i = 0; i < this.arr.length; i++) {
					if (i != a) {
						c.push(this.arr[i])
					}
				}
				console.log(c)
				this.arr = c;

			},
			textareaBInput(e) {
				console.log(e)
				var a = e.currentTarget.dataset.info;
				this.arr[a] = e.detail.value;
			},
			add() {
				this.arr.push('')
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
			commit() {
				console.log(this.arr)

				var self = this;
				if (!this.arr.every((item, index, array) => {
						return item != '';
					})) {
					self.showMoadel('请输入完整内容！');
				} else {
					var content = self.arr.join("*");
					uni.showLoading({
						title: '提交中。。。',
						mask: true
					})
					setTimeout(() => {
						uni
							.request({
								url: `${self.$store.state.urlPrefix}/home/Add_JournalAccount`,
								data: {
									contents: content,
									userid: self.$store.state.userInfo.RYXH,
									XZCD: self.choose
								}
							})
							.then(data => {
								var [error, res] = data;

								uni.hideLoading();

								if (res.data.code == 0) {
									uni.showModal({
										title: '提示',
										content: "添加成功",
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												uni.navigateBack();
											}
										}
									});
								} else {
									self.showMoadel('添加失败')
								}
								self.arr = ['']
							});
					}, 1000)
				}
			},
		},
		onLoad(option) {
			console.log(option)
			this.choose = option.id;
		}
	}
</script>

<style>

</style>
