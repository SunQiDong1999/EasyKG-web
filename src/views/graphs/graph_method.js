/** ************************颜色处理***********************************/
// hex颜色转rgb颜色
function HexToRgb(str) {
    var r = /^\#?[0-9A-F]{6}$/
    // test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
    if (!r.test(str)) return window.alert('输入错误的hex')
    // replace替换查找的到的字符串
    str = str.replace('#', '')
    // match得到查询数组
    var hxs = str.match(/../g)
    // alert('bf:'+hxs)
    for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
    // alert(parseInt(80, 16))
    // console.log(hxs);
    return hxs
}
// GRB颜色转Hex颜色
function RgbToHex(a, b, c) {
    var r = /^\d{1,3}$/
    if (!r.test(a) || !r.test(b) || !r.test(c)) return window.alert('输入错误的rgb颜色值')
    var hexs = [a.toString(16), b.toString(16), c.toString(16)]
    for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = '0' + hexs[i]
    return '#' + hexs.join('')
}

// 得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
export function getDarkColor(color, level) {
    var r = /^\#?[0-9A-F]{6}$/
    if (!r.test(color)) return window.alert('输入错误的hex颜色值')
    var rgbc = this.HexToRgb(color)
    // floor 向下取整
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
}
// 得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
export function getLightColor(color, level) {
    var r = /^\#?[0-9A-F]{6}$/
    if (!r.test(color)) return window.alert('输入错误的hex颜色值')
    var rgbc = this.HexToRgb(color)
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
}

/**
 * 计算字符串的长度
 * @param {string} str 指定的字符串
 */
var calcStrLen = function calcStrLen(str) {
    var len = 0
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
            len++
        } else {
            len += 2
        }
    }
    return len
}

/**
 * 计算显示的字符串
 * @param {string} str 要裁剪的字符串
 * @param {number} maxWidth 最大宽度
 * @param {number} fontSize 字体大小
 */
export function fittingString(str, maxWidth, fontSize) {
    var fontWidth = fontSize * 1.3 // 字号+边距
    maxWidth = maxWidth * 2 // 需要根据自己项目调整
    var width = calcStrLen(str) * fontWidth
    var ellipsis = '…'
    if (width > maxWidth) {
        var actualLen = Math.floor((maxWidth - 10) / fontWidth)
        var result = str.substring(0, actualLen) + ellipsis
        return result
    }
    return str
}