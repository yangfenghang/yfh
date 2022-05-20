<template>
	<view id="grid">
		<view class="title">报修内容</view>
		<view class="box">
			<textarea id="editor" v-model="list.comm" @input="quantity" placeholder="请输入报修内容" maxlength="500" />
			<view class="pot">{{num}}/500</view>
		</view>
		<view class="butbox">
			<view v-if="buttonflag==1" class="button" @click="tijiao">提交</view>
			<view v-else class="button2">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		tbBxjl
	} from "../../api/index.js"
	export default {
		data() {
			return {
				buttonflag: 1,
				num: 0,
				list: {
					comm: '',
					phone: '',
					createBy: '',
				}
			}
		},
		onLoad() {
			this.list.createBy = uni.getStorageSync('userInfo').username;
			this.list.phone = uni.getStorageSync('userInfo').phone;
		},
		methods: {
			quantity(e) {
				this.num = e.detail.value.length
			},
			tijiao() {
				if (this.list.comm == '') {
					uni.showModal({
						content: '请输入报修内容'
					})
					return
				} else {
					this.buttonflag=2;
					uni.showLoading({
						title: '提交中'
					});
					tbBxjl(this.list).then(res => {
						console.log(res);
						if (res.success) {
							uni.showModal({
								content: '提交成功',
								success: (res) => {
									if (res.confirm) {
										this.buttonflag=1
										this.list.comm=''
									} else if (res.cancel) {
										this.buttonflag=1
										this.list.comm=''
									}
								}
							})
						} else {
							uni.showToast({
								title: '提交失败',
								icon: "error"
							})
							this.buttonflag=1
						}
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	#grid {
		padding: 40rpx;

		.title {
			font-size: 35rpx;
			font-weight: bold;
			margin-bottom: 40rpx;
		}

		.box {
			position: relative;

			.pot {
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
				color: #D3D3D3;
			}
		}
	}

	#editor {
		width: 670rpx;
		height: 260rpx;
		border: 1px solid #CED1D7;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		padding: 20rpx;
		box-sizing: border-box;
		margin: 0 auto;
	}

	.butbox {
		position: fixed;
		bottom: 60rpx;
		left: 40rpx;

		.button {
			width: 670rpx;
			height: 80rpx;
			font-size: 30rpx;
			background-color: #38AE8E;
			border-radius: 47rpx;
			text-align: center;
			line-height: 75rpx;
			color: #FFFFFF;
		}

		.button2 {
			width: 670rpx;
			height: 80rpx;
			font-size: 30rpx;
			background-color: #ECECF4;
			border-radius: 47rpx;
			text-align: center;
			line-height: 75rpx;
			color: #FFFFFF;
		}
	}
</style>
