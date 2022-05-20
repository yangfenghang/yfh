import { URL } from "@/utils/api.js"

// if (process.env.NODE_ENV == 'development') {
//     BASE_URL = 'https://anx.aneproject.com/anx-boot' // 开发环境
// } else {
// 	BASE_URL = 'https://anx.aneproject.com/anx-boot' // 生产环境
// }
let staticDomainURL = URL+ '/sys/common/static';

const configService = {
	apiUrl: URL,
	staticDomainURL: staticDomainURL
};

export default configService
