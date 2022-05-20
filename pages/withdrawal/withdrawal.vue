<template>
	<view id="withdrawal">
		<view class="moneyBox">
			<image class="bgImg" src="../../static/img/754.png" mode=""></image>
			<view class="box">
				<view class="myMoney">我的金额</view>
				<view class="sumMoney">{{money}}</view>
				<view class="withMoney">
					<view class="left">
						<view>可提现金额</view>
						<view class="wMoney">{{money}}</view>
					</view>
					<view class="right" @click="txfl">
						<view>提现费率</view>
						<view class="mark">!</view>
					</view>
				</view>
			</view>
		</view>
		<view class="method">
			<view class="top">
				<image src="../../static/img/42.png" class="left" mode=""></image>
				<!-- <view class="fontMethod">选择提现方式</view> -->
				<view class="fontMethod">提现</view>
			</view>
			<view class="title">提现备注</view>
			<view class="bottom">
				<u-input height="0" v-model="comm" type="textarea" placeholder="请输入提现原因" />
			</view>
			<!-- <view class="bottom">
				<radio-group @change="radioChange">
					<label class="radio" v-for="(item,index) in yhk_list" :key="index">
						<view class="left">
							<image src="../../static/img/288.png" class="cashCard" mode="widthFix"></image>
							<view class="card">{{item.name}}</view>
						</view>
						<radio :value="item.name" :checked="index === current"/>
					</label>
				</radio-group>
			</view> -->
		</view>

		<view class="amount">
			<view class="withAmount">提现金额</view>
			<view class="bottom">
				<input type="number" :disabled="disabled" class="text" @input="input_money" v-model="money_tx"
					:placeholder="placeholder" />

				<view class="buttonbox">
					<button class="button" @click="money_tx=money">全额提现</button>
					<view class="right" @click="cashOut">提现</view>
				</view>
			</view>
		</view>

		<view class="list method">
			<view class="top">
				<image src="../../static/img/42.png" class="left" mode=""></image>
				<!-- <view class="fontMethod">选择提现方式</view> -->
				<view class="fontMethod">提现记录</view>
			</view>
			<view class="item" v-for="(item,index) in txjl" :key="index" @click="zdjlxq(item)">
				<view class="head">
					<view class="left">
						{{item.sqje}}元
					</view>
					<view class="right">
						{{item.createTime}}
					</view>
				</view>

				<view class="head">
					<view v-if="item.sjje==null"></view>
					<view class="left" v-else>
						{{item.sjje}}元
					</view>
					<view class="right" :class="item.spzt==2?'red':(item.spzt==1?'green':'orgen')">
						{{item.spzt_dictText}}
					</view>
				</view>

				<!-- <view class="comm">
					{{item.comm}}
				</view> -->
			</view>
		</view>

		<!-- 提现记录详情弹窗 -->
		<view class="jinepopup">
			<u-popup v-model="show" mode="center" height="60%" width="80%">
				<view class="title">提现记录详情</view>
				<scroll-view scroll-y="true" class="content">
					<view class="li">
						<view class="left">提现金额</view>
						<view class="right">{{zdxq.sqje}}元</view>
					</view>
					<view class="li" v-if="zdxq.sjje!=null">
						<view class="left">实际金额</view>
						<view class="right">{{zdxq.sjje}}元</view>
					</view>
					<view class="li">
						<view class="left">申请时间</view>
						<view class="right">{{zdxq.createTime}}</view>
					</view>
					<view class="li">
						<view class="left">申请状态</view>
						<view class="right" :class="zdxq.spzt==2?'red':(zdxq.spzt==1?'green':'orgen')">
							{{zdxq.spzt_dictText}}
						</view>
					</view>
					<view class="li">
						<view class="left">提现备注</view>
						<view class="right">{{zdxq.spcomm}}</view>
					</view>
				</scroll-view>
				<view class="buttom">
					<view class="dont" @click="show=false">返回</view>
				</view>
			</u-popup>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="popupBox">
				<view class="choice">选择储蓄卡</view>
				<view class="info">选择您的储蓄卡对应的开户行</view>
				<view class="choiceBox">
					<view class="condex">
						<view class="dein">
							<image class="imgs" src="../../static/img/302.png" mode=""></image>
						</view>
						<view class="title">中国工商银行</view>
					</view>
					<view class="condex">
						<view class="dein">
							<image class="imgs" src="../../static/img/303.png" mode=""></image>
						</view>
						<view class="title">中国建设银行</view>
					</view>
					<view class="condex" @click="addBankCard">
						<view class="dein addTo">
							<view class="jia">+</view>
						</view>
						<view class="title">添加新卡</view>
					</view>
				</view>
				<view class="button">
					<button class="left" type="default" @click="close">取消</button>
					<button class="right" type="default">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		tbUserTxsq,
		userList,
		tbUserlist
	} from "@/api/index.js"
	export default {
		data() {
			return {
				show: false,
				zdxq: {},
				disabled: false,
				placeholder: 0,
				money: 0,
				money_tx: '',
				current: 0,
				comm: "",
				userinfo: {},
				txjl: [],
				yhk_list: [{
						name: "工商银行"
					},
					{
						name: "招商银行"
					}
				]
			}
		},
		onLoad() {
			this.getUserinfo()
			this.gettbUserlist()
		},
		methods: {
			// 账单记录详情
			zdjlxq(item) {
				this.zdxq = item;
				this.show = true;
			},
			txfl() {
				uni.showModal({
					title: '提现费率说明',
					content: '非VIP，T+1，0.3%费率'
				})
			},
			getUserinfo() {
				userList().then(res => {
					console.log(res);
					this.userinfo = res.result.records[0];
					this.money = res.result.records[0].kyye;
				})
			},
			gettbUserlist() {
				tbUserlist().then(res => {
					console.log(res);
					this.txjl = res.result.records
				})
			},
			cashOut() {
				//开始提现
				/* if(this.yhk_list.length==0){
					this.$refs.popup.open("bottom");
				}else{
					this.$refs.popup.open("bottom");
				} */
				if (this.money_tx == 0) {
					return uni.showToast({
						title: "请输入提现金额",
						icon: "error"
					})
				}
				let content = "提现金额："+this.money_tx+"\n非VIP，T+1，0.3%的费率\n是否进行提现";
				content = content.replace(/<br>/g, "\n")
				uni.showModal({
					content: content,
					success: (ress) => {
						if (ress.confirm) {
							uni.showLoading({
								title: '加载中'
							});
							tbUserTxsq({
								comm: this.comm, //备注
								sqje: this.money_tx
							}).then(res => {
								console.log(res, "申请提现");
								if (res.success) {
									this.money_tx = 0
									this.comm = ''
									this.getUserinfo()
									this.gettbUserlist()
									uni.showModal({
										// content: res.message
										content: '提现申请已提交，请等待',
										
									})
									this.gettbUserlist()
									// uni.showToast({
									// 	title: res.message,
									// 	duration: 2000
									// })
								} else {
									uni.showModal({
										content: res.message
									})
									// uni.showToast({
									// 	title: res.message,
									// 	icon: "error",
									// 	duration: 2000
									// })
								}
							})
						} else if (ress.cancel) {
							return;
						}
					}
				})

			},
			close() {
				//关闭弹出层
				this.$refs.popup.close("bottom");
			},
			radioChange(evt) {
				for (let i = 0; i < this.yhk_list.length; i++) {
					if (this.yhk_list[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			input_money(e) {
				// if (parseInt(e.detail.value) > this.money) {
				// 	this.$nextTick(() => {
				// 		this.money_tx = this.money
				// 	})
				// }
				if (Number(e.detail.value) >= Number(this.money)) {
					// uni.showToast({
					// 	title: '已是最大金额',
					// 	icon: 'error'
					// })
					uni.showModal({
						content: "输入金额大于可提现金额",
						success: (res) => {
							if (res.confirm) {
								this.money_tx = 0
							} else if (res.cancel) {
								this.money_tx = 0
							}
						}
					})
					// console.log("等于")
					// this.disabled = false
					// this.money_tx = Number(this.money);
					return
				}
			},
			addBankCard() {
				uni.navigateTo({
					url: "../addBankCard/addBankCard"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.red {
		color: red;
	}

	.orgen {
		color: #FD774C;
	}

	.green {
		color: #4CD964;
	}

	button::after {
		border: none;
	}

	.jinepopup {
		.title {
			height: 10%;
			box-sizing: border-box;
			font-size: 35rpx;
			font-weight: bold;
			padding: 20rpx;
			box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.08);
		}

		.content {
			overflow-wrap: break-word;
			white-space: normal;
			height: 80%;
			padding: 20rpx;
			box-sizing: border-box;

			.li {
				margin-bottom: 20rpx;

				.left {
					font-size: 30rpx;
					font-weight: bold;
				}
			}
		}

		.buttom {
			color: #FFFFFF;
			height: 10%;
			box-sizing: border-box;
			padding-top: 10rpx;
			box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.08);

			.dont {
				width: 80%;
				height: 80%;
				margin: 0 auto;
				border-radius: 60rpx;
				font-size: 35rpx;
				font-weight: 400;
				text-align: center;
				line-height: 160%;
				background-color: #06A579;
			}
		}
	}

	#withdrawal {
		box-sizing: border-box;
		padding: 35rpx;

		.return {
			font-size: 35rpx;
			font-weight: bold;
			margin-bottom: 60rpx;
			display: flex;
			margin-top: 110rpx;
		}

		.moneyBox {
			width: 685rpx;
			height: 330rpx;
			color: #000;
			border-radius: 30rpx;
			box-shadow: 0rpx 5rpx 20rpx rgba(16, 125, 95, 0.5);
			margin-bottom: 40rpx;
			position: relative;

			.bgImg {
				width: 100%;
				height: 100%;
				// position: absolute;
				border-radius: 30rpx;
			}

			.box {
				position: absolute;
				width: 100%;
				top: 0;
				color: #fff;
				box-sizing: border-box;
				padding: 35rpx;

				.sumMoney {
					font-size: 60rpx;
					font-weight: bold;
					margin-bottom: 100rpx;
				}

				.withMoney {
					// width: 100%;
					display: flex;
					justify-content: space-between;

					.left {
						display: flex;

						.wMoney {
							margin-left: 20rpx;
						}
					}

					.right {
						display: flex;
						align-items: center;
						// margin-left: 220rpx;

						.mark {
							font-size: 25rpx;
							color: #000;
							text-align: center;
							line-height: 30rpx;
							width: 30rpx;
							height: 30rpx;
							border-radius: 50%;
							background-color: #fff;
							margin-left: 10rpx;
						}
					}
				}
			}
		}

		.amount {
			margin-bottom: 40rpx;
			border-bottom: 1px solid #D3D3D3;
			box-sizing: border-box;
			padding-bottom: 20rpx;

			.withAmount {
				margin-bottom: 26rpx;
				color: #878D99;
			}

			.bottom {
				display: flex;
				justify-content: space-between;

				.text {
					font-size: 40rpx;
					width: 300rpx;
				}

				.buttonbox {
					display: flex;

					.button {
						height: 60rpx;
						font-size: 30rpx;
						line-height: 60rpx;
						box-sizing: border-box;
						border-radius: 30rpx;
						background: #D9FFF4;
						color: #04A376;
						margin: 0 0;
					}

					.right {
						width: 150rpx;
						height: 60rpx;
						background-color: #38AE8E;
						color: #FFFFFF;
						margin-left: 20rpx;
						text-align: center;
						line-height: 60rpx;
						border-radius: 12rpx;
					}
				}

			}
		}

		.method {

			// height: 400rpx;
			margin-bottom: 20rpx;

			.top {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.left {
					width: 40rpx;
					height: 25rpx;
					margin-right: 10rpx;
				}

				.fontMethod {
					font-size: 35rpx;
					font-weight: bold;
				}
			}

			.title {
				color: #878D99;
				margin-bottom: 20rpx;
			}

			.bottom {
				.radio {
					display: flex;
					justify-content: space-between;
					// margin-bottom: 20rpx;

					.left {
						display: flex;
						align-items: center;

						.cashCard {
							width: 50rpx;
							height: 40rpx;
							margin-right: 20rpx;
						}

						.card {
							font-size: 40rpx;
						}
					}
				}
			}
		}

		.buttons {
			width: 680rpx;
			font-size: 30rpx;
			background-color: #38AE8E;
			color: #fff;
			border-radius: 60rpx;
			position: absolute;
			// left: 0rpx;
			bottom: 50rpx;
		}

		.popupBox {
			height: 50%;
			width: 100%;
			background-color: #fff;
			border-radius: 30rpx 30rpx 0 0;
			box-sizing: border-box;
			padding: 63rpx 40rpx 60rpx 40rpx;

			.choice {
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
				margin-bottom: 20rpx;
			}

			.info {
				font-size: 26rpx;
				color: #878D99;
				text-align: center;
				margin-bottom: 40rpx;
			}

			.choiceBox {
				display: flex;
				justify-content: space-around;
				margin-bottom: 93rpx;

				.condex {
					width: 197rpx;

					.dein {
						width: 197rpx;
						height: 197rpx;
						box-sizing: border-box;
						padding: 48rpx;
						margin-bottom: 20rpx;
						border-radius: 12rpx;
						box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.16);

						&.addTo {
							background-color: #18AD85;

							.jia {
								background-color: #fff;
								text-align: center;
								line-height: 45rpx;
								font-size: 52rpx;
								width: 52rpx;
								height: 52rpx;
								color: #18AD85;
								margin: 20rpx auto;
							}
						}

						.imgs {
							width: 100rpx;
							height: 100rpx;
						}
					}

					.title {
						text-align: center;
						font-size: 26rpx;
					}
				}
			}

			.button {
				display: flex;
				justify-content: space-between;

				.left {
					width: 305rpx;
					height: 80rpx;
					background-color: #ECECF4;
					border: 12rpx;
					line-height: 80rpx;
				}

				.right {
					width: 305rpx;
					height: 80rpx;
					background-color: #11A77E;
					border-radius: 12rpx;
					color: #fff;
					line-height: 80rpx;
				}
			}
		}
	}

	.list {
		.item {
			box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.08);
			border-radius: 12rpx;
			padding: 20rpx;
			margin-bottom: 10rpx;

			.head {
				display: flex;

				.left {
					font-weight: 600;
				}

				.right {
					margin-left: auto;
					font-weight: 300;
				}
			}
		}
	}
</style>
