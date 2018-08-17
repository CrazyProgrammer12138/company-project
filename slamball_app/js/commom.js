/* 正式接口地址前缀 */
var http = "http://47.94.254.180:8008/api/"

/* HTML5 调用原生方法 */
window.H5ToNative = function (parmArray) {
    if(PhoneSystem.name == 'iOS') {
        window.webkit.messageHandlers.goHtml5.postMessage(parmArray);
    } else {
        Android.goHtml5(parmArray);
    }
}

/* Vue 公共过滤器华羽时代 */
Vue.filter('ImgUrl', function (url) {
    if (url == null || url.trim() == '' || url == undefined) return "";
    if (url.substr(0, 3) == '../') return "http://res.supervolleyball.com/" + url.substring(2);
    if (url.substr(0, 4) != 'http') return "http://res.supervolleyball.com/" + url;
    return url;
});


