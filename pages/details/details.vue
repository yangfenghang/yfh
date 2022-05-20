<template>
	<view id="details">
		<u-navbar :border-bottom="false" title="消息详情" title-color="#2C2F37" :title-bold="true"
			:background="{background:'#F8F9FB'}"></u-navbar>
		<view class="dment">
			<view class="xxbt">
				<view class="title">
					<view class="dongt">{{list.titile}}</view>
				</view>
				<!-- <view class="dont"></view> -->
			</view>
			<view class="fsr">
				<view class="title">
					<image class="img" src="../../static/img/42.png" mode=""></image>
					<view class="tob">发送人</view>
				</view>
				<view class="dont">{{list.msgAbstract}}</view>
			</view>
			<view class="time">
				<view class="title">
					<image class="img" src="../../static/img/42.png" mode=""></image>
					<view class="tob">发送时间</view>
				</view>
				<view class="dont">{{list.sendTime}}</view>
			</view>
			<view class="time">
				<view class="title">
					<image class="img" src="../../static/img/42.png" mode=""></image>
					<view class="tob">发送内容</view>
				</view>
				<view class="dont">{{list.msgContent}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		editByAnntIdAndUserId,
		getMyAnnouncementSend
	} from "../../api/index.js"
	export default {
		data() {
			return {
				anntId: 0,
				index: 0,
				list: {},
			}
		},
		onLoad(ondex) {
			// console.log(ondex)
			let item=JSON.parse(ondex.item);
			this.anntId = item.anntId
			this.list=item;
			// console.log(item);
			// this.index=ondex.index
			this.anndonList();
		},
		methods: {
			anndonList() {
				console.log(111);
				// getMyAnnouncementSend({
				// 	pageNo: 1,
				// 	pageSize: 100,
				// 	column: "createTime",
				// 	order: "desc",
				// }).then((res) => {
				// 	console.log(res);
				// 	this.list = res.result.records[this.index];
				// 	console.log(this.list);
				// });
				editByAnntIdAndUserId({
					anntId: this.anntId
				}).then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		.img {
			width: 35rpx;
			height: 20rpx;
		}

		.tob {
			font-size: 30rpx;
			font-weight: 400;
			margin-left: 10rpx;
		}
	}

	.dongt {
		font-size: 35rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	#details {
		.dment {
			padding: 40rpx;

			.dont {
				font-size: 26rpx;
				font-weight: 300;
				color: #878D99;
				margin-bottom: 40rpx;
			}
		}
	}
</style>
