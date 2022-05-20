import request from "@/utils/request.js";
import { URL } from "@/utils/api.js"
export const upload = URL + '/sys/common/upload';
export const pic_url = URL + '/'
export function getMyNews(params){
	//获取消息
	return request.get({
		url: "/sys/sysAnnouncementSend/getMyAnnouncementSend",
		params
	})
}

// 信息发布
export function addAndReleaseData(data) {
	return request.post({
		url: "/sys/annountCement/addAndReleaseData",
		data
	})
}

// 一键报修
export function tbBxjl(data) {
	return request.post({
		url: "/yhsj/tbBxjl/add",
		data
	})
}

export function getFjZfrUserList(params){
	return request.get({
		url: "ywgl/tbFj/list",
		params
	})
}

// 接收消息详情
export function annountShow(params){
	return request.get({
		url: "/sys/annountCement/show/"+params,
		
	})
}

export function annountCement_list(params){
	//获取消息管理的消息
	return request.get({
		url: "/sys/annountCement/list",
		params
	})
}

export function login(data) {
	//登录
	return request.post({
		url: "/sys/login",
		data
	})
}

export function getVerification(data) {
	//获取验证码图片
	return request.get({
		url: "/sys/randomImage/" + data
	})
}

export function byCode(code){
	//根据code获取职务
	return request.get({
		url: "/sys/position/queryByCode",
		params:{
			code
		}
	})
}

export function wxlogin(code){
	//根据code获取openid
	return request.post({
		url: '/sys/thirdLogin/getOpenId?code=' + code,
		data:{}
	})
}

export function wxLogins(data){
	//微信登陆
	return request.post({
		url: '/sys/thirdLogin/updateUserInfo',
		data
	})
}

// export function userList(data){
// 	return request.post({
// 		url: '/sys/user/list'
// 	})
// }

export function getPhoneNumber(data){
	//手机号码
	return request.post({
		url: '/sys/thirdLogin/getPhoneNumber',
		data
	})
}

// 抄表记录
export function gitCbjlList(params){
	return request.get({
		url: "/sjtx/tbSbJl/listByZfr",
		params
	})
}

export function tbZdlist(params){
	//账单管理列表
	params.zfr = uni.getStorageSync("userInfo").username;
	return request.get({
		url: '/yhsj/tbZd/list',
		params
	})
}

export function tbZdList(params){
	return request.get({
		url: "/yhsj/tbZd/list",
		params
	})
}

export function TbZdMxByMain(params){
	// 账单详情
	return request.get({
		url: "/yhsj/tbZd/queryTbZdMxByMainId",
		params
	})
}

export function TbZdMxByMx(params){
	// 账单明细
	return request.get({
		url: "/yhsj/tbZd/queryTbZdMxByMainId2"+params,
		// params
	})
}

export function userList(params = {}){
	//用户列表
	params.username = uni.getStorageSync('userInfo').username
	return request.get({
		url: '/sys/user/list',
		params
	})
}

export function uNameList (params){
	return request.get({
		url:"/sys/user/list",
		params
	})
}

export function getMyAnnouncementSend(params){
	//获取消息管理的消息
	return request.get({
		url: "/sys/sysAnnouncementSend/getMyAnnouncementSend",
		params
	})
}

export function open_charge(data){
	//开始支付
	return request.post({
		url: "/wx/wxPayController/wxPayByDdAndOpenid",
		data
	})
}

export function jiaofeiPost(data){
	return request.post({
		url: "/sys/user/jiaofei",
		data
	})
}

// export function tbZdList(params) {
// 	return request.get({
// 		url: "/yhsj/tbZd/list",
// 		params
// 	})
// }
export function yhzj_list(params){
	//用户资金记录
	params.username = uni.getStorageSync("userInfo").username;
	return request.get({
		url: "/yhsj/tbUserZjjl/list",
		params
	})
}

export function rzedit(params){
	//用户认证接口
	params.id = uni.getStorageSync("userInfo").id
	return request.put({
		url: "/sys/user/rzedit",
		params
	})
}

// 账单统计
export function getTjjeVoByZfr(params){
	return request.get({
		url: "/yhsj/tbZd/getTjjeVoByZfr",
		params
	})
}

// 统计对比图的值
export function getYsWsTjVoByFd(params) {
	return request.get({
		url: "/yhsj/tbZd/getYsWsTjVoByFd",
		params
	})
}

// 消息详情
export function editByAnntIdAndUserId(data){
	return request.put({
		url: "/sys/sysAnnouncementSend/editByAnntIdAndUserId",
		params:data
	})
}

// 我的租约
export function tbFkList(params){
	return request.get({
		url: "/ywgl/tbFj/list2",
		params
	})
}

export function dictItem(params){
	//根据字典code获取字典列表
	params.pageSize = 50;
	params._t = String(Date.now());
	return request.get({
		url: "/sys/dictItem/list",
		params
	})
}

export function tbUserTxsq(data){
	//用户申请提现
	return request.post({
		url: "/yhsj/tbUserTxsq/add",
		data
	})
}

export function tbUserlist(params = {}){
	//用户提现列表
	params.createBy = uni.getStorageSync("userInfo").username
	return request.get({
		url: "/yhsj/tbUserTxsq/list",
		params
	})
}