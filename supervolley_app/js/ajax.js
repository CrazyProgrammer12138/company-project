var Ajax = (function () {
    var isGzip = false;  // 是否解压缩
    var Utf8ArrayToStr = function(array) {
        var out = "", i = 0, len = array.length, char1, char2, char3, char4;
        while(i < len) {
            char1 = array[i++];
            if (char1 >> 4 <= 7) {
                out += String.fromCharCode(char1);
            } else if (char1 >> 4 == 12 || char1 >> 4 == 13) {
                char2 = array[i++];
                out += String.fromCharCode(((char1 & 0x1F) << 6) | (char2 & 0x3F));
            } else if (char1 >> 4 == 14) {
                char2 = array[i++];
                char3 = array[i++];
                char4 = ((char1 & 0x0F) << 12) | ((char2 & 0x3F) << 6);
                out += String.fromCharCode(char4 | ((char3 & 0x3F) << 0));
            }
        }
        return out;
    };
    return function (url, json, fn) {
        var ajax = new XMLHttpRequest(), param = "";
        for(key in json) {
            param += key + "=" + json[key] + "&";
        }
        param = param.substr(0, param.length - 1);
        ajax.open("post", url, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // ajax.setRequestHeader("api-version", "1.0");
        if(isGzip) {
            ajax.responseType = "arraybuffer";
        } else {
            ajax.responseType = "text";
        }
        ajax.onload = function (oEvent) {
            if (isGzip && ajax.response) {
                var byteArray = new Uint8Array(ajax.response);
                byteArray = pako.ungzip(byteArray);
                fn(Utf8ArrayToStr(byteArray));
            } else {
                fn(ajax.responseText);
            }
        };
        ajax.send(param);
    }
})();

