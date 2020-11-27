// leftpad 刪庫事件 : https://www.thenewslens.com/article/39189
function leftpad(str, len, ch) {
    str = String(str);
    var i = -1;
    if (!ch && ch !== 0) ch = ' ';
    len = len - str.length;
    while (++i < len) {
        str = ch + str;
    }
    return str;
}

module.exports = leftpad;
