import stringify from "@/utils/querystring";
import {
	URL
} from "@/utils/api.js"
//网络请求封装
const baseURL = URL;

//获取token
function getToken() {
	var token = uni.getStorageSync('token');
	if (token == undefined) {
		token = "";
	}
	return token;
}
// 请求完成时处理结果
function result(res, resolve, reject, isToast) {
	if (res && res != "") {
		let statusCode = res.statusCode;
		if (statusCode == 500) {
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync('token');
			return uni.showModal({
				title: '温馨提示',
				content: '您还没有登录呢！',
				showCancel:false,
				cancelText: '再看看',
				confirmText: '去登录',
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/index'
						});
					} else if (res.cancel) {
						console.log('再看看');
					}
				}
			});
		}
		if (statusCode == 500) {
			isToast && uni.showToast({
				title: "服务器出错",
				icon: "none"
			})
			reject("服务器错误")
		} else {
			let result; //请求结果
			let status = res.data.code; //请求结果中的status

			if (typeof(res.data) == 'string') {
				//返回的结果为string,转换为对象
				result = JSON.parse(res.data);
			} else {
				result = res.data;
			}
			if (result.status != undefined) {
				status = result.status;
			}
			if (status != 401) {
				//接口返回的code == 1 则为成功
				resolve(result)
				uni.hideLoading();
			} else {
				isToast && uni.showToast({
					title: result.msg,
					icon: "none"
				})
				if (status == 401) {
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('token');
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/login/index'
						});
					}, 500);
				}
				reject(result)
			}
		}
	}
}



//发送请求
function baseRequest(url, params, method, options, isToast = false) {
	return new Promise((resolve, reject) => {
		//判断参数不存在或为空则设置为空对象
		if (params == undefined || params == "") {
			params = {};
		}
		let header;
		//请求头
		if (!options.header) {
			if (method == "POST") {
				header = {
					'content-type': 'application/json',
				}
			} else {
				header = {
					'content-type': 'application/x-www-form-urlencoded',
				}
			}
		} else {
			header = options.header
		}
		

		let Authorization = getToken()

		if (Authorization && Authorization != "") {
			header["X-Access-Token"] = Authorization;
		}
		let date = new Date();
		if(url == "/sys/dict/getDictItems/tb_bj,bjmc,id"){
			header['X-Sign'] = 'EEA5EC52D3ABEED2A995176BF7F708DD'
			header['X-TIMESTAMP'] = (date.getFullYear()) + '' + (date.getMonth() + 1) + '' + (date.getDay()<10?'0'+date.getDay():date.getDay()) + '' + (date.getHours()<10?'0'+date.getHours():date.getHours()) + '' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + '' + (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
		}
		if(method == "PUT"){
			header['content-type'] = "application/json"
		}
		isToast && uni.showLoading({
			title: '加载中'
		});
		uni.request({
			url: baseURL + url,
			data: params,
			method: method,
			header: header,
			dataType: 'json',
			timeout: 3000,
			success: (res) => {
				result(res, resolve, reject, isToast)
			},
			fail: (err) => {
				let errMsg = "";
				if (err != undefined && err.errMsg != undefined) {
					errMsg = err.errMsg;
				}
				isToast && uni.showToast({
					title: "服务器出错",
					icon: "none"
				})
				reject(errMsg);
			}
		});
	}).catch((e) => {
		console.log(e);
	})

}

const request = {
	get(options) {
		return baseRequest(options.url, options.params, 'GET', options, options.isToast)
	},
	post(options) {
		if (options.params) {
			options.url += '?' + stringify(options.params)
		}
		return baseRequest(options.url, options.data, 'POST', options, options.isToast)
	},
	put(options) {
		return baseRequest(options.url, options.params, 'PUT', options, options.isToast)
	},
	delete(options) {
		return baseRequest(options.url, options.params, 'DELETE', options, options.isToast)
	}

}


export default request
