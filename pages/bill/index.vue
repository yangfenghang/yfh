<template>
	<view>
		<u-navbar :is-back="false" :border-bottom="false" title="我的账单" title-color="#2C2F37" :title-bold="true"
			:background="{background:'#F8F9FB'}"></u-navbar>
		<view class="content">
			<view class="tabs">
				<view class="item" :class="{active:tabs_index == 1}" @click="tabs_index=1">
					全部
				</view>
				<view class="item" :class="{active:tabs_index == 2}" @click="tabs_index=2">
					已缴订单
				</view>
				<view class="item" :class="{active:tabs_index == 3}" @click="tabs_index=3">
					未缴订单
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
			<view class="h_title">
				<view class="left">账单统计</view>
			</view>
			<view class="statistics">
				<view class="item">
					<view class="top">
						逾期未缴/元
					</view>
					<view class="bot" v-if="zdtjNum.yqje==undefined">0</view>
					<view class="bot" v-else>
						{{zdtjNum.yqje}}
					</view>
				</view>
				<view class="item">
					<view class="top">
						至今未缴/元
					</view>
					<view class="bot" v-if="zdtjNum.wsje==undefined">0</view>
					<view class="bot" v-else>
						{{zdtjNum.wsje}}
					</view>
				</view>
				<view class="item">
					<view class="top">
						至今已缴/元
					</view>
					<view class="bot" v-if="zdtjNum.ysje==undefined">0</view>
					<view class="bot" v-else>
						{{zdtjNum.ysje}}
					</view>
				</view>
				<view class="item">
					<view class="top">
						至今应缴/元
					</view>
					<view class="bot" v-if="zdtjNum.gsje==undefined">0</view>
					<view class="bot" v-else>
						{{zdtjNum.gsje}}
					</view>
				</view>
			</view>
			<view class="h_title">
				<view class="left">账单</view>
			</view>
			<view class="order_info">
				<u-empty v-if="orderList.length == 0" text="暂无账单" mode="list"></u-empty>
				<view class="item" v-for="(item,index) in orderList" :key="index">
					<view class="title">
						{{item.createBy_dictText}}
						<view @click="zdList(index)" class="xqTitle">详情</view>
					</view>
					<view class="left">
						<view class="text">
							<view class="l_text">
								{{item.fcId_dictText}} -
								{{item.fjId_dictText}}
							</view>
							<view class="r_text">
								{{item.sjje}}元
							</view>
						</view>
						<view class="text">
							<view class="l_text">
								<!-- 生成时间 -->
								{{item.createTime}}
							</view>
							<view class="r_text" v-if="item.zdzt==0&&item.yqts!=null">
								<!-- {{item.createTime}} -->
								逾期 {{item.yqts}} 天
							</view>
						</view>
						<view class="text" v-if="item.kksj!=null">
							<view class="l_text">
								缴费日期
							</view>
							<view class="r_text">
								{{item.kksj}}
							</view>
						</view>
					</view>
					<view class="right">
						<view class="statu_text" :class="{success:item.zdzt==1,'error':item.zdzt==0}">
							{{item.zdzt == 1?'已缴纳':'待缴纳'}}
						</view>
						<view v-if="item.zdzt != 1" class="tag" @click="jiaofei(index)"
							:class="{success:item.zdzt==1,'error':item.zdzt==0}">
							{{item.zdzt == 1?'缴费成功':'立即缴纳'}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />

		<u-picker mode="time" v-model="show" :params="params" @confirm="confirmTime"></u-picker>
		<u-tabbar v-model="current" :list="tabbar" active-color="#04A376"></u-tabbar>
	</view>
</template>

<script>
	import {
		tbZdlist,
		jiaofeiPost,
		getTjjeVoByZfr
	} from "@/api/index.js"
	import tabbar from "@/tabbar.js"
	export default {
		watch: {
			tabs_index(val) {
				this.data.pageNo = 1;
				if (val === 1) {
					this.data.zdzt = ''
					this.getList()
				} else if (val === 2) {
					this.data.zdzt = 1
					this.getList()
				} else if (val === 3) {
					this.data.zdzt = 0
					this.getList()
				}
			},
			tabs_time_index(index) {
				console.log(index);
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
				current: 1,
				tabbar: tabbar.list,
				tabs_index: 1, //订单切换
				tabs_time_index: 1, //时间切换
				tabs_time: '', //时间切换选择的日期
				zdzt: '', //订单状态
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
				orderList2: [],
				zdtjNum: {},
			};
		},
		// onLoad() {
		// 	this.userName = uni.getStorageSync('userInfo').username;
		// 	// console.log(this.userName);

		// 	this.orderList2 = this.orderList;
		// 	this.time_text = (new Date().getMonth() + 1) + '月'
		// 	let time = this.select_time(new Date().getFullYear(), new Date().getMonth() + 1);
		// 	this.data.createTime_begin = time.start;
		// 	this.data.createTime_end = time.end;
		// 	this.getList()
		// 	this.zdtj()
		// },
		onShow() {
			this.userName = uni.getStorageSync('userInfo').username;
			// console.log(this.userName);

			this.orderList2 = this.orderList;
			this.time_text = (new Date().getMonth() + 1) + '月'
			let time = this.select_time(new Date().getFullYear(), new Date().getMonth() + 1);
			this.data.createTime_begin = time.start;
			this.data.createTime_end = time.end;
			this.getList()
			this.zdtj()
		},
		methods: {
			// 账单统计数据
			zdtj() {
				getTjjeVoByZfr({
					zfr: this.userName
				}).then(res => {
					// console.log(res)
					this.zdtjNum = res.result
				})
			},
			jiaofei(index) {
				console.log(this.orderList[index])
				uni.showModal({
					content: '是否进行缴费',
					confirmText: '确定缴费',
					success: (res) => {
						if (res.confirm) {
							uni.showModal({
								content: '缴费金额：' + this.orderList[index].sjje,
								success: (resje) => {
									if (resje.confirm) {
										jiaofeiPost({
											id: this.orderList[index].id
										}).then(ress => {
											if (ress.success) {
												this.getList();
												this.$refs.uToast.show({
													title: ress.message,
													type: 'success'
													// url: '/pages/user/index'
												})
												uni.navigateTo({
													url: '../success/success?sfrz=zhifu'
												})
											} else {
												this.$refs.uToast.show({
													title: ress.message,
													type: 'error'
													// url: '/pages/user/index'
												})
											}
										})
									} else if (resje.cancel) {

									}
								}
							})
							// console.log('用户点击确定');

						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				})

			},
			async confirmTime(time) {
				this.time_text = time.month + '月'
				this.tabs_time_index = 3;
				let times = await this.select_time(time.year, time.month);
				this.data.createTime_begin = times.start;
				this.data.createTime_end = times.end;
				await this.getList()
			},
			async getList() {
				// column=createTime&order=desc
				await tbZdlist(this.data).then(res => {
					// console.log(res, "获取账单");
					this.orderList = res.result.records
					this.orderList.forEach((item, index) => {
						let time = item.createTime
						// console.log(time)
						let date1 = item.createTime.slice(8, 10)
						// console.log(date1)
						let date2 = item.createTime.slice(9, 10)
						// console.log(date2)
						let month1 = item.createTime.slice(5, 7)
						// console.log(month1)
						let month2 = item.createTime.slice(6, 7)
						// console.log(month2)
						let year1 = item.createTime.slice(0, 4)
						// console.log(year1)
						if (item.createTime.slice(8, 9) == 0 && item.createTime.slice(9, 10) != 9) {
							let don = Number(time.slice(9, 10)) + 1
							time = time.slice(0, 9) + don + time.slice(10, 19)
							time = Date.parse(time);
							var myDate = new Date();
							myDate = Date.parse(myDate);
							if (myDate > time) {
								var days = (myDate - time) / (1 * 24 * 60 * 60 * 1000);
								this.orderList[index].yqts = Math.floor(days)
							} else {
								this.orderList[index].yqts = null
							}
						} else {
							if (item.createTime.slice(5, 7) == 12 && item.createTime.slice(8, 10) ==
								31) {
								let year = Number(item.createTime.slice(0, 4)) + 1
								time = year + "-" + "01-01" + don + time.slice(10, 19)
								time = Date.parse(time);
								var myDate = new Date();
								myDate = Date.parse(myDate);
								if (myDate > time) {
									var days = (myDate - time) / (1 * 24 * 60 * 60 * 1000);
									this.orderList[index].yqts = Math.floor(days)
								} else {
									this.orderList[index].yqts = null
								}
							} else if (date2 == 31 && (month2 == "01" || month2 == "03" || month2 ==
									"05" || month2 == "07" || month2 == "08")) {
								month1 = "0" + Number(month1) + 1
								time = year1 + "-" + month1 + "-01" + time.slice(10, 19)
								time = Date.parse(time);
								var myDate = new Date();
								myDate = Date.parse(myDate);
								if (myDate > time) {
									var days = (myDate - time) / (1 * 24 * 60 * 60 * 1000);
									this.orderList[index].yqts = Math.floor(days)
								} else {
									this.orderList[index].yqts = null
								}
							} else if (date2 == 31 && month2 == "10") {
								time = year1 + "-11-01" + time.slice(10, 19)
								time = Date.parse(time);
								var myDate = new Date();
								myDate = Date.parse(myDate);
								if (myDate > time) {
									var days = (myDate - time) / (1 * 24 * 60 * 60 * 1000);
									this.orderList[index].yqts = Math.floor(days)
								} else {
									this.orderList[index].yqts = null
								}
							} else if (date2 == 30 && (month2 == "04" || month2 == "06" || month2 ==
									"09")) {
								month1 = "0" + Number(month1) + 1
								time = year1 + "-" + month1 + "-01" + time.slice(10, 19)
								time = Date.parse(time);
								var myDate = new Date();
								myDate = Date.parse(myDate);
								if (myDate > time) {
									var days = (myDate - time) / (1 * 24 * 60 * 60 * 1000);
									this.orderList[index].yqts = Math.floor(days)
								} else {
									this.orderList[index].yqts = null
								}
							} else if (date2 == 30 && month2 == "11") {
								time = year1 + "-12-01" + time.slice(10, 19)
								time = Date.parse(time);
								var myDate = new Date();
								myDate = Date.parse(myDate);
								if (myDate > time) {
									var days = (myDate - time) / (1 * 24 * 60 * 60 * 1000);
									this.orderList[index].yqts = Math.floor(days)
								} else {
									this.orderList[index].yqts = null
								}
							}
						}
					})
				})
				// console.log(this.orderList.yqts,123)
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
				padding: 20rpx 0rpx;
				// padding: 5rpx;
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
				padding: 20rpx;
				border-radius: 25rpx;
				margin-bottom: 30rpx;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				box-shadow: 0 8rpx 10rpx rgba(0, 0, 0, .08);

				.title {
					font-size: 30rpx;
					font-weight: bold;
					display: flex;
					justify-content: space-between;

					.xqTitle {
						font-weight: 400;
						font-size: 32rpx;
					}
				}

				.left {
					flex: 1;
					margin: 10rpx 0;
					padding: 10rpx 0;
					border-bottom: 1rpx solid #eee;
					border-top: 1rpx solid #eee;

					.text {
						display: flex;
						color: #2C2F37;
						font-size: 26rpx;
						line-height: 1.8;

						.r_text {
							margin-left: auto;
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
