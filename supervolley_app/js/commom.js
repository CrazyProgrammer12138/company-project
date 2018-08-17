/* 正式接口地址前缀 */
var httpPush = "http://apis.supervolleyball.com/user/";
var httpOfficial = "http://apis.supervolleyball.com/official/";
var httpCompetion = "http://apis.supervolleyball.com/competition/";

/* 测试接口地址前缀 */
// var httpPush = "http://60.205.178.193:8090/user/";
// var httpOfficial = "http://60.205.178.193:8090/official/";
// var httpCompetion = "http://60.205.178.193:8090/competition/";

/* 监听手机返回键和触发返回事件, 兼容性待考虑, 慎重使用 */
window.ComeBack = function (fn, url) {
    window.history.pushState({}, "", url);
    window.addEventListener("popstate", function (ev) {
        fn(ev);
        window.history.pushState({}, "", url);
    }, false);
};

/* HTML5 调用原生方法 */
window.H5ToNative = function (parmArray) {
    if(PhoneSystem.name == 'iOS') {
        window.webkit.messageHandlers.goHtml5.postMessage(parmArray);
    } else {
        Android.goHtml5(parmArray);
    }
}

/* Vue 公共过滤器官方通道 */
Vue.filter('ImgUrlOfficial', function (url) {
    if (url == null || url.trim() == '' || url == undefined) return "";
    if (url.substr(0, 3) == '../') return "http://apis.supervolleyball.com/official_img" + url.substring(2);
    return url;
});

/* Vue 公共过滤器华羽时代 */
Vue.filter('ImgUrl', function (url) {
    if (url == null || url.trim() == '' || url == undefined) return "";
    if (url.substr(0, 3) == '../') return "http://res.supervolleyball.com/" + url.substring(2);
    if (url.substr(0, 4) != 'http') return "http://res.supervolleyball.com/" + url;
    return url;
});

/* 时间格式化 */
Vue.filter("dateFilter", function(dateTime) {
	dateTime = new Date(dateTime.replace(/-/g,"/"));
	var ToTwo = function(num) {
		if(num < 9) return '0' + num;
		return num;
	}
	var result = dateTime.getFullYear() + '-';
    result += ToTwo(dateTime.getMonth() + 1) + '-';
    result += ToTwo(dateTime.getDay()) + ' ';
    result += ToTwo(dateTime.getHours()) + ':'
    result += ToTwo(dateTime.getMinutes());
	return result;
});

/* 按任意条件删除数组中的元素, 包括对象数组 */
Array.prototype.remove = function (fn) {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if (fn(this[i], i)) continue;
        arr.push(this[i]);
    }
    return arr;
}