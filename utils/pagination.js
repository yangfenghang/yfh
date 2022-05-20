export default {
	//分页配置
	data(){
		return {
			pagination:{
				pageNo:1,//第几页
				pageSize:10,//每页10条数据
			},
			total:0,//数据总条数
			loading_status:'loadmore'//加载状态
		}
	},
	onReachBottom() {
		//滚动到底部事件
		this.pagination.pageNo++;//下一页
		this.loading_status = 'loading';//加载中...
		this.getList(true);//加载更多
	},
}