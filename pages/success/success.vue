<template>
	<view>
		<view class="done">
			<image class="img" src="../../static/img/342.png" mode=""></image>
			<image class="imgz" src="../../static/img/329.png" mode=""></image>
		</view>
		<view class="content">
			<view class="title">{{describe.title}}</view>
			<view class="dconp">{{describe.contnt}}</view>
		</view>
		<view class="button">
			<view class="left" @click="returnClick">返回</view>
			<view class="right" @click="indexClick">首页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				describe: {
					title: "",
					contnt: "",
					flag: ""
				}
			}
		},
		onLoad(onlen) {
			console.log(onlen);
			if(onlen.sfrz=="sfrz") {
				this.describe.title="身份认证提交成功";
				this.describe.contnt="身份认证已提交，可自由选择返回上一页或首页";
				this.describe.flag=onlen.sfrz;
			}
			if(onlen.sfrz=="dcz") {
				this.describe.title="支付成功";
				this.describe.contnt="您已支付成功，可以自由选择返回上一页或首页";
				this.describe.flag=onlen.sfrz;
			}
			if(onlen.sfrz=='zhifu') {
				this.describe.title="付款成功";
				this.describe.contnt="您已付款，可以自由选择返回上一页或首页";
				this.describe.flag=onlen.sfrz;
			}
			if(onlen.sfrz=='zhifu2') {
				this.describe.title="付款成功";
				this.describe.contnt="您已付款，可以自由选择返回上一页或首页";
				this.describe.flag=onlen.sfrz;
			}
		},
		methods: {
			returnClick() {
				if(this.describe.flag=="sfrz") {
					uni.redirectTo({
						url: "../authen/index"
					})
				}
				if(this.describe.flag=="dcz") {
					uni.switchTab({
						url: "../charge/index"
					})
				}
				if(this.describe.flag=="zhifu") {
					uni.switchTab({
						url: '../bill/index'
					})
				}
				if(this.describe.flag=="zhifu2") {
					uni.switchTab({
						url: '../bill/index'
					})
				}
			},
			indexClick() {
				uni.switchTab({
					url: "../index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.done {
		position: relative;
		.img {
			width: 750rpx;
			height: 600rpx;
		}
		.imgz {
			width: 180rpx;
			height: 180rpx;
			position: absolute;
			top: 200rpx;
			left: 275rpx;
		}
	}
	
	.content {
		text-align: center;
		margin-top: 100rpx;
		.title {
			font-size: 42rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.dconp {
			font-size: 24rpx;
			color: #878D99;
		}
	}
	
	.button {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 60rpx;
		.left {
			width: 305rpx;
			height: 80rpx;
			border-radius: 12rpx;
			background-color: #ECECF4;
			font-size: 32rpx;
			font-weight: 400;
			text-align: center;
			line-height: 75rpx;
			color: #2C2F37;
			margin-left: 40rpx;
		}
		.right {
			width: 305rpx;
			height: 80rpx;
			border-radius: 12rpx;
			background-color: #11A77E;
			font-size: 32rpx;
			font-weight: 400;
			text-align: center;
			line-height: 75rpx;
			color: #FFFFFF;
			margin-left: 60rpx;
		}
	}
</style>
