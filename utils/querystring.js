//将对象转换为ur参数
function stringify(obj, sep = "&", eq = "=") {
	if (obj === null) {
		obj = undefined;
	}
	if (typeof obj === "object") {
		return Object.keys(obj)
			.map((k) => {
				if (typeof obj[k] === "object") {
					return k = k + eq + JSON.stringify(obj[k])
				}
				return k = k + eq + obj[k];
			})
			.filter(Boolean)
			.join(sep);
	}
}

export default stringify