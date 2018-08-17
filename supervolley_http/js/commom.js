/* 正式接口地址前缀 */
var httpVote = "http://39.106.3.149:8080/sv_vote/";
var httpPush = "http://apis.supervolleyball.com/user/";
var httpOfficial = "http://apis.supervolleyball.com/official/";
var httpCompetion = "http://apis.supervolleyball.com/competition/";
var httpShowBar = "http://apis.supervolleyball.com/showbar/";

/* 测试接口地址前缀 */
// var httpShowBar = "http://60.205.178.193:8090/showbar/";
// var httpPush = "http://60.205.178.193:8090/user/";
// var httpOfficial = "http://60.205.178.193:8090/official/";
// var httpCompetion = "http://60.205.178.193:8090/competition/";

/*静态页服务器地址*/
var servers = "http://h.supervolleyball.com/package/";

/* 安卓ios打开和下载路径 */
var androidLoad = "http://sj.qq.com/myapp/detail.htm?apkName=com.huayu.supervolleyballapp";
var androidOpen = "hysd://supervolleyball.app";
var iosLoad = "https://itunes.apple.com/us/app/%E8%B6%85%E7%BA%A7%E6%8E%92%E7%90%83/id1236745178?l=zh&ls=1&mt=8";
var iosOpen = "SVBHuayuTime://";

/* Vue 公共过滤器官方通道 */
Vue.filter('ImgUrlOfficial', function (url) {
    if (url == null || url.trim() == '' || url == undefined) return "";
    if (url.substr(0, 3) == '../') return "http://60.205.178.193:8090/official_img" + url.substring(2);
    return url;
});

/* Vue 公共过滤器华羽时代 */
Vue.filter('ImgUrl', function (url) {
    if (url == null || url.trim() == '' || url == undefined) return "";
    if (url.substr(0, 3) == '../') return "http://res.supervolleyball.com/" + url.substring(2);
    if (url.substr(0, 4) != 'http') return "http://res.supervolleyball.com/" + url;
    return url;
});

/* HTML5 调用原生方法 */
window.H5ToNative = function (parmArray) {
    if(PhoneSystem.name == 'iOS') {
        window.webkit.messageHandlers.goHtml5.postMessage(parmArray);
    } else {
        Android.goHtml5(parmArray);
    }
};

/* 按任意条件删除数组中的元素, 包括对象数组 */
Array.prototype.remove = function (fn) {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if (fn(this[i], i)) continue;
        arr.push(this[i]);
    }
    return arr;
};