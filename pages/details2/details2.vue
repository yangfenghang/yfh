<template>
	<view id="details">
		<web-view :src="'https://anx.aneproject.com/anx-boot/sys/annountCement/show/'+anntId+'?token='+token"></web-view>
	</view>
</template>

<script>
	import {annountShow,editByAnntIdAndUserId} from "../../api/index.js"
	export default {
		data() {
			return {
				anntId: 0,
				index: 0,
				list: {},
				token: '',
			}
		},
		onLoad(ondex) {
			console.log(ondex);
			this.anntId=ondex.id;
			this.token=uni.getStorageSync('token');
			if(ondex.flag==0) {
				this.anndonList();
			}
			// this.anndonList();
		},
		methods: {
			anndonList() {
				console.log(111);
				annountShow(this.anntId).then(res => {
					console.log(res);
				})
			},
			anndonList() {
				console.log(111);
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
