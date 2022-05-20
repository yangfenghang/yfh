<template>
	<view class="content">
		<u-navbar :is-back="false" :border-bottom="false" title="首页" title-color="#fff" :title-bold="true"
			:background="background"></u-navbar>
		<view class="swpier">
			<u-swiper :list="list" height="300" :circular="false" border-radius="20" indicator-pos="bottomLeft"
				mode="dot"></u-swiper>
		</view>
		<view class="bar" @click="$to('/pages/info/index')">
			<view class="left">
				<image src="@/static/img/118.png" class="img"></image>
				<span>消息中心  |</span>
			</view>
			<view class="right">
				<text>您有</text>
				<text :class="xxsome==0?'':'red'">{{xxsome}}</text>
				<text>条未读的消息</text>
			</view>
			<view class="jiantou">
				<u-icon name="arrow-right" color="#04A376" size="28"></u-icon>
			</view>
		</view>
		<view class="h_title">
			<view class="left">生活缴费</view>
			<view class="right">
				<button @click="chongzhi">立即续费</button>
			</view>
		</view>
		<view class="Living">
			<!-- 生活缴费 -->
			<view class="left">
				<h1>{{totalAmount}}</h1>
				<p>待缴总额/元</p>
			</view>
			<view class="right">
				<p>缴费日期：{{time}}</p>
				<!-- <p>逾期将可能断水、断电、断气</p> -->
				<p>逾期未缴费将产生滞纳金</p>
			</view>
			<image src="../../static/img/117.png" mode="widthFix" style="width:100%;height: auto;"></image>
			<!-- <view class="item" :class="{active:tabs_index == 1}" @click="tabs_index=1">
				<u-radio-group v-model="tabs_index">
					<u-radio name="1" active-color="#06A477"></u-radio>
				</u-radio-group>
				<image v-show="tabs_index == 1" style="height: auto;" src="@/static/img/3.png" mode="widthFix"></image>
				<image v-show="tabs_index != 1" style="height: auto;" src="@/static/img/1.png" mode="widthFix"></image>
				<view class="title">
					电费
				</view>
			</view>
			<view class="item" :class="{active:tabs_index == 2}" @click="tabs_index=2">
				<u-radio-group v-model="tabs_index">
					<u-radio name="2" active-color="#06A477"></u-radio>
				</u-radio-group>
				<image v-show="tabs_index != 2" style="height: auto;" src="@/static/img/6.png" mode="widthFix"></image>
				<image v-show="tabs_index == 2" style="height: auto;" src="@/static/img/7.png" mode="widthFix"></image>
				<view class="title">
					水费
				</view>
			</view>
			<view class="item" :class="{active:tabs_index == 3}" @click="tabs_index=3">
				<u-radio-group v-model="tabs_index">
					<u-radio name="3" active-color="#06A477"></u-radio>
				</u-radio-group>
				<image v-show="tabs_index != 3" style="height: auto;" src="@/static/img/9.png" mode="widthFix"></image>
				<image v-show="tabs_index == 3" style="height: auto;" src="@/static/img/10.png" mode="widthFix"></image>
				<view class="title">
					燃气费
				</view>
			</view> -->
		</view>
		<view class="h_title">
			<view class="left">服务支持</view>
		</view>
		<!-- 服务支持 -->
		<view class="Service">
			<view class="box">
				<view class="item bg1" @click="$to('/pages/room/index')">
					<view class="top">
						<image style="height: auto;" src="@/static/img/12.png" mode="widthFix"></image>
					</view>
					<view class="title">
						我的租约
					</view>
				</view>
				<view class="item bg2">
					<view class="top">
						<image style="height: auto;" src="@/static/img/13.png" mode="widthFix"></image>
					</view>
					<view class="title">
						门禁锁
					</view>
				</view>
				<view class="item bg3" @click="cbjl">
					<view class="top">
						<image style="height: auto;" src="@/static/img/14.png" mode="widthFix"></image>
					</view>
					<view class="title">
						抄表记录
					</view>
				</view>
				<view class="item bg4" @click="xxfs">
					<view class="top">
						<image style="height: auto;" src="../../static/img/mine1.png" mode="widthFix"></image>
					</view>
					<view class="title">
						发送消息
					</view>
				</view>
				<view class="item bg5" @click="$to('/pages/grid/grid')">
					<view class="top">
						<image style="height: auto;" src="../../static/img/122.png" mode="widthFix"></image>
					</view>
					<view class="title">
						一件报修
					</view>
				</view>
			</view>
			
		</view>
		<view class="h_title">
			<view class="left">数据分析</view>
		</view>
		<view class="Analysis">
			<view class="tabs">
				<view class="item" :class="{active:analysis_index == 1}" @click="statistical(1)">
					电
				</view>
				<view class="item" :class="{active:analysis_index == 2}" @click="statistical(2)">
					水
				</view>
				<view class="item" :class="{active:analysis_index == 3}" @click="statistical(3)">
					气
				</view>
				<view class="item" :class="{active:analysis_index == 4}" @click="statistical(4)">
					热
				</view>
			</view>
			<view class="tabs_content">
				<view class="tabs_uchars">
					<view class="charts-box">
						<qiun-data-charts :canvas2d="true" canvasId="abcdefghijklmnopqrstuw" type="column"
							:chartData="chartData2" background="none" :opts="opts" />
					</view>
				</view>
			</view>
		</view>
		<u-tabbar v-model="current" :list="tabbar" active-color="#04A376"></u-tabbar>
	</view>
