/* 监听手机运行的操作系统以及版本, 区分 iOS, Android 并且获取版本 */
(function (window) {
    var ua = window.navigator.userAgent, name = "Other", version = [0];
    if (/Android|HTC/i.test(ua) || !!(window.navigator['platform'] + '').match(/Linux/i)) {
        name = 'Android';
        version = ua.slice(ua.indexOf("Android") + 8).split(";")[0].split(".");
    } else if (/iPad/i.test(ua) || /iPod|iPhone/i.test(ua)) {
        name = 'iOS';
        version = ua.toLowerCase().match(/cpu(.*?)os (.*?) like mac os/);
        version = version[version.length - 1].split("_");
    }
    window.PhoneSystem = {name: name, version: version};
})(window);

/* 获取 URL 传递的参数 */
(function (window) {
    var url = window.location.search.substring(1);
    var atr = url.split('&'), arr = null;
    window.UrlParm = {};
    for (var i = 0; i < atr.length; i++) {
        arr = atr[i].split("=");
        window.UrlParm[arr[0]] = decodeURIComponent(arr[1]);
    }
})(window);

/* 设置手机端布局宽度, 一般根据 UI 设计图来设置, 取值在 360 左右最佳 */
(function (window, document, width) {
    var content = "user-scalable=no,width=" + width;
    if (
        window.PhoneSystem.name == "Android"
        && window.parseInt(window.PhoneSystem.version[0]) <= 4
        && window.parseInt(window.PhoneSystem.version[1]) < 5
    ) {
        content += ",target-densitydpi=device-dpi";
    }
    content += ",initial-scale=" + window.screen.width / width;
    content += ",minimum-scale=" + window.screen.width / width;
    content += ",maximum-scale=" + window.screen.width / width;
    var meta = document.createElement("meta");
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", content);
    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(meta, document.getElementsByTagName("meta")[0]);
})(window, document, 360);

/* 按任意条件删除数组中的元素, 包括对象数组 */
Array.prototype.remove = function (fn) {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if (fn(this[i], i)) continue;
        arr.push(this[i]);
    }
    return arr;
}