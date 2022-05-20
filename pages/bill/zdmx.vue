<template>
	<view>
		<u-navbar :border-bottom="false" title="明细" title-color="#2C2F37" :title-bold="true"
			:background="{background:'#F8F9FB'}"></u-navbar>
		<view class="content">
			<view class="tabs">
				<view class="item" :class="{active:tabs_index == 1}" @click="tabs_index=1">
					全部
				</view>
				<view class="item" :class="{active:tabs_index == 2}" @click="tabs_index=2">
					充值
				</view>
				<view class="item" :class="{active:tabs_index == 3}" @click="tabs_index=3">
					扣款
				</view>
				<view class="item" :class="{active:tabs_index == 4}" @click="tabs_index=4">
					提现
				</view>
			</view>
			<view class="tabs_time">
				<view class="left">
					<view class="item" :class="{active:tabs_time_index==1}" @click="tabs_time_index=1">
						本月
					</view>
					<view class="item" :class="{active:tabs_time_index==2}" @click="tabs_time_index=2">
						上月
					</view>
				</view>
				<view class="right" @click="show=true">
					<view class="text" :class="{active:tabs_time_index==3}">
						{{time_text||''}}
					</view>
					<u-icon name="arrow-down"></u-icon>
				</view>
			</view>
			<view class="order_info">
				<u-empty v-if="orderList.length == 0" text="暂无账单" mode="list"></u-empty>
				<view class="item" v-for="(item,index) in orderList" :key="index">
					<view class="title">
						{{item.zjczzl_dictText + item.czzt_dictText}}
						<view class="xqTitle">
							{{item.czje}}元
						</view>
					</view>
					<view class="left" v-if="item.comm">
						<view class="text">
							<view class="r_text">
								{{item.comm}}
							</view>
						</view>
					</view>
					<view class="left">
						<view class="text">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />

		<u-picker mode="time" v-model="show" :params="params" @confirm="confirmTime"></u-picker>
	</view>
</template>