</template>

<script>
	import {
		tbZdList,
		getYsWsTjVoByFd,
		getMyAnnouncementSend
	} from "../../api/index.js"
	import socket from "@/common/js-sdk/socket/socket.js"
	import tabbar from "@/tabbar.js"
	export default {
		watch: {
			analysis_index() {
				this.chartData2 = {};
				setTimeout(() => {
					this.chartData2 = this.chartData;
				}, 500)
			}
		},
		data() {
			return {
				current: 0,
				tabbar: tabbar.list,
				socket_length: 0, //未读的消息数量
				tabs_index: 1, //电费、水费、燃气费切换
				analysis_index: 1, //数据分析切换
				background: {
					// 渐变色
					backgroundImage: 'linear-gradient(180deg, #37B08F, #18A981,#00A477)'
				},
				list: [{
						image: require("@/static/img/78.png")
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg'
					}
				],
				// bar_list: [
				// 	"你有一条消息"
				// ],
				chartData: {
					categories: [
						"2016",
						"2017",
						"2018",
						"2019",
						"2020",
						"2021"
					],
					series: [{
							name: "本月应缴",
							data: []
						},
						{
							name: "本月未缴",
							data: []
						}
					]
				},
				opts: {
					"type": "column",
					"canvasId": "",
					"canvas2d": false,
					"background": "none",
					"animation": true,
					"timing": "easeInOut",
					"duration": 1000,
					"color": [
						"#04A376",
						"#BFF1D5"
					],
					"padding": [
						15,
						15,
						0,
						5
					],
					"rotate": false,
					"errorReload": true,
					"fontSize": 13,
					"fontColor": "#666666",
					"enableScroll": false,
					"touchMoveLimit": 60,
					"enableMarkLine": false,
					"dataLabel": false,
					"dataPointShape": true,
					"dataPointShapeType": "solid",
					"tapLegend": true,
					"xAxis": {
						"disabled": true,
						"axisLine": false,
						"axisLineColor": "#F8F9FB",
						"calibration": false,
						"fontColor": "",
						"fontSize": 15,
						"rotateLabel": false,
						"itemCount": 5,
						"boundaryGap": "center",
						"disableGrid": true,
						"gridColor": "",
						"gridType": "solid",
						"dashLength": 4,
						"gridEval": 1,
						"scrollShow": false,
						"scrollAlign": "left",
						"scrollColor": "#F8F9FB",
						"scrollBackgroundColor": "#EFEBEF",
						"min": -2e-18,
						"format": ""
					},
					"yAxis": {
						"disabled": false,
						"disableGrid": false,
						"splitNumber": 5,
						"gridType": "solid",
						"dashLength": 8,
						"gridColor": "#F8F9FB",
						"padding": 5,
						"showTitle": false,
						"data": []
					},
					"xAxis": {
						"disabled": false,
						"disableGrid": false,
						"fontSize": 10,
						"splitNumber": 5,
						"gridType": "solid",
						"dashLength": 8,
						"gridColor": "#F8F9FB",
						"padding": 5,
						"showTitle": false,
						"data": []
					},
					"legend": {
						"show": true,
						"position": "top",
						"float": "center",
						"padding": 5,
						"margin": 5,
						"backgroundColor": "rgba(0,0,0,0)",
						"borderColor": "rgba(0,0,0,0)",
						"borderWidth": 0,
						"fontSize": 13,
						"fontColor": "#878D99",
						"lineHeight": 11,
						"hiddenColor": "",
						"itemGap": 10
					},
					"extra": {
						"column": {
							"type": "group",
							"width": 10,
							"seriesGap": 0,
							"categoryGap": 5,
							"barBorderCircle": true,
							"linearType": "none",
							"linearOpacity": 1,
							"colorStop": 0,
							"meterBorder": 1,
							"meterFillColor": "#FFFFFF",
							"activeBgColor": "#000000",
							"activeBgOpacity": 0,
							"meterBorde": 1
						},
						"tooltip": {
							"showBox": true,
							"showArrow": true,
							"showCategory": false,
							"borderWidth": 0,
							"borderRadius": 5,
							"borderColor": "#000000",
							"borderOpacity": 0.6,
							"bgColor": "#000000",
							"bgOpacity": 0.6,
							"gridType": "solid",
							"dashLength": 4,
							"gridColor": "#CCCCCC",
							"fontColor": "#FFFFFF",
							"splitLine": true,
							"horizentalLine": false,
							"xAxisLabel": false,
							"yAxisLabel": false,
							"labelBgColor": "#FFFFFF",
							"labelBgOpacity": 0.7,
							"labelFontColor": ""
						},
						"markLine": {
							"type": "solid",
							"dashLength": 4,
							"data": []
						}
					}
				},
				chartData2: {},
				username: "",
				totalAmount: 0,
				time: '',
				xxsome: 0
			}
		},
		onLoad() {
			this.chartData2 = this.chartData;
			this.username = uni.getStorageSync('userInfo').username;
			this.onSocketOpen()
			this.onSocketReceive()
			this.allBills()
			this.statistical()
			this.xxtx()
		},
		destroyed() { // 离开页面生命周期函数
			socket.closeSocket()
		},
		methods: {
			// 发送消息
			xxfs() {
				uni.navigateTo({
					url:"../message/message"
				})
			},
			// 统计对比图数据
			statistical(index) {
				// console.log(index);
				this.analysis_index=index;
				let mydate = new Date();
				let year = mydate.getFullYear();
				let month = mydate.getMonth() + 1;
				let arr = [];
				let time = '';
				for (let i = 1; i <= 6; i++) {
					time = year + '.' + month;
					arr.unshift(time)
					if (month == 1) {
						year -= 1;
						month = 12;
					} else {
						month--;
					}
				}
				this.chartData.categories = arr;

				getYsWsTjVoByFd({
					createBy: this.username,
					zdlx: this.analysis_index
				}).then(res => {
					this.chartData.series[0].data.push(res.result.ysje1)
					this.chartData.series[0].data.push(res.result.ysje2)
					this.chartData.series[0].data.push(res.result.ysje3)
					this.chartData.series[0].data.push(res.result.ysje4)
					this.chartData.series[0].data.push(res.result.ysje5)
					this.chartData.series[0].data.push(res.result.ysje6)
					this.chartData.series[1].data.push(res.result.wsje1)
					this.chartData.series[1].data.push(res.result.wsje2)
					this.chartData.series[1].data.push(res.result.wsje3)
					this.chartData.series[1].data.push(res.result.wsje4)
					this.chartData.series[1].data.push(res.result.wsje5)
					this.chartData.series[1].data.push(res.result.wsje6)
					// console.log(this.chartData.series)
				})
			},
			// 抄表记录按钮
			cbjl() {
				uni.navigateTo({
					url: "../cbjl/cbjl"
				})
			},
			// 续费按钮跳转充值页面
			chongzhi() {
				uni.switchTab({
					url: "../charge/index"
				})
			},
			// 账单
			allBills() {
				tbZdList({
					zfr: this.username,
					zdzt: '0'
				}).then(res => {
					this.totalAmount = Number(this.totalAmount)
					let add = 0
					res.result.records.forEach(item => {
						this.totalAmount += item.sjje
					})
				})
				let mydate = new Date();
				let year = mydate.getFullYear();
				let month = mydate.getMonth() + 1;
				let date = mydate.getDate();
				this.time = year + '-' + month + '-' + date
			},
			messageCenter() {
				// this.bar_list = ['你有0条消息未读']
				uni.navigateTo({
					url: "../messageCenter/messageCenter"
				})
			},
			 onSocketOpen(res) {
				// WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
				
				// console.log(res);
				socket.init('websocket'); //对应要连接的socket
			},
			// 消息提醒
			async xxtx() {
				await getMyAnnouncementSend({
					pageNo: 1,
					pageSize: 100,
					column: "createTime",
					order: "desc",
				}).then((ress) => {
					// console.log(ress);
					ress.result.records.forEach(item => {
						if(item.readFlag==0) {
							this.xxsome++
						}
					})
				});
				console.log(this.xxsome)
			},
			onSocketReceive() {
				var _this = this
				socket.acceptMessage = (res) => {
					this.xxsome++
					console.log(this.xxsome);
					// console.log("页面收到的消息", res);
					// _this.socket_length++;
					// _this.bar_list[0] = '你有' + _this.socket_length + '条消息未读'
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: #F8F9FB;
	}

	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
<style lang="scss" scoped>
	.red {
		color: #DD524D;
	}
	
	.jiantou {
		margin-left: 100rpx;
	}
	.content {
		padding: 35rpx;
		.bar {
			// width: 670rpx;
			display: flex;
			// justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			margin-top: 20rpx;
			background-color: #D9FFF4;
			border: 1rpx solid #BEEFD4;
			border-radius: 20rpx;
			padding: 10rpx 20rpx 10rpx 20rpx;

			.left {
				display: flex;

				.img {
					width: 60rpx;
					height: 60rpx;
					margin: auto 0;
				}

				span {
					color: #04A376;
					padding-left: 20rpx;
					margin: auto 0;
				}
			}

			.right {
				// flex: 1;
				margin-left: 10rpx;
				// /deep/.u-icon__icon {
				// 	color: #04A376 !important;
				// }
			}
		}

		.Living {
			//生活缴费
			//display: flex;
			//justify-content: space-between;
			position: relative;

			.left {
				position: absolute;
				left: 40rpx;
				top: 20rpx;
				bottom: 20rpx;
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				z-index: 10;

				h1 {
					font-size: 52rpx;
				}

				p {
					font-size: 25rpx;
				}
			}

			.right {
				position: absolute;
				right: 40rpx;
				top: 20rpx;
				bottom: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				padding: 40rpx 0;
				z-index: 10;

				p {
					color: #fff;
					line-height: 2.5;
				}
			}

			.item {
				width: 31%;
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;
				padding: 20rpx;
				border-radius: 25rpx;
				color: #2C2F37;

				image {
					width: 70rpx;
					margin: 35rpx auto;
				}

				/deep/.u-radio__icon-wrap {
					border-color: #04A376 !important;
				}

				/deep/.u-radio__icon-wrap--checked {
					border-color: #fff !important;
					background-color: #fff !important;

					text {
						color: #06A477 !important;
					}
				}

				>.title {
					padding-bottom: 30rpx;
					text-align: center;
				}

				&.active {
					color: #fff;
					background-color: #38AE8E;
					box-shadow: 0 3rpx 10rpx #38AE8E;
				}
			}
		}

		.Service {
			//服务与支持
			overflow: hidden;
			.box {
				display: flex;
				justify-content: space-between;
				overflow-x: auto;
				.item {
					margin: 0 10rpx;
					&.bg1 {
						.top {
							background-color: #D4F5F3;
						}
					}
				
					&.bg2 {
						.top {
							background-color: #FEDED1;
						}
					}
				
					&.bg3 {
						.top {
							background-color: #D5DFFE;
						}
					}
				
					&.bg4 {
						.top {
							background-color: #FDF0D2;
						}
					}
					
					&.bg5 {
						.top {
							background-color: #C0C0C0;
						}
					}
				
					padding: 40rpx 0;
				
					image {
						width: 70rpx;
						margin: auto;
					}
				
					.top {
						width: 150rpx;
						height: 150rpx;
						border-radius: 50%;
						display: flex;
					}
				
					.title {
						text-align: center;
						padding-top: 30rpx;
						font-size: 32rpx;
						color: #2C2F37;
					}
				}
			}
			
		}

		.Analysis {

			//数据分析
			.tabs {
				display: flex;
				padding: 10rpx 20rpx;
				background-color: #D9FFF4;
				border: 1rpx solid #BEEFD4;
				border-radius: 30rpx;

				.item {
					flex: 1;
					border-radius: 10rpx;
					text-align: center;
					padding: 20rpx 0;
					color: #04A376;

					&.active {
						background-color: #04A376;
						color: #fff;
					}
				}
			}
		}
	}
</style>
