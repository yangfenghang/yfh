<template>
	<view class="content">
		<button class="btn_wx_login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
			<image src="@/static/img/115.png" mode="widthFix" class="wx"></image>
			<span>手机号授权</span>
		</button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getPhoneNumber,
		wxLogins
	} from "@/api/index.js"
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			getPhoneNumber(e){
				//手机号码授权
				console.log(e);
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') return;
				let session_key = uni.getStorageSync('sessionKey');
				let userInfo = uni.getStorageSync('userInfo');
				let openid = uni.getStorageSync('openid');
				console.log(userInfo);
				console.log(session_key);
				
				getPhoneNumber({
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv,
						session_key: session_key
					})
					.then(res2 => {
						console.log('手机号：', res2);
						let phone = res2.phoneNumber;
						uni.setStorageSync('phone', phone);
						let opt = {
							avatarUrl: userInfo.avatarUrl,
							citizenNo: userInfo.city,
							country: userInfo.country,
							phone: phone,
							nickName: userInfo.nickName,
							openid: openid,
							password: phone,
							province: userInfo.province,
							realname: userInfo.nickName,
							sex: userInfo.gender,
							status: 0,
							unionid:  '',
							username: phone,
							userType:"2"
						};
						console.log(opt);
						wxLogins(opt).then(res => {
							console.log(res);
							uni.setStorageSync('userInfo', res.result);
							uni.setStorageSync('token', res.result.token);
							this.$refs.uToast.show({
								title: "登陆成功",
								type: 'success'
							});
							setTimeout(() => { //500毫秒后跳转到首页
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}, 500)
						}).catch(err => {
							this.$refs.uToast.show({
								title: "登陆失败",
								type: 'error'
							});
						})
					});
			}
		}
	}
</script>

<style lang="scss">
.content{
	padding: 0 30rpx;
	display: flex;
	height: 100vh;
	.btn_wx_login {
		margin: auto;
		//微信登录按钮
		border: none;
		outline: none;
		border: 1rpx solid #18B11E;
		color: #18B11E;
		border-radius: 50rpx;
		text-align: center;
		padding: 22rpx 80rpx;
		line-height: 1;
		font-size: 28rpx;
		.wx {
			width: 45rpx;
			height: auto;
			vertical-align: middle;
		}
		span {
			padding-left: 15rpx;
		}
	}
}
</style>