<script>
	import {
		yhzj_list
	} from "@/api/index.js"
	export default {
		watch: {
			tabs_index(val) {
				this.data.pageNo = 1;
				if (val === 1) {
					this.data.zjczzl = ''
					this.getList()
				} else if (val === 2) {
					this.data.zjczzl = 1
					this.getList()
				} else if (val === 3) {
					this.data.zjczzl = 2
					this.getList()
				}else if (val === 4) {
					this.data.zjczzl = 3
					this.getList()
				}
			},
			tabs_time_index(index) {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let next_month = (month - 1) == 0 ? 12 : month - 1;
				let next_year = (month - 1) == 0 ? year - 1 : year;
				let time = {};
				if (index == 1) {
					console.log(this.select_time(year, month));
					time = this.select_time(year, month)
				} else if (index == 2) {
					console.log(this.select_time(next_year, next_month));
					time = this.select_time(next_year, next_month);
				}
				this.data.createTime_begin = time.start;
				this.data.createTime_end = time.end;
				this.getList()
			}
		},
		data() {
			return {
				tabs_index: 1, //订单切换
				tabs_time_index: 1, //时间切换
				show: false,
				time_text: '', //选择的月份
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				data: {
					pageNo: 1,
					pageSize: 10,
					column: "createTime",
					order: "desc"
				},
				userName: 0,
				orderList: [],
				orderList2: []
			};
		},
		onLoad() {
			this.userName = uni.getStorageSync('userInfo').username;
			this.orderList2 = this.orderList;
			this.time_text = (new Date().getMonth() + 1) + '月'
			let time = this.select_time(new Date().getFullYear(), new Date().getMonth() + 1);
			this.data.createTime_begin = time.start;
			this.data.createTime_end = time.end;
			this.getList()
		},
		methods: {
			jiaofei(index) {
				// console.log(this.orderList[index])
				jiaofeiPost({
					id: this.orderList[index].id
				}).then(res => {
					if (res.success) {
						this.getList();
						this.$refs.uToast.show({
							title: res.message,
							type: 'success'
							// url: '/pages/user/index'
						})

					} else {
						this.$refs.uToast.show({
							title: res.message,
							type: 'error'
							// url: '/pages/user/index'
						})
					}
				})
			},
			confirmTime(time) {
				this.time_text = time.month + '月'
				this.tabs_time_index = 3;
				let times = this.select_time(time.year, time.month);
				this.data.createTime_begin = times.start;
				this.data.createTime_end = times.end;
				this.getList()
			},
			getList() {
				yhzj_list(this.data).then(res => {
					// console.log(res, "获取账单");
					this.orderList = res.result.records
				})
			},
			zdList(index) {
				// console.log(this.orderList)
				this.$to("/pages/zdList/zdList?id=" + this.orderList[index].id + "&orderList=" + JSON.stringify(this
					.orderList[index]))
			},
			select_time(year, month) {
				//根据日期选择当前月和下一个月一号
				let end_month = parseInt(month) == 12 ? 1 : parseInt(month) + 1;
				let end_year = parseInt(month) == 12 ? parseInt(year) + 1 : parseInt(year);
				return {
					start: `${year}-${month}-1 00:00:00`,
					end: `${end_year}-${end_month}-1 00:00:00`
				}
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
		padding: 35rpx;

		.statistics {
			//统计
			display: flex;
			box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, .07);
			border-radius: 15rpx;
			background-color: #fff;

			.item {
				flex: 1;
				padding: 30rpx;
				text-align: center;

				.top {
					color: #878D99;
				}

				.bot {
					margin-top: 20rpx;
					color: #2C2F37;
					font-weight: 600;
				}
			}
		}

		.tabs {
			display: flex;
			justify-content: space-between;

			.item {
				width: 28%;
				color: #878D99;
				text-align: center;
				padding: 14rpx 0;
				border-radius: 0 15rpx 0 15rpx;

				&.active {
					background: linear-gradient(#38AE8E, #01A477);
					color: #fff;
				}
			}
		}

		.tabs_time {
			display: flex;
			margin: 30rpx 0;

			.left {
				flex: 1;
				display: flex;

				.item {
					margin: auto 60rpx auto 0;
					font-size: 32rpx;
					color: #878D99;

					&.active {
						color: #06A579;
						font-weight: 900;
					}
				}
			}

			.right {
				padding: 10rpx 0;
				display: flex;
				font-size: 32rpx;
				color: #878D99;

				.text {
					margin-right: 20rpx;

					&.active {
						color: #06A579;
						font-weight: 900;
					}
				}
			}
		}

		.order_info {

			.item {
				padding: 25rpx;
				border-radius: 25rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				box-shadow: 0 8rpx 10rpx rgba(0, 0, 0, .08);

				.title {
					font-size: 30rpx;
					display: flex;
					justify-content: space-between;

					.xqTitle {
						font-weight: 400;
						font-size: 26rpx;
						margin-left: auto;
					}
				}

				.left {
					flex: 1;
					padding: 10rpx 0 0;
					border-top: 1rpx solid #eee;
					margin-top: 15rpx;
					.text {
						display: flex;
						color: #2C2F37;
						font-size: 30rpx;
						line-height: 1.8;

						.r_text {
							font-weight: 200;
						}
					}
				}

				.right {
					margin: auto 0;
					display: flex;

					.statu_text {
						margin: auto 0;

						&.success {
							color: #04A376;
						}

						&.error {
							color: #FD774C;
						}
					}

					.tag {
						margin-left: auto;
						border-radius: 50rpx;
						color: #fff;
						padding: 10rpx 20rpx;

						&:active {
							opacity: .7;
						}

						&.success {
							//background: linear-gradient(#38AE8E, #01A477);
							background-color: #D9FFF4;
							border: 1rpx solid #BEEFD4;
							color: #04A376;
						}

						&.error {
							background-color: #FFE9D9;
							border: 1rpx solid #EFD5BE;
							color: #FD774C;
							//background: linear-gradient(#FBA463, #FB811A);
						}
					}
				}
			}
		}
	}
</style>
