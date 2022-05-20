<template>
	<view id="zdList">
		<view class="boding">
			<view class="xiangqin">
				<view class="title">{{orderList.fcId_dictText}} - {{orderList.fjId_dictText}}</view>
				<view class="li">
					<view class="lift">账单编号</view>
					<view class="rigth">{{orderList.zdbh}}</view>
				</view>
				<view class="li">
					<view class="lift">起始时间</view>
					<view class="rigth">{{orderList.qssj}}</view>
				</view>
				<view class="li">
					<view class="lift">终止时间</view>
					<view class="rigth">{{orderList.zzsj}}</view>
				</view>
				<view class="li">
					<view class="lift">总金额</view>
					<view class="rigth">{{orderList.sjje}}元</view>
				</view>
				<view class="li" v-if="orderList.zdzt!=0">
					<view class="lift">扣款时间</view>
					<view v-if="orderList.kksj==null" class="right"></view>
					<view v-else class="rigth">{{orderList.kksj}}</view>
				</view>
			</view>
			<view class="br"></view>
			<view class="title">
				<view class="left">
					<image class="img" src="../../static/img/42.png" mode=""></image>
					<view class="text">账单明细</view>
				</view>
				<!-- <view class="right">{{orderList.zdzt_dictText}}</view> -->
			</view>
			<view class="br"></view>
			<view class="sumeli" v-if="glf.flag==true">
				<view class="heads">管理费</view>
				<view class="under">
					<view class="li">
						<view class="lift">单价</view>
						<view class="right">{{glf.dj}}元/{{glf.dwlx}}</view>
					</view>
				</view>
				<view class="buttom">
					<view class="lift">本期费用：</view>
					<view class="right">{{glf.dj}}元</view>
				</view>
				<!-- <view v-else class="buttom">已缴费</view> -->
			</view>
			<view class="sumeli" v-if="sf.flag==true">
				<view class="heads">水费</view>
				<view class="under">
					<view class="li">
						<view class="lift">单价</view>
						<view class="right">{{sf.dj}}元/{{sf.dwlx}}</view>
					</view>
					<view class="li">
						<view class="lift">本期读数</view>
						<view class="right">{{sf.zyl}}</view>
					</view>
					<view class="li">
						<view class="lift">上期读数</view>
						<view class="right">{{sf.syyl}}</view>
					</view>
					<view class="li">
						<view class="lift">本期使用量</view>
						<view class="right">{{sf.byyl}}</view>
					</view>
				</view>
				<view class="buttom">
					<view class="lift">本期费用：</view>
					<view class="right">{{sf.bqje}}元</view>
				</view>
				<!-- <view v-else class="buttom">已缴费</view> -->
			</view>
			<view class="sumeli" v-if="rqf.flag==true">
				<view class="heads">燃气费</view>
				<view class="under">
					<view class="li">
						<view class="lift">单价</view>
						<view class="right">{{rqf.dj}}元/{{rqf.dwlx}}</view>
					</view>
					<view class="li">
						<view class="lift">本期读数</view>
						<view class="right">{{rqf.zyl}}</view>
					</view>
					<view class="li">
						<view class="lift">上期读数</view>
						<view class="right">{{rqf.syyl}}</view>
					</view>
					<view class="li">
						<view class="lift">本期使用量</view>
						<view class="right">{{rqf.byyl}}</view>
					</view>
				</view>
				<view class="buttom">
					<view class="lift">本期费用：</view>
					<view class="right">{{rqf.bqje}}元</view>
				</view>
				<!-- <view v-else class="buttom">已缴费</view> -->
			</view>
			<view class="sumeli" v-if="fz.flag==true">
				<view class="heads">房租</view>
				<view class="under">
					<view class="li">
						<view class="lift">单价</view>
						<view class="right">{{fz.dj}}元/{{fz.dwlx}}</view>
					</view>
				</view>
				<view class="buttom">
					<view class="lift">本期费用：</view>
					<view class="right">{{fz.dj}}元</view>
				</view>
				<!-- <view v-else class="buttom">已缴费</view> -->
			</view>
			<view class="sumeli" v-if="wsf.flag==true">
				<view class="heads">卫生费</view>
				<view class="under">
					<view class="li">
						<view class="lift">单价</view>
						<view class="right">{{wsf.dj}}元/{{wsf.dwlx}}</view>
					</view>
				</view>
				<view class="buttom">
					<view class="lift">本期费用：</view>
					<view class="right">{{wsf.dj}}元</view>
				</view>
				<!-- <view v-else class="buttom">已缴费</view> -->
			</view>
			<view class="sumeli" v-if="wyf.flag==true">
				<view class="heads">物业费</view>
				<view class="under">
					<view class="li">
						<view class="lift">单价</view>
						<view class="right">{{wyf.dj}}元/{{wyf.dwlx}}</view>
					</view>
				</view>
				<view class="buttom">
					<view class="lift">本期费用：</view>
					<view class="right">{{wyf.dj}}元</view>
				</view>
				<!-- <view v-else class="buttom">已缴费</view> -->
			</view>
			<view class="sumeli" v-if="zmf.flag==true">
				<view class="heads">照明费</view>
				<view class="under">
					<view class="li">
						<view class="lift">单价</view>
						<view class="right">{{zmf.dj}}元/{{zmf.dwlx}}</view>
					</view>
					<view class="li">
						<view class="lift">本期用量(千瓦时)</view>
						<view class="right">{{zmf.zyl}}</view>
					</view>
					<view class="li">
						<view class="lift">上期读数(千瓦时)</view>
						<view class="right">{{zmf.syyl}}</view>
					</view>
					<view class="li">
						<view class="lift">本期读数(千瓦时)</view>
						<view class="right">{{zmf.byyl}}</view>
					</view>
				</view>
				<view class="buttom">
					<view class="lift">本期费用：</view>
					<view class="right">{{zmf.bqje}}元</view>
				</view>
				<!-- <view v-else class="buttom">已缴费</view> -->
			</view>
			<view class="sumeli" v-if="df.flag==true">
				<view class="heads">电费</view>
				<view class="under">
					<view class="li">
						<view class="lift">单价</view>
						<view class="right">{{df.dj}}元/{{df.dwlx}}</view>
					</view>
					<view class="li">
						<view class="lift">本期读数</view>
						<view class="right">{{df.zyl}}</view>
					</view>
					<view class="li">
						<view class="lift">上期读数</view>
						<view class="right">{{df.syyl}}</view>
					</view>
					<view class="li">
						<view class="lift">本期使用量</view>
						<view class="right">{{df.byyl}}</view>
					</view>
				</view>
				<view class="buttom">
					<view class="lift">本期费用：</view>
					<view class="right">{{df.bqje}}元</view>
				</view>
				<!-- <view v-else class="buttom">已缴费</view> -->
			</view>
		</view>
		<view class="jiezh">
			<view class="lift">本期总金额：<text class="feiyong">￥{{orderList.sjje}}元</text></view>
			<view v-if="orderList.zdzt=='0'" class="right" @click="jiaofei">立即缴费</view>
			<view class="green" v-else>已缴费</view>
		</view>

		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import {
		TbZdMxByMain,
		TbZdMxByMx,
		jiaofeiPost
	} from "@/api/index.js"
	export default {
		data() {
			return {
				id: '',
				zdIdN: '',
				zdmxLest: [],
				zdmxzje: 0,
				zdlxLest: [],
				orderList: {},
				glf: {
					flag: false,
					dj: 0,
					dwlx: ''
				},
				sf: {
					flag: false,
					dj: 0,
					zyl: 0,
					syyl: 0,
					byyl: 0,
					bqje: 0,
					dwlx: ''
				},
				rqf: {
					flag: false,
					dj: 0,
					zyl: 0,
					syyl: 0,
					byyl: 0,
					bqje: 0,
					dwlx: ''
				},
				fz: {
					flag: false,
					dj: 0,
					dwlx: ''
				},
				wsf: {
					flag: false,
					dj: 0,
					dwlx: ''
				},
				wyf: {
					flag: false,
					dj: 0,
					dwlx: ''
				},
				zmf: {
					flag: false,
					dj: 0,
					zyl: 0,
					syyl: 0,
					byyl: 0,
					bqje: 0,
					dwlx: ''
				},
				df: {
					flag: false,
					dj: 0,
					zyl: 0,
					syyl: 0,
					byyl: 0,
					bqje: 0,
					dwlx: ''
				},
			}
		},
		onLoad(ondel) {
			console.log(ondel);
			this.id = ondel.id;
			this.orderList = JSON.parse(ondel.orderList);
			console.log(this.orderList);
			this.zdList();
		},
		methods: {
			jiaofei() {
				if (this.orderList.zdzt == '0') {
					uni.showModal({
						content: '是否进行缴费',
						success: (ress) => {
							if (ress.confirm) {
								jiaofeiPost({
									id: this.orderList.id
								}).then(res => {
									if (res.success) {
										this.$refs.uToast.show({
											title: res.result,
											type: 'success'
										})
										uni.navigateTo({
											url: "../success/success?sfrz=zhifu2"
										})
								
									} else {
										this.$refs.uToast.show({
											title: res.message,
											type: 'error'
										})
									}
								})
							} else if (ress.cancel) {
								// console.log('用户点击取消');
							}
						}
					})
					
				}
			},
			zdList() {
				TbZdMxByMain({
					id: this.id
				}).then(res => {
					console.log(res, 111);
					this.zdIdN = res.result[0].zdId
					TbZdMxByMx("?zdId=" + this.zdIdN).then(res => {
						console.log(res.result.records, 123);
						this.zdmxLest = res.result.records.map(item => {
							return {
								zdlx_dictText: item.zdlx_dictText,
								qsz: item.qsz,
								zzz: item.zzz,
								bqylz: item.bqylz,
								bqje: item.bqje,
								dj: item.dj,
								dwlx_dictText: item.dwlx_dictText
							}
						})
						this.zdmxLest.forEach(item => {
							if (item.zdlx_dictText == "管理费") {
								this.zdmxzje += Number(item.dj);
								this.glf.dj = item.dj;
								this.glf.flag = true;
								this.glf.dwlx = item.dwlx_dictText
							}
							if (item.zdlx_dictText == "水费") {
								this.zdmxzje += Number(item.bqje);
								this.sf.flag = true;
								this.sf.dj = item.dj;
								this.sf.zyl = item.zzz;
								this.sf.syyl = item.qsz;
								this.sf.byyl = item.bqylz;
								this.sf.bqje = item.bqje;
								this.sf.dwlx = item.dwlx_dictText
							}
							if (item.zdlx_dictText == "燃气费") {
								this.zdmxzje += Number(item.bqje)
								this.rqf.flag = true;
								this.rqf.dj = item.dj;
								this.rqf.zyl = item.zzz;
								this.rqf.syyl = item.qsz;
								this.rqf.byyl = item.bqylz;
								this.rqf.bqje = item.bqje;
								this.rqf.dwlx = item.dwlx_dictText
							}
							if (item.zdlx_dictText == "房租") {
								this.zdmxzje += item.dj
								this.fz.dj = item.dj;
								this.fz.flag = true;
								this.fz.dwlx = item.dwlx_dictText
							}
							if (item.zdlx_dictText == "卫生费") {
								this.zdmxzje += item.dj
								this.wsf.dj = item.dj;
								this.wsf.flag = true;
								this.wsf.dwlx = item.dwlx_dictText
							}
							if (item.zdlx_dictText == "物业费") {
								this.zdmxzje += item.dj
								this.wyf.dj = item.dj;
								this.wyf.flag = true;
								this.wyf.dwlx = item.dwlx_dictText
							}
							if (item.zdlx_dictText == "照明费") {
								this.zdmxzje += Number(item.bqje)
								this.zmf.flag = true;
								this.zmf.dj = item.dj;
								this.zmf.zyl = item.zzz;
								this.zmf.syyl = item.qsz;
								this.zmf.byyl = item.bqylz;
								this.zmf.bqje = item.bqje;
								this.zmf.dwlx = item.dwlx_dictText
							}
							if (item.zdlx_dictText == "电费") {
								this.zdmxzje += Number(item.bqje)
								this.df.flag = true;
								this.df.dj = item.dj;
								this.df.zyl = item.zzz;
								this.df.syyl = item.qsz;
								this.df.byyl = item.bqylz;
								this.df.bqje = item.bqje;
								this.df.dwlx = item.dwlx_dictText
							}
						})
					})
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	#zdList {
		padding: 40rpx;

		.boding {
			height: 1230rpx;
			overflow-y: auto;

			.xiangqin {
				font-size: 30rpx;

				.title {
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
				}

				.li {
					display: flex;
					justify-content: space-between;
					border-bottom: 1rpx solid #CED1D7;
					padding-bottom: 20rpx;
					margin-bottom: 20rpx;

					.lift {
						font-weight: 400;
						color: #372C2C;
					}

					.right {
						color: #878D99;
					}
				}
			}

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.left {
					display: flex;
					align-items: center;

					.img {
						width: 35rpx;
						height: 20rpx;
						margin-right: 10rpx;
					}

					.text {
						font-size: 32rpx;
						font-weight: bold;
					}
				}

				.right {
					font-size: 26rpx;
					font-weight: 400;
					color: #2C2F37;
				}
			}

			.sumeli {
				width: 100%;
				border-radius: 12rpx;
				box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.08);
				padding: 20rpx 40rpx;
				margin-bottom: 20rpx;

				.heads {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
				}

				.under {
					font-size: 26rpx;
					color: #2C2F37;
					border-top: 1px solid #CED1D7;
					;
					border-bottom: 1px solid #CED1D7;
					;
					padding-top: 20rpx;

					.li {
						display: flex;
						justify-content: space-between;
						margin-bottom: 20rpx;
					}
				}

				.buttom {
					display: flex;
					// margin-left: 60%;
					margin-top: 20rpx;
					font-size: 30rpx;

					.right {
						color: #04A376;
						font-weight: bold;
					}
				}
			}
		}

		.jiezh {
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding-top: 40rpx;

			.lift {
				font-size: 26rpx;
				color: #2C2F37;

				.feiyong {
					color: #04A376;
					font-weight: bold;
				}
			}

			.right {
				width: 240rpx;
				height: 80rpx;
				border-radius: 40rpx;
				background-color: #FD774C;
				color: #FFFFFF;
				font-size: 32rpx;
				text-align: center;
				line-height: 75rpx;
			}

			.green {
				width: 240rpx;
				height: 80rpx;
				border-radius: 40rpx;
				color: #FFFFFF;
				font-size: 32rpx;
				text-align: center;
				line-height: 75rpx;
				background-color: #11A77E;
			}
		}
	}
</style>
