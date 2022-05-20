<template>
	<view id="addBankCard">
		<view class="bank">
			<image class="img" src="../../static/img/42.png" mode=""></image>
			<view class="addTo">添加卡号</view>
		</view>

		<view class="indexUl">
			<view class="indexLi">
				<view class="title">持卡人</view>
				<view class="indexBox">
					<input class="info" type="text" placeholder="持卡人姓名">
				</view>
			</view>

			<view class="indexLi">
				<view class="title">卡号</view>
				<view class="indexBox">
					<input class="info" type="text" placeholder="输入卡号">
				</view>
			</view>

			<view class="indexLi">
				<view class="title">开户行</view>
				<view class="indexBox">
					<input class="info" type="text" placeholder="开户行">
				</view>
			</view>

			<view class="indexLi">
				<view class="title">身份证号</view>
				<view class="indexBox">
					<input class="info" type="text" placeholder="身份证号">
				</view>
			</view>

			<view class="indexLi">
				<view class="title">预留号码</view>
				<view class="indexBox">
					<input class="info" type="text" placeholder="预留号码">
				</view>
			</view>

			<view class="indexLi">
				<input class="uni-input" type="number" placeholder="验证码" />
				<button class="buttonOn" type="default">获取</button>
			</view>
		</view>



		<button @click="withdrawal" class="buttonTo" type="default">添加卡号</button>
	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		withdrawal() {
			uni.navigateTo({
				url: "../withdrawal/withdrawal"
			})
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");
			console.log("qqqqqqqqqqqqqqqqqqqqqqqq");

		},
		mine() {
			console.log(111)
			uni.navigateTo({
				url: "../mine/index"
			})
		}
	}
}
</script>

<style lang="scss" scoped>
button::after {
	border: none;
}

#addBankCard {
	box-sizing: border-box;
	padding: 0 35rpx;

	.return {
		font-size: 35rpx;
		font-weight: bold;
		margin-bottom: 60rpx;
		display: flex;
		margin-top: 110rpx;
	}

	.bank {
		display: flex;
		align-items: center;
		margin: 30rpx 0;

		.img {
			width: 35rpx;
			height: 20rpx;
		}

		.addTo {
			font-size: 26rpx;
			color: #878D99;
			margin-left: 15rpx;
		}
	}

	.indexUl {
		.indexLi {
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			border-bottom: 1rpx solid #CED1D7;
			box-sizing: border-box;
			padding-bottom: 40rpx;
			margin-bottom: 40rpx;

			.indexBox {
				display: flex;
				color: #878D99;
				flex: 1;
				padding-left: 30rpx;

				.info {
					width: 100%;
					text-align: right;
				}
			}

			.buttonOn {
				width: 160rpx;
				height: 50rpx;
				background-color: #D9FFF4;
				border: 1px solid #BEEFD4;
				border-radius: 30rpx;
				font-size: 26rpx;
				color: #04A376;
				box-sizing: border-box;
				line-height: 50rpx;
				margin-right: 0rpx;
			}
		}
	}

	.buttonTo {
		width: 100%;
		height: 80rpx;
		background-color: #01A477;
		color: #fff;
		line-height: 80rpx;
		border-radius: 47rpx;
	}
}
</style>
