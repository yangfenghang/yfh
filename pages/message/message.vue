<template>
	<view id="announcement">
		<view class="header">新消息发送</view>
		<view class="title">
			<view class="top">
				<image class="imgs" src="../../static/img/42.png" mode=""></image>
				<view class="topTitle">标题填写</view>
			</view>
			<input v-model="tidings.titile" class="inputText" type="text" placeholder="在这里写上标题" />
		</view>

		<view class="push">
			<view class="top">
				<view class="left">
					<image class="imgs" src="../../static/img/42.png" mode=""></image>
					<view class="topPush">接收人</view>
				</view>
				<view v-if="flag==0" @click="khxx" class="right">+</view>
			</view>
			<view v-if="flag==1" class="bottom">
				<view class="donecon">
					<view class="dcpme">{{xzList[0].zfr_dictText}}</view>
					<view class="heone">{{xzList[0].zfr}}</view>
				</view>
			</view>
			<view v-else class="bottom">
				<view @click="khxx" v-if="xzList.length==0">请选择接收客户</view>
				<view v-else v-for="(item, index) in xzList" :key="item.id">
					<view class="donecon">
						<view class="dcpme">{{item.zfr_dictText}}</view>
						<!-- <view class="heone">{{item.zfr}}</view> -->
					</view>
				</view>
			</view>
		</view>

		<view class="content">
			<view class="top">
				<image class="imgs" src="../../static/img/42.png" mode=""></image>
				<view class="topContent">发送内容</view>
			</view>
			<textarea v-model="tidings.msgContent" @input="quantity" class="con" placeholder="请输入您想发送的内容"
				maxlength="200" />
			<view class="quantity">{{number}}/200</view>
		</view>

		<button class="release" @click="condex" type="default">发送</button>
		<!-- 弹出层 -->
		<u-popup v-model="show" mode="bottom" height="60%">
			<view class="nameTitle">客户</view>
			<u-search placeholder="请输入电话号码" :show-action="false" v-model="keyword" @search="search"></u-search>
			<view class="ul">
				<view v-for="(item, index) in khList" :key="index">
					<view class="li" @click="xzname(index)">
						<view class="box">
							<view class="name">{{item.zfr_dictText}}</view>
							<!-- <view class="phone">{{item.zfr}}</view> -->
						</view>
						<label class="radio">
							<radio :checked="item.value" />
						</label>
					</view>
				</view>
			</view>
			<view class="buttonD">
				<view class="left" @click="show=false">返回</view>
				<view class="right" @click="qdname">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		addAndReleaseData,
		tbFkList
	} from "../../api/index.js";
	export default {
		data() {
			return {
				show: false,
				number: 0,
				xzList: [],
				khList: [],
				zfrId: [],
				// song: {hflr: "123", lynr: "123"},
				hflr: "",
				lynr: "",
				username: '',
				tidings: {
					msgAbstract: '', // 发布人名字
					msgCategory: '2', //发布人名字
					msgContent: '', //发布内容
					msgType: 'USER',
					priority: 'H',
					titile: '', //消息标题
					userIds: '', //zfr
				},
				flag: 0,
			}
		},
		onLoad(ondex) {
			console.log(ondex);
			if(ondex.flag==1) {
				// console.log(1111);
				this.flag=1;
				this.tidings.userIds=ondex.zfr;
				this.tidings.titile="账单催费";
				this.tidings.msgContent="账单编号："+ondex.zdbh+"     金额："+ondex.sjje
				this.xzList[0] = {
					zfr: ondex.zfr,
					zfr_dictText:ondex.zfr_dictText
				}
				// this.xzList[0].zfr=ondex.zfr;
				// this.xzList[0].zfr_dictText=ondex.zfr_dictText
			} else {
				this.flag=0;
			}
			this.username = uni.getStorageSync('userInfo').username;
			this.tidings.msgAbstract = uni.getStorageSync('userInfo').realname;
		},
		methods: {
			// 搜索用户
			search() {
				console.log(this.keyword);
				tbFkList({
					zfr: this.keyword,
					createBy: this.username,
					fjczzt: '1'
				}).then(res => {
					this.khList = res.result.records.map(item => {
						return {
							zfr: item.zfr,
							zfr_dictText: item.zfr_dictText,
							value: false,
						}
					})
					console.log(this.khList)
				})
			},
			// 选择客户确定按钮
			qdname() {
				this.xzList = [];
				this.zfrId = [];
				this.khList.forEach(item => {
					if (item.value == true) {
						this.xzList.push(item);
						this.zfrId.push(item.zfr);
					}
				})
				if (this.zfrId.length != 1) {
					this.tidings.userIds = this.zfrId.toString()
				} else {
					this.tidings.userIds = this.zfrId[0]
				}
				// console.log(this.zfrId);
				console.log(this.tidings.userIds);
				this.show = false;
				// console.log(this.xzList);
			},
			// 选择客户
			xzname(index) {
				console.log(index);
				this.khList[index].value = !this.khList[index].value;

			},
			// 选择客户按钮
			khxx() {
				this.show = true;
				tbFkList({
					zfr: this.username,
					// fjczzt: '1'
				}).then(res => {
					console.log(res);
					this.khList = res.result.records.map(item => {
						return {
							zfr: item.createBy,
							zfr_dictText: item.createBy_dictText,
							value: false,
						}
					})
					console.log(this.khList)
				})
			},
			quantity() {
				this.number = this.tidings.msgContent.length;
			},
			buttons(index) {
				this.button[index].flag = !this.button[index].flag;
			},
			condex() {
				console.log(this.tidings);
				if (this.tidings.titile == '') {
					uni.showModal({
						content: "请输入标题",
					})
					return
				}
				if(this.tidings.userIds=='') {
					uni.showModal({
						content: "请选择接收人"
					})
					return
				}
				if (this.tidings.msgCategory=='') {
					uni.showModal({
						content: "请输入发送内容"
					})
					return
				} else {
					console.log(this.tidings);
					addAndReleaseData(this.tidings).then(res => {
						// console.log(res);
						if(res.success==true) {
							uni.showModal({
								content: res.message,
								success: (res1) => {
									if (res1.confirm) {
										uni.navigateTo({
											url: "../info/index"
										})
									} else {
										// console.log("用户点击取消")
									}
								}
							})
						} else {
							uni.showModal({
								content: res.message,
							})
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.imgs {
		width: 35rpx;
		height: 20rpx;
	}

	button::after {
		border: none;
	}

	.nameTitle {
		font-size: 35rpx;
		text-align: center;
		margin: 10rpx 0;
	}

	.ul {
		margin-top: 10rpx;
		height: 550rpx;
		overflow-y: auto;

		.li {
			padding: 0 20rpx;
			padding-bottom: 10rpx;
			margin-bottom: 10rpx;
			border-bottom: 1rpx solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.box {
				display: flex;
				font-size: 30rpx;

				.phone {
					margin-left: 40rpx;
					color: #878D99;
				}
			}
		}
	}

	.buttonD {
		display: flex;
		justify-content: space-around;
		align-items: center;

		.left {
			width: 305rpx;
			height: 80rpx;
			border-radius: 12rpx;
			background-color: #ECECF4;
			font-size: 32rpx;
			text-align: center;
			line-height: 75rpx;
		}

		.right {
			width: 305rpx;
			height: 80rpx;
			border-radius: 12rpx;
			background-color: #11A77E;
			color: #FFFFFF;
			font-size: 32rpx;
			text-align: center;
			line-height: 75rpx;
		}
	}

	#announcement {
		box-sizing: border-box;
		padding: 40rpx 40rpx 60rpx 40rpx;

		.header {
			font-size: 32rpx;
			font-weight: bold;
			margin-bottom: 40rpx;
		}

		.title {
			box-sizing: border-box;
			padding-bottom: 40rpx;
			border-bottom: 1rpx solid #CED1D7;
			margin-bottom: 40rpx;

			.top {
				display: flex;
				align-items: center;
				padding-bottom: 40rpx;

				.topTitle {
					font-size: 30rpx;
					padding-left: 15rpx;
				}
			}

			.inputText {
				font-size: 26rpx;
			}
		}

		.push {
			margin-bottom: 40rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 40rpx;

				.left {
					display: flex;
					align-items: center;

					.topPush {
						font-size: 30rpx;
						padding-left: 15rpx;
					}
				}

				.right {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					color: #fff;
					background-color: #43B897;
					text-align: center;
					line-height: 32rpx;
					font-size: 40rpx;
				}
			}

			.bottom {
				.donecon {
					// border-bottom: 1rpx solid #eee;
					display: flex;
					font-size: 30rpx;
					margin-bottom: 10rpx;
					padding-bottom: 10rpx;
					padding-left: 10rpx;

					.heone {
						margin-left: 30rpx;
						color: #878D99;
					}
				}
			}
		}

		.content {
			margin-bottom: 40rpx;
			position: absolute;

			.top {
				display: flex;
				align-items: center;
				margin-bottom: 40rpx;

				.topContent {
					font-size: 30rpx;
					padding-left: 15rpx;
				}
			}

			.con {
				width: 670rpx;
				height: 260rpx;
				box-sizing: border-box;
				padding: 20rpx;
				border: 1rpx solid #CED1D7;
				border-radius: 12rpx;
				font-size: 26rpx;

			}

			.quantity {
				font-size: 24rpx;
				color: D3D3D3;
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
			}
		}

		.release {
			position: absolute;
			bottom: 60rpx;
			width: 670rpx;
			height: 80rpx;
			color: #fff;
			background-color: #38AE8E;
			font-size: 30rpx;
			border-radius: 47rpx;
		}
	}

	.color {
		background-color: #D9FFF4;
		color: #04A376;
	}
</style>
