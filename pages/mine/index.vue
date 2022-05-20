<template>
	<view>
		<view class="content">
			<view class="haed_mine">
				<view class="head_img">
					<image :src="info.avatarUrl" class="img"></image>
					<view class="head_info">
						<view class="name">
							{{info.realname}}
						</view>
						<view class="vip">
							<image style="width:180rpx;height:auto;margin-top: 20rpx;" src="@/static/img/79.png"
								mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="head_money">
					<view class="item">
						<view class="top">
							{{info.qbze || 0}}
						</view>
						<view class="bottom">
							钱包总额/元
						</view>
					</view>
					<view class="item">
						<view class="top">
							{{info.djje || 0}}
						</view>
						<view class="bottom">
							冻结金额/元
						</view>
					</view>
					<view class="item">
						<view class="top">
							{{info.kyye || 0}}
						</view>
						<view class="bottom">
							可用余额/元
						</view>
					</view>
				</view>
			</view>
			<view class="main">
				<view class="main_boxs">
					<view class="item" @click="$to('/pages/bill/zdmx')">
						<image src="@/static/img/sc.png" class="img"></image>
						<view class="title">
							资金明细
						</view>
					</view>
					<view class="item" @click="withdrawal">
						<image src="@/static/img/ckmx.png" class="img"></image>
						<view class="title">
							提现
						</view>
					</view>
					<view class="item" @click="$to('/pages/authen/index')">
						<image src="@/static/img/info.png" class="img"></image>
						<view class="title">
							认证
						</view>
					</view>
					<view class="item" @click="chongzhi">
						<image src="@/static/img/tx.png" class="img"></image>
						<view class="title">
							充值
						</view>
					</view>
				</view>
				<view class="other">
					<p>
						<image src="@/static/img/42.png" mode="heightFix"
							style="width:auto;height: 20rpx;margin: auto 20rpx auto 0;"></image>
						其他设置
					</p>
					<view class="item" @click="$to('/pages/myinfo/index')">
						<u-icon name="account" color="#2C2F37" class="left"></u-icon>
						<p>个人信息</p>
						<u-icon color="#CED1D7" class="right" name="arrow-right"></u-icon>
					</view>
					<view class="item">
						<u-icon name="server-man" color="#2C2F37" class="left"></u-icon>
						<!-- <p>联系客服</p> -->
						<button class="button" open-type="contact" @contact="contact">联系客服</button>
						<u-icon color="#CED1D7" class="right" name="arrow-right"></u-icon>
					</view>
					<view class="item" @click="gywm">
						<u-icon name="error-circle" color="#2C2F37" class="left"></u-icon>
						<p>关于我们</p>
						<u-icon color="#CED1D7" class="right" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar v-model="current" :list="tabbar" active-color="#04A376"></u-tabbar>
	</view>
</template>

<script>
	import tabbar from "@/tabbar.js"
	import { userList } from "@/api/index.js"
	export default {
		data() {
			return {
				current: 3,
				tabbar: tabbar.list,
				info:{
					realname:"",
					avatar:""
				}
			};
		},
		onShow(){
			this.getInfo()
			console.log(uni.getStorageSync('userInfo'));
		},
		methods:{
			// 充值按钮
			chongzhi() {
				uni.switchTab({
					url: "../charge/index"
				})
			},
			// 联系我们
			contact(e) {
				console.log(e);
			},
			// 关于我们
			gywm() {
				uni.navigateTo({
					url: "../gywm/gywm"
				})
			},
			getInfo(){
				userList().then(res => {
					console.log(res.result.records[0],"用户");
					this.info = res.result.records[0]
					uni.setStorageSync('userInfo', res.result.records[0]);
				})
			},
			
			// 提现按钮
			withdrawal() {
				// console.log(111)
				// this.$to("@/pages/withdrawal/withdrawal");
				uni.navigateTo({
					url: "../withdrawal/withdrawal"
				})
			},
		}
	}
</script>
<style>
	page {
		background-color: #F8F9FB;
	}
</style>
<style lang="scss" scoped>
	button::after {
		border: none;
	}
	.button{
		width: 700rpx;
		background-color: #F8F9FB;
		margin: 0;
		text-align: left;
		padding-left: 20rpx;
		font-size: 35rpx;
	}
	
	.content {
		.haed_mine {
			background: linear-gradient(#18AD85, #43B897);
			border-radius: 0 0 60rpx 60rpx;
			padding: 200rpx 40rpx 100rpx;

			.head_img {
				display: flex;

				.img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					border: 8rpx solid #7AD5BC;
					box-shadow: 0 0 15rpx rgba(0, 0, 0, .3);
				}
			}

			.head_info {
				display: flex;
				flex-direction: column;
				padding-left: 20rpx;
				padding-top: 10rpx;

				.name {
					color: #fff;
					font-size: 35rpx;
				}
			}

			.head_money {
				display: flex;
				margin-top: 50rpx;

				.item {
					flex: 1;
					text-align: center;
					color: #fff;

					.top {
						font-size: 30rpx;
					}

					.bottom {
						margin-top: 20rpx;
						font-size: 30rpx;
					}
				}
			}
		}

		.main {
			position: relative;
			top: -50rpx;
			padding: 0 40rpx;

			.main_boxs {
				display: flex;
				background-color: #fff;
				border-radius: 30rpx;

				.item {
					flex: 1;
					padding: 40rpx 0;
					display: flex;
					flex-direction: column;

					.img {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						margin: auto;
					}

					.title {
						padding-top: 20rpx;
						color: #2C2F37;
						text-align: center;
					}
				}
			}

			.other {
				padding: 40rpx 0;

				>p {
					color: #878D99;
					padding-bottom: 30rpx;
				}

				.item {
					display: flex;
					padding: 20rpx 0;
					font-size: 35rpx;

					p {
						color: #2C2F37;
						padding-left: 20rpx;
					}

					.right {
						margin: auto 0 auto auto;
					}
				}
			}
		}
	}
</style>
