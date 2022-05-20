<template>
	<view>
		<u-navbar back-text="返回" title="我的租约" :background="background" title-color="#fff"
			:back-text-style="{color:'#fff'}" back-icon-color="#fff"></u-navbar>
		<view class="zwsj" v-if="list.length==0">
			<!-- <image class="img" src="../../static/img/954.png" mode=""></image> -->
			<view class="title">暂无绑定房屋</view>
		</view>
		<view v-else class="content">
			<h1>在租房屋</h1>
			<view class="item" v-for="(item,index) in list" :key="index">
				<image src="@/static/img/112.png" class="img"></image>
				<view class="text">
					<view class="title">{{item.fcTitle}}-{{item.title}}</view>
					<view class="info">
						<text v-if="item.mj==null"></text>
						<text v-else>{{item.mj}}m²</text>
						<text v-if="item.dz==''"></text>
						<text v-else>{{item.dz}}</text>
					</view>
					<view class="tag">
						<span>{{item.tag}}</span>
					</view>
					<view v-if="item.price==null" class="price"></view>
					<view v-else class="price">
						{{item.price}}元/月
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {tbFkList} from "../../api/index.js"
	export default {
		data() {
			return {
				username: '',
				background: {
					backgroundImage: 'linear-gradient(180deg, #37B08F, #18A981,#00A477)'
				},
				list: [{
						title: "",
						fcTitle: '',
						mj: 0,
						dz: "",
						tag: "在租",
						price: 0
					},
				]
			};
		},
		onLoad() {
			this.username=uni.getStorageSync('userInfo').username;
			this.myLease()
		},
		methods: {
			myLease() {
				tbFkList({zfr: this.username}).then(res => {
					console.log(res);
					this.list = res.result.records.map(item => {
						return {
							title: item.fjh,
							fcTitle: item.fcId_dictText,
							mj: item.mj,
							dz: item.fxShi_dictText+item.fxTing_dictText+item.fxWei_dictText,
							tag: "在租",
							price: item.yzj,
						}
					})
					console.log(this.list)
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #F6F6F6;
	}
</style>
<style lang="scss" scoped>
	.zwsj {
		// .img {
		// 	margin-top: 100rpx;
		// 	width: 670rpx;
		// 	height: 400rpx;
		// }
		.title {
			text-align: center;
			font-size: 32rpx;
			font-weight: 400;
			margin-top: 100rpx;
			font-weight: bold;
		}
	}
	
	.content {
		padding: 40rpx;

		h1 {
			padding-bottom: 40rpx;
			font-size: 40rpx;
			font-weight: 600;
		}

		.item {
			display: flex;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 15rpx;
			box-shadow: 4rpx 8rpx 10rpx rgba(0, 0, 0, .05);
			margin-bottom: 40rpx;

			.img {
				border-radius: 10rpx;
				overflow: hidden;
				width: 300rpx;
				height: 180rpx;
			}

			.text {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 20rpx;

				.title {
					color: #2C2F37;
					font-size: 30rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.info {
					color: #878D99;
					font-size: 26rpx;
				}

				.tag {
					span {
						background-color: #E5F4F1;
						border-radius: 8rpx;
						color: #01A477;
						padding: 0 10rpx;
						font-size: 26rpx;
					}
				}

				.price {
					color: #01A477;
					font-size: 28rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>
