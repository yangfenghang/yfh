<template>
	<view>
		<u-navbar :is-back="false" :border-bottom="false" title="充值" title-color="#fff" :title-bold="true"
			:background="background"></u-navbar>
		<view class="content">
			<view class="charge_top">
				<view class="h_title">
					<image src="@/static/img/42.png" mode="heightFix"
						style="width:auto;height: 20rpx;margin: auto 20rpx auto 0;"></image>
					<view class="left">充值缴费</view>
				</view>
				<view class="charge_boxs">
					<view class="item" v-for="(item,index) in charges" :key="index"
						:class="{active:charge_index == index}" @click="charge_index=index">
						{{item}}元
						<image v-if="charge_index==index" class="dg" src="@/static/img/dg.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="center">
				<p>其他充值金额</p>
				<view class="bor_number" @click="showNumber=true">
					{{charge_money}}
				</view>
			</view>
			<view class="play_type">
				<view class="h_title">
					<view class="left">选择支付方式</view>
				</view>
				<!-- <view class="item" @click="type=2">
					<image style="width: 55rpx;height: auto;" src="@/static/img/63.png" mode="widthFix"></image>
					<view class="title">支付宝</view>
					<u-radio-group style="margin: auto 0 auto auto;" v-model="type">
						<u-radio name="2" active-color="#0FA77D"></u-radio>
					</u-radio-group>
				</view> -->
				<view class="item" @click="type=1">
					<image style="width: 55rpx;height: auto;" src="@/static/img/64.png" mode="widthFix"></image>
					<view class="title">微信</view>
					<u-radio-group style="margin: auto 0 auto auto;" v-model="type">
						<u-radio name="1" active-color="#0FA77D"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="paly_btn">
				<view class="hj">
					合计：<span>￥{{hj}}</span>
				</view>
				<view class="btn" @click="charge">
					充值
				</view>
			</view>
		</view>
		<u-keyboard mode="number" v-model="showNumber" @change="changeNumber" :dot-enabled="false"
			@backspace="backspace"></u-keyboard>
		<u-tabbar v-model="current" :list="tabbar" active-color="#04A376"></u-tabbar>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { open_charge } from "@/api/index.js"
	import tabbar from "@/tabbar.js"
	export default {
		data() {
			return {
				current: 2,
				tabbar: tabbar.list,
				charge_index: null, //选择充值的金额
				charges: [5, 10, 20, 50, 100, 500],
				background: {
					// 渐变色
					backgroundImage: 'linear-gradient(180deg, #37B08F, #18A981,#00A477)'
				},
				showNumber: false, //打开数字选择器
				charge_money: '0', //自己填写的充值金额
				type: 1, //支付类型
				hj: 0, //合计
				prepay_id: '',
				paySign: '',
				nonceStr: '',
			};
		},
		watch: {
			charge_index(val) {
				this.hj = this.charges[val]
			},
			showNumber(statu){
				this.charge_index = null
			}
		},
		methods: {
			changeNumber(val) {
				if (this.charge_money.length >= 6) {
					return this.$refs.uToast.show({
						title: '达到最大数值长度',
						type: 'warning'
					})
				}
				this.charge_money = this.charge_money != '0' ? this.charge_money + '' + val : val
				this.hj = this.charge_money
			},
			backspace() {
				if (this.charge_money.length > 1) {
					this.charge_money = this.charge_money.substr(0, this.charge_money.length - 1);
					this.hj = this.charge_money
				} else {
					this.charge_money = 0
					this.hj = 0
				}
			},
			charge() {
				//开始充值
				if(this.hj < 1){
					return uni.showToast({
						title:"最少充值1元！",
						icon:"error"
					})
				}
				uni.showLoading({
					title:"支付中..."
				})
				let obj = {
					ddid: "",
					ddzl: "cz",
					ip: "127.0.0.1",
					openid: uni.getStorageSync("userInfo").openid,
					tradetype: "JSAPI",
					userid: uni.getStorageSync("userInfo").username,
					xcxzl:"khd",//khd 客户端 gld 管理端
					je:this.hj
				}
				open_charge(obj).then(res => {
					console.log(res,"开始充值");
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: res.result.timeStamp,
						nonceStr: res.result.nonce_str,
						package: 'prepay_id=' + res.result.prepay_id,
						signType: 'MD5',
						paySign: res.result.paySign,
						success: function(res) {
							console.log(res,"支付结果");
							uni.hideLoading()
							if(res.errMsg == "requestPayment:ok"){
								uni.showToast({
									title:"支付成功",
									icon:"success"
								})
								uni.navigateTo({
									url: "../success/success?sfrz=dcz"
								})
							}else{
								uni.showToast({
									title:"支付失败",
									icon:"error"
								})
							}
						},
						fail: function(err) {
							console.log(err);
							uni.hideLoading();
							uni.showToast({
								title:"已取消支付",
								icon:"none"
							})
						}
					});
				})
				
				
			}
		}
	}
</script>
<style>
	page {
		background-color: #F8F9FB;
	}
</style>
<style lang="scss" scoped>
	.content {

		/deep/.h_title {
			padding-top: 0;
		}

		.charge_top {
			background-color: #fff;
			padding: 35rpx 35rpx 20rpx;
		}

		.center {
			padding: 20rpx 35rpx;
			background-color: #fff;
			margin: 20rpx 0;

			p {
				color: #878D99;
			}

			.bor_number {
				padding: 20rpx 0;
				border-bottom: 1rpx solid #D3D3D3;
				font-size: 35rpx;
				color: #2C2F37;
			}
		}

		.play_type {
			background-color: #fff;
			padding: 20rpx 35rpx 20rpx;

			.item {
				display: flex;
				padding: 20rpx 0;

				.title {
					margin: auto 20rpx;
				}
			}
		}

		.paly_btn {
			padding: 35rpx;
			display: flex;
			background-color: #fff;
			margin-top: 20rpx;

			.hj {
				margin: auto 0;
				font-size: 36rpx;

				span {
					color: #0FA77D;
				}
			}

			.btn {
				display: inline-block;
				padding: 15rpx 60rpx;
				border-radius: 40rpx;
				background: linear-gradient(#38AE8E, #01A477);
				color: #fff;
				margin-left: auto;
			}
		}

		.charge_boxs {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				position: relative;
				width: 31%;
				padding: 60rpx 0;
				text-align: center;
				color: #2C2F37;
				background-color: #fff;
				border: 1rpx solid #D3D3D3;
				border-radius: 16rpx;
				font-size: 34rpx;
				overflow: hidden;
				margin-bottom: 20rpx;

				.dg {
					width: 30rpx;
					position: absolute;
					right: 8rpx;
					bottom: 8rpx;
					z-index: 10;
				}

				&.active {
					background-color: #D9FFF4;
					border-color: #15A880;

					&::after {
						content: "";
						position: absolute;
						width: 0;
						height: 0;
						right: -70rpx;
						bottom: 0;
						//transform: rotate(-45deg);
						border-style: solid;
						border-width: 70rpx;
						border-color: transparent transparent #12A87E transparent;
					}
				}


			}
		}
	}
</style>
