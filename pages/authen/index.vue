<template>
	<view>
		<u-navbar :border-bottom="false" title="身份认证" title-color="#fff" back-icon-color="#fff" :title-bold="true"
			:background="background"></u-navbar>
		<view class="from">
			<view class="h_title">
				<image src="@/static/img/42.png" mode="heightFix"
					style="width:auto;height: 20rpx;margin: auto 20rpx auto 0;"></image>
				<view class="left">身份信息填写</view>
			</view>
			<u-form :model="form" ref="uForm" label-width="auto">
				<u-form-item>
					<u-input v-model="form.name" placeholder-style="color:#878D99"
						:placeholder="userInfo.sfrz!=0&&userInfo.sfrz!=null?'持卡人姓名:    '+userInfo.yhkname:'持卡人姓名'" />
				</u-form-item>
				<u-form-item>
					<u-input v-model="form.sfzh" placeholder-style="color:#878D99"
						:placeholder="userInfo.sfrz!=0&&userInfo.sfrz!=null?'身份证号:   '+userInfo.sfzh:'身份证号'" />
				</u-form-item>
				<u-form-item>
					<u-input v-model="form.yhzl" disabled @click="show=true" placeholder-style="color:#878D99"
						:placeholder="userInfo.sfrz!=0&&userInfo.sfrz!=null?'银行种类:   '+userInfo.yhzl:'银行种类'" />
				</u-form-item>
				<u-form-item>
					<u-input v-model="form.yhkh" placeholder-style="color:#878D99"
						:placeholder="userInfo.sfrz!=0&&userInfo.sfrz!=null?'银行卡号:   '+userInfo.yhkh:'银行卡号'" />
				</u-form-item>
				<!-- <u-form-item>
					<u-input v-model="form.phone" placeholder-style="color:#878D99" placeholder="手机号" />
				</u-form-item>
				<u-form-item>
					<view class="u-flex">
						<u-input v-model="form.code" placeholder-style="color:#878D99" placeholder="验证码" />
						<span class="code" @click="getCode">{{countdown_text}}</span>
					</view>
				</u-form-item> -->
			</u-form>
		</view>
		<view class="upload">
			<view class="h_title">
				<image src="@/static/img/42.png" mode="heightFix"
					style="width:auto;height: 20rpx;margin: auto 20rpx auto 0;"></image>
				<view class="left">资料上传</view>
			</view>
			<view class="upload_box">
				<image v-if="userInfo.sfrz!=0&&userInfo.sfrz!=null" :src="url + userInfo.sfzpic1" class="image"
					@click="serpic('sfzpic1')">
				</image>
				<view v-else class="item box1" @click="serpic('sfzpic1')">

					<image v-show="form.sfzpic1" :src="url + form.sfzpic1" class="pic_img"></image>
					<view class="left">
						<span>身份证正面</span>
						<p>头像面</p>
					</view>
					<view class="right">
						<image src="@/static/img/123.png" class="img"></image>
					</view>
				</view>
				<image v-if="userInfo.sfrz!=0&&userInfo.sfrz!=null" :src="url + userInfo.sfzpic2" class="image"
					@click="serpic('sfzpic1')">
				</image>
				<view v-else class="item box2" @click="serpic('sfzpic2')">

					<image v-show="form.sfzpic2" :src="url + form.sfzpic2" class="pic_img"></image>
					<view class="left">
						<span>身份证反面</span>
						<p>国徽面</p>
					</view>
					<view class="right">
						<image src="@/static/img/124.png" class="img"></image>
					</view>
				</view>
				<image v-if="userInfo.sfrz!=0&&userInfo.sfrz!=null" :src="url + userInfo.sfzpic3" class="image"
					@click="serpic('sfzpic1')">
				</image>
				<view v-else class="item box3" @click="serpic('sfzpic3')">
					<image v-show="form.sfzpic3" :src="url + form.sfzpic3" class="pic_img"></image>
					<view class="left">
						<span>手持头像面</span>
						<p>本人手持照</p>
					</view>
					<view class="right">
						<image src="@/static/img/125.png" class="img"></image>
					</view>
				</view>
			</view>
			<view class="btn_submit" v-if="userInfo.sfrz!='1'" @click="submit">
				提交申请
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import {
		rzedit,
		upload,
		dictItem,
		pic_url,
		uNameList
	} from "@/api/index.js"
	export default {
		data() {
			return {
				background: {
					// 渐变色
					backgroundImage: 'linear-gradient(180deg, #37B08F, #18A981,#00A477)'
				},
				url: pic_url,
				form: {
					sfzh: '',
					sfzpic1: '',
					sfzpic2: '',
					sfzpic3: '',
					yhzl: '',
					yhkh: ''
				},
				countdown_text: "", //验证码
				list: [],
				show: false,
				userInfo: {},
				username: '',
			};
		},
		onLoad() {
			// this.userInfo = uni.getStorageSync('userInfo');
			this.username = uni.getStorageSync('userInfo').username
			console.log(this.userInfo, 123);
			this.openTime()
			this.get_yh_list();
			this.nameList()
		},
		methods: {
			// 获取个人信息
			nameList() {
				uNameList({
					username: this.username
				}).then(res => {
					console.log(res);
					this.userInfo = res.result.records[0];
					this.userInfo=res.result.records[0];
					this.form.yhkname=this.userInfo.yhkname;
					this.form.sfzh=this.userInfo.sfzh;
					this.form.sfzpic1=this.userInfo.sfzpic1;
					this.form.sfzpic2=this.userInfo.sfzpic2;
					this.form.sfzpic3=this.userInfo.sfzpic3;
					this.form.yhzl=this.userInfo.yhzl;
					this.form.yhkh=this.userInfo.yhkh;
				})
			},
			get_yh_list() {
				dictItem({
					dictId: '1469953856992456706',
					field: 'id,,itemText,itemValue,action'
				}).then(res => {
					// console.log(res,"银行列表");
					this.list = res.result.records.map(item => {
						return {
							label: item.itemText,
							value: item.itemText
						}
					})
				})
			},
			confirm(e) {
				//选择银行
				this.form.yhzl = e[0].value
			},
			submit() { //提交认证
				console.log(this.form)
				if (this.form.sfzh == '' ||
					this.form.sfzpic1 == '' ||
					this.form.sfzpic2 == '' ||
					this.form.sfzpic3 == '' ||
					this.form.yhzl == '' ||
					this.form.yhkh == '') {
					return uni.showToast({
						title: "填写的信息不能为空！",
						icon: "error"
					})
				}
				rzedit(this.form).then(res => {
					// console.log(res,"提交认证");
					if (res.success) {
						uni.showToast({
							title: res.message
						})
						uni.navigateTo({
							url: "../success/success?sfrz=sfrz"
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: "error"
						})
					}
				})
			},
			serpic(name) {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// console.log(tempFilePaths,upload);
						uni.showLoading()
						uni.uploadFile({
							url: upload,
							filePath: tempFilePaths[0],
							name: "file",
							formData: {
								biz: 'temp'
							},
							header: {
								'X-Access-Token': uni.getStorageSync("token")
							},
							success: (res) => {
								res = JSON.parse(res.data)
								if (res.success) {
									// console.log(pic_url + res.message);
									this.form[name] = res.message
									uni.showToast({
										title: "上传成功"
									})
								} else {
									uni.showToast({
										title: "上传失败",
										icon: "error"
									})
								}
							},
							fail: (err) => {
								// console.log(err);
							},
							complete() {
								uni.hideLoading()
							}
						});
					}
				});
			},
			openTime() {
				let timer = null;
				const time = uni.getStorageSync('authen_time') || 0;
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
				if (this.form.phone == "") {
					return this.$refs.uToast.show({
						title: '手机号不能为空！',
						type: 'warning'
					})
				} else if (!reg.test(this.form.phone)) {
					return this.$refs.uToast.show({
						title: '手机号格式错误！',
						type: 'warning'
					})
				}
				const time = uni.getStorageSync('authen_time') || 0;
				let this_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
				// console.log(this_time, time);
				if (this_time > time) {
					uni.setStorageSync('authen_time', this_time + 60)
					this.openTime()
					this.$refs.uToast.show({
						title: '获取验证码成功！',
						type: 'success'
					})
				} else {
					// console.log("请稍后再来");
				}
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
	.image {
		width: 320rpx;
		height: 180rpx;
		margin: 10rpx;
	}

	.h_title {
		padding: 0;
	}

	/deep/.u-border-bottom::after {
		border-color: #CED1D7 !important;
	}

	.from {
		padding: 30rpx;
		background-color: #fff;

		.code {
			color: #08A478;
			margin-left: auto;
		}
	}

	.upload {
		padding: 30rpx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
		margin-top: 20rpx;

		.upload_box {
			display: flex;
			flex-wrap: wrap;
			align-items: center;

			.item {
				width: 46%;
				padding: 40rpx 20rpx;
				border-radius: 20rpx;
				box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, .12);
				display: flex;
				margin: 35rpx 2% 0;
				position: relative;

				.pic_img {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-color: #fff;
				}

				&.box1 {
					background-color: #E5F4F1;
				}

				&.box2 {
					background-color: #F9ECE4;
				}

				&.box3 {
					background-color: #D4F5F3;
				}

				.left {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					text-align: left;

					>span {
						color: #2C2F37;
						font-size: 32rpx;
						font-weight: 600;
					}

					>p {
						font-size: 26rpx;
						color: #878D99;
					}
				}

				.right {
					margin-left: auto;

					.img {
						width: 100rpx;
						height: 100rpx;
					}
				}
			}
		}

		.btn_submit {
			padding: 20rpx;
			margin-top: 80rpx;
			background: linear-gradient(#38AE8E, #01A477);
			border-radius: 50rpx;
			color: #fff;
			text-align: center;
		}
	}
</style>
