<template>
	<view>
		<u-navbar :border-bottom="false" title="消息中心" title-color="#2C2F37" :title-bold="true"
			:background="{background:'#F8F9FB'}"></u-navbar>
		<view class="content">
			<!-- 分页展示 -->
			<view class="paging">
				<view :class="flag==0?'xuanzhong':''" @click="jjxx">接收消息</view>
				<view :class="flag==1?'xuanzhong':''" @click="fasong">发送消息</view>
			</view>
			<view class="sort">
				<view class="left">共{{ flag==0?list.length:jslist.length }}条数据</view>
				<!-- <view class="right" @click="clickSort">
					接收时间
					<view class="icon">
						<u-icon class="last" :class="{active:icon_active == 1}" name="play-left-fill"></u-icon>
						<u-icon class="firt" :class="{active:icon_active == 2}" name="play-right-fill"></u-icon>
					</view>
				</view> -->
			</view>
			
			<!-- 接收的消息 -->
			<view v-if="flag==0" v-for="(item,index) in list" :key="index">
				<!-- <view v-if="item.readFlag==0" class="new">New</view> -->
				<view class="item">
					<view class="head">
						<view class="title">
							<view class="tag" v-if="item.new">最新</view>
							<span>{{item.titile}}</span>
						</view>
						<view class="time">{{item.sendTime}}</view>
					</view>
					<view class="cont" v-html="item.msgContent"></view>
					<view class="detailed" @click="xxxq(item)">
						<span>详情</span>
						<view class="yidu" v-if="item.readFlag==1">已读</view>
						<view class="weidu" v-if="item.readFlag==0">未读</view>
					</view>
				</view>
			</view>
			
			<!-- 发送的消息 -->
			<view v-if="flag==1" v-for="(item,index) in jslist" :key="index">
				<view v-if="item.readFlag==0" class="new">New</view>
				<view class="item">
					<view class="head">
						<view class="title">
							<view class="tag" v-if="item.new">最新</view>
							<span>{{item.titile}}</span>
						</view>
						<view class="time">{{item.sendTime}}</view>
					</view>
					<view class="cont">接收人：{{item.userIds_dictText}}</view>
					<view class="detailed" @click="fsxx(index)">
						<span>详情</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMyAnnouncementSend,
		annountCement_list
	} from "@/api/index.js";
	import socket from "@/common/js-sdk/socket/socket.js"

	export default {
		data() {
			return {
				icon_active: 0, //排序
				list: [],
				username: '',
				flag: 0,
				jslist: []
			};
		},
		destroyed() { // 离开页面生命周期函数
			socket.closeSocket()
		},
		methods: {
			// 接收消息按钮
			jjxx() {
				this.flag=0
				this.myNews()
			},
			// 发送消息
			fasong() {
				this.flag=1
				this.gechentmessage()
			},
			// 发送消息的详情
			fsxx(index) {
				// console.log(this.jslist[index])
				uni.navigateTo({
					url: "../details2/details2?flag=1&id="+this.jslist[index].id
				})
			},
			// 接收消息详情按钮
			xxxq(item) {
				// console.log(item);
				uni.navigateTo({
					url: "../details2/details2?flag=0&id="+item.anntId
				})
			},
			gechentmessage() {
				annountCement_list({
					createBy: this.username,
					column: "createTime",
					order: "desc",
					pageNo: 1,
					pageSize: 10
				}).then(res => {
					console.log(res);
					this.jslist = res.result.records
				})
			},
			message() {
				// annountCement_list({
				// 	user_ids:uni.getStorageSync("userInfo").id,
				// 	pageSize: 999
				// }).then(res => {
				// 	console.log(res);
				// 	this.list = res.result.records
				// })
				this.gechentmessage()
				this.myNews()
			},
			onSocketOpen() {
				// WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
				socket.init('websocket'); //对应要连接的socket
			},
			onSocketReceive() {
				var _this = this
				socket.acceptMessage = function(res) {
					// console.log("页面收到的消息", res);
					_this.list.push(res)
					// /* cmd: "topic"
					// msgId: "1464853897494433794"
					// msgTxt: "23423423" */
					// if (res.cmd == "topic") {
					// 	//系统通知
					// 	console.log(res, "系统消息");
					// } else if (res.cmd == "user") {
					// 	//用户消息
					// } else if (res.cmd == 'email') {
					// 	//邮件消息
					// }
				}
			},
			clickSort() {
				this.icon_active++;
				if (this.icon_active > 2) {
					this.icon_active = 0;
				}
				console.log("点击进行排序", this.icon_active);
			},

			//获取消息接口
			myNews() {
				getMyAnnouncementSend({
					pageNo: 1,
					pageSize: 100,
					column: "createTime",
					order: "desc",
				}).then((res) => {
					// console.log(res);
					this.list = res.result.records;
					// console.log(this.list);
				});
			},
		},
		onShow() {
			// this.myNews();
			this.username=uni.getStorageSync('userInfo').username;
			this.message()
			this.onSocketOpen()
			this.onSocketReceive()
			// this.gechentmessage()
		},
	};
</script>
<style>
	page {
		background-color: #f6f6f6;
	}
</style>
<style lang="scss">
	.paging {
		display: flex;
		align-items: center;
		justify-content: center;
		// margin: 0 auto;
		view {
			width: 180rpx;
			height: 60rpx;
			color: #878D99;
			text-align: center;
			line-height: 58rpx;
			font-size: 30rpx;
			font-weight: 400;
			border-radius: 0px 12px 0px 12px;
			margin: 20rpx 40rpx;
		}
	}
	
	.xuanzhong {
		background-color: #38AE8E;
		color: #FFFFFF !important;
	}
	
	.new {
		color: #DD524D;
		margin-top: 40rpx;
		font-style: italic;
	}
	.content {
		padding: 20rpx 30rpx;

		.sort {
			display: flex;
			color: #878d99;

			.right {
				margin-left: auto;
				display: flex;

				.icon {
					display: flex;
					flex-direction: column;
					margin: auto 10rpx;

					.last {
						transform: rotate(90deg);
						font-size: 12rpx;

						&.active {
							color: #0aa57a;
						}
					}

					.firt {
						transform: rotate(90deg);
						font-size: 12rpx;

						&.active {
							color: #0aa57a;
						}
					}
				}
			}
		}

		.item {
			padding: 30rpx;
			background-color: #fff;
			margin-top: 40rpx;
			
			border-radius: 25rpx;
			box-shadow: 0 6rpx 15rpx rgba(0, 0, 0, 0.06);

			.head {
				display: flex;

				.title {
					color: #2c2f37;
					display: flex;

					.tag {
						background-color: #fd774c;
						color: #fff;
						padding: 2rpx 8rpx;
						border-radius: 6rpx;
						margin-right: 20rpx;
						font-size: 24rpx;
					}

					>span {
						font-size: 30rpx;
						font-weight: 600;
					}
				}

				.time {
					margin-left: auto;
					font-size: 26rpx;
					font-weight: 300;
				}
			}

			.cont {
				padding: 40rpx 0 20rpx 0;
				border-bottom: 1rpx solid #eee;
			}

			.detailed {
				padding-top: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				>span {
					background-color: #d9fff4;
					border: 1rpx solid #beefd4;
					color: #0aa57a;
					padding: 8rpx 20rpx;
					border-radius: 50rpx;
				}
				.yidu {
					color: #0aa57a;
				}
				.weidu {
					color: #DD524D;
				}
			}
		}
	}
</style>
