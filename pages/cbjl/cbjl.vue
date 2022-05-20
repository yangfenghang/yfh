<template>
	<view id="cbjlList">
		<view class="zwsj" v-if="list.length==0">
			<image class="img" src="../../static/img/954.png" mode=""></image>
			<view class="title">暂无抄表数据</view>
		</view>
		<view v-else class="ul" v-for="(item, index) in list" :key="index">
			<view class="li">
				<view class="content dont">
					<view class="left">{{item.fz}}1</view>
					<view class="right">{{item.sb}}1</view>
				</view>
				<view class="content">
					<view class="left">设备编码</view>
					<view class="right">{{item.bm}}</view>
				</view>
				<view class="content">
					<view class="left">值</view>
					<view class="right">{{item.zhi}}</view>
				</view>
				<view class="bottom">{{item.sj}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		gitCbjlList
	} from "../../api/index.js"
	export default {
		data() {
			return {
				username: "",
				list: [],
				pageNo: 1,
				pageSize: 10,
			}
		},
		onLoad() {
			this.username = uni.getStorageSync('userInfo').username;
			this.cbjlList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				this.list = []
				this.cbjlList();
			}, 3000)
		},
		// 上拉加载更多
		onReachBottom() {
			this.pageNo++;
			uni.showLoading({
				title: '加载中'
			});

			setTimeout(() => {
				// uni.hideLoading();
				uni.showToast({
					title: "加载成功"
				})
				this.cbjlList()
			}, 2000);
		},
		methods: {
			cbjlList() {
				gitCbjlList({
					createBy: this.username,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					column: "createTime",
					order: "desc",
					czzl: "d"
				}).then(res => {
					console.log(res);
					let condex = res.result.records.map(item => {
						return {
							sb: item.sbId_dictText,
							fz: item.sbfzId_dictText,
							bm: item.sbbm,
							zhi: item.zhi,
							sj: item.cbTime,
						}
					})
					condex.forEach(item => {
						this.list.push(item)
					})
					console.log(this.list);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.zwsj {
		.img {
			margin-top: 100rpx;
			width: 670rpx;
			height: 400rpx;
		}
		.title {
			text-align: center;
			font-size: 32rpx;
			font-weight: 400;
		}
	}
	
	#cbjlList {
		padding: 40rpx;

		.li {
			box-shadow: 0 2rpx 10rpx #ddd;
			border-radius: 14rpx;
			padding: 20rpx;

			.dont {
				border-bottom: 1rpx solid #eee;
				padding-bottom: 10rpx;
			}

			.text {
				border-bottom: 1rpx solid #eee;
				padding-bottom: 10rpx;
				margin-bottom: 10rpx;
			}

			.content {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
			}

			.bottom {
				border-top: 1rpx solid #eee;
				padding-top: 10rpx;
			}
		}
	}
</style>
