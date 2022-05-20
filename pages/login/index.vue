<template>
	<view>
		<view class="head_bg">
			<u-icon name="arrow-left" class="toback" @click="$to(1)"></u-icon>
			<image src="@/static/img/126.png" mode="widthFix" style="width: 100%;"></image>
			<view class="head_logo">
				<image src="@/static/img/113.png" mode="widthFix" class="head_logo_img"></image>
				<p>物联世界 · 智慧生活</p>
			</view>
		</view>
		<view class="login_box">
			<view class="login_phone"><span :class="{active:active_index==0}" @click="active_index=0">账号登陆</span> <span
					:class="{active:active_index==1}" @click="active_index=1">验证码登陆</span></view>
			<view class="login_item" v-if="active_index == 0">
				<label for="username">账号</label>
				<input type="text" id="username" v-model="from.username" placeholder="请输入账号" />
			</view>
			<view class="login_item" v-if="active_index == 1">
				<label for="phone">手机号</label>
				<input type="text" id="phone" v-model="from.phone" placeholder="请输入手机号" />
			</view>
			<view class="login_item" v-if="active_index == 0">
				<label for="phone">密码</label>
				<input type="text" id="phone" v-model="from.password" placeholder="请输入密码" />
			</view>
			<view class="login_item" v-if="active_index == 0">
				<label for="code">验证码</label>
				<input type="text" id="code" v-model="from.code" placeholder="请输入验证码" />
				<image @click="getCodeImg" :src="codeImg" class="code" mode="heightFix"></image>
			</view>
			<view class="login_item" v-else>
				<label for="code">验证码</label>
				<input type="text" id="code" v-model="from.code" placeholder="请输入验证码" />
				<span @click="getCode">{{countdown_text}}</span>
			</view>
			<view class="btns">
				<view class="btn_phone_login" @click="submit_login">
					登录
				</view>
				<!-- <view class="btn_wx_login" @click="wxlogin"> -->
				<button class="btn_wx_login" @click="wxlogin">
					<image src="@/static/img/115.png" mode="widthFix" class="wx"></image>
					<span>微信登录</span>
				</button>
			</view>
		</view>
		<view class="clause">
			我已阅读并同意<span>《用户协议》</span>及<span>《隐私政策》</span>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getVerification,
		login,
		wxlogin,
		getPhoneNumber,
		wxLogins
	} from "@/api/index.js"
	export default {
		data() {
			return {
				active_index: 0,
				from: {
					username: '',
					password: '',
					code: ''
				},
				countdown_text: "",
				checkKey: '',
				codeImg: '',
				code: '',
			};
		},
		onLoad() {
			this.openTime()
			this.getCodeImg()
			this.getsCode()
		},
		methods: {
			getsCode() {
				//获取临时登陆code
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						console.log(loginRes, '授权信息');
						this.code = loginRes.code;
					}
				});
			},
			wxlogin() {
				//微信登录
				wx.getUserProfile({
					desc: '用于获取用户资料的完整性', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: red => {
						console.log(red, '授权成功');
						wxlogin(this.code).then(res => { //code验证码 五分钟有效
							console.log(res, '登录结果');
							this.getsCode();
							if (!res.result.token) {
								/* this.$refs.uToast.show({
									title: "登陆成功",
									type: 'success'
								}); */
								uni.setStorageSync('openid', res.result.openid);
								uni.setStorageSync('sessionKey', res.result.sessionKey);
								uni.setStorageSync('userInfo', JSON.parse(red.rawData));
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/login/phone_login'
									})
								}, 100);
							} else {
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
							}
						}).catch(err => {
							this.getsCode();
							console.log(err);
						});
					},
					fail: err => {
						this.getsCode();
						console.log('用户放弃了授权登录');
					}
				});
			},
			submit_login() {
				if (this.active_index == 0) {
					//账户登录
					login({
						captcha: this.from.code,
						checkKey: this.checkKey,
						password: this.from.password,
						username: this.from.username
					}).then(res => {
						console.log(res, "登录");
						if (res.success) {
							uni.setStorageSync('token', res.result.token);
							let userInfo = res.result.userInfo;
							uni.setStorageSync('userInfo', userInfo);
							this.$refs.uToast.show({
								title: res.message,
								type: 'success'
							});
							setTimeout(() => { //500毫秒后跳转到首页
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}, 500)
							// byCode(userInfo.post).then(res2 => {
							// 	console.log(res2, "获取职务");
							// 	userInfo.post_text = res2.result.name; //获取的职务

							// })
						} else {
							this.$refs.uToast.show({
								title: res.message,
								type: 'warning'
							})
						}
					})
				} else {
					//短信验证码登录

				}
			},
			openTime() {
				let timer = null;
				const time = uni.getStorageSync('countdown_time') || 0;
				//获取是否需要倒计时
				if (time && time >= Math.floor(new Date().getTime() / 1000)) {
					timer = setInterval(() => {
						let this_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
						let time_num = time - this_time
						if (time_num <= 0) {
							clearInterval(timer)
							this.countdown_text = "重新获取"
						} else {
							this.countdown_text = time_num + "秒后重新获取"
						}
					}, 1000);
				} else {
					clearInterval(timer)
					this.countdown_text = "获取验证码"
				}
			},
			getCode() {
				//获取短信验证码
				var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
				if (this.from.phone == "") {
					return this.$refs.uToast.show({
						title: '手机号不能为空！',
						type: 'warning'
					})
				} else if (!reg.test(this.from.phone)) {
					return this.$refs.uToast.show({
						title: '手机号格式错误！',
						type: 'warning'
					})
				}
				const time = uni.getStorageSync('countdown_time') || 0;
				let this_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
				console.log(this_time, time);
				if (this_time > time) {
					uni.setStorageSync('countdown_time', this_time + 60)
					this.openTime()
					this.$refs.uToast.show({
						title: '获取验证码成功！',
						type: 'success'
					})
				} else {
					console.log("请稍后再来");
				}
			},
			getCodeImg() {
				//获取验证码图片
				let checkKey = this.checkKey = new Date().getTime(); //获取时间戳为密匙
				getVerification(checkKey).then(res => {
					console.log(res, "获取图片验证码");
					this.codeImg = res.result;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.clause {
		padding-bottom: 30rpx;
		text-align: center;
		left: 0;
		right: 0;
		color: #878D99;

		span {
			color: #08A478;
		}
	}

	.login_box {
		position: relative;
		top: -50rpx;
		border-radius: 50rpx 50rpx 0 0;
		background-color: #fff;
		padding: 40rpx 60rpx 0;
		margin-bottom: -70rpx;

		.btns {
			>view {
				border-radius: 50rpx;
				text-align: center;
				padding: 22rpx 0;
				margin-bottom: 50rpx;

				span {
					padding-left: 15rpx;
				}
			}

			.wx {
				width: 45rpx;
				height: auto;
				vertical-align: middle;
			}

			.btn_phone_login {
				//手机号登录按钮
				background-color: #00A578;
				box-shadow: 0 10rpx 10rpx #73E8C8;
				color: #fff;
			}

			.btn_wx_login {
				//微信登录按钮
				border: none;
				outline: none;
				border: 1rpx solid #18B11E;
				color: #18B11E;
				border-radius: 50rpx;
				text-align: center;
				padding: 22rpx 0;
				margin-bottom: 50rpx;
				line-height: 1;
				font-size: 28rpx;

				span {
					padding-left: 15rpx;
				}
			}
		}

		.login_phone {

			padding-bottom: 30rpx;

			span {
				margin-right: 20rpx;

				&.active {
					font-size: 36rpx;
					font-weight: 600;
				}
			}
		}

		.login_item {
			margin-bottom: 40rpx;
			display: flex;
			flex-direction: column;
			position: relative;

			label {
				color: #878D99;
				font-size: 25rpx;
			}

			input {
				font-size: 30rpx;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;
			}

			span {
				position: absolute;
				right: 5rpx;
				bottom: 20rpx;
				color: #08A478;
				z-index: 10;
			}

			.code {
				position: absolute;
				right: 0;
				bottom: 10rpx;
				width: auto;
				height: 60rpx;
				z-index: 99;
			}
		}
	}

	.head_bg {
		position: relative;

		.toback {
			position: absolute;
			left: 40rpx;
			top: calc(var(--status-bar-height) * 2);
			color: #fff;
			height: var(--status-bar-height);
			font-size: 28rpx;
			z-index: 99;
		}

		.head_logo {
			position: absolute;
			top: 50%;
			transform: translateY(-40%);
			display: flex;
			flex-direction: column;
			width: 100%;

			.head_logo_img {
				width: 150rpx;
				height: auto;
				margin: 0 auto;
			}

			p {
				margin-top: 40rpx;
				color: #fff;
				font-size: 34rpx;
				font-weight: 300;
				letter-spacing: 10rpx;
				text-align: center;
			}
		}
	}
</style>
