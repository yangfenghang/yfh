<template>
	<view>
		<u-navbar :border-bottom="false" title="个人信息" title-color="#2C2F37" :title-bold="true"
			:background="{background:'#fff'}"></u-navbar>
		<view class="content">
			<view class="head_img">
				<view class="img_div">
					<image :src="info.avatarUrl" class="img"></image>
					<u-icon class="icon" name="camera-fill"></u-icon>
				</view>
			</view>
			<view class="info_box">
				<u-cell-group>
					<u-cell-item title="账户昵称" :value="info.nickName||''" :arrow="false"></u-cell-item>
					<u-cell-item title="手机号码" :value="info.phone||''" :arrow="false"></u-cell-item>
					<u-cell-item title="我的生日" :value="info.birthday||''" :arrow="false"></u-cell-item>
					<u-cell-item title="真实姓名" :value="info.realname||''" :arrow="false"></u-cell-item>
					<u-cell-item title="邮箱" :value="info.email||''" :arrow="false"></u-cell-item>
					<u-cell-item title="认证状态" :value="info.sfrz=='1'?'已认证':'未认证'" :arrow="false"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="exit" @click="clearLocal">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					nickName:'',
					phone:'',
					avatarUrl:'',
					birthday:'',
					realname:'',
					email:''
				}
			};
		},
		methods:{
			clearLocal(){
				uni.clearStorageSync();
				setTimeout(() => { //500毫秒后跳转到首页
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}, 500)
			}
		},
		onShow() {
			this.info = uni.getStorageSync("userInfo")
			console.log(uni.getStorageSync("userInfo"));
		}
	}
</script>

<style lang="scss">
	.content {
		.head_img {
			display: flex;
			padding: 150rpx 0 100rpx;

			.img_div {
				position: relative;
				margin: auto;

				.icon {
					position: absolute;
					right: 0px;
					font-size: 40rpx;
					bottom: 20rpx;
					background-color: #fff;
					border-radius: 20rpx;
				}
			}



			.img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				margin: auto;
				box-shadow: 0 5rpx 0rpx 4rpx #fff, 0 25rpx 15rpx 2rpx #E4E7ED;
			}
		}

		.exit {
			padding: 18rpx 0;
			font-size: 30rpx;
			text-align: center;
			border-radius: 50rpx;
			border: 1rpx solid #CED1D7;
			margin: 100rpx 25rpx 0;
			color: #878D99;

			&:active {
				opacity: .7;
			}
		}
	}
</style>
