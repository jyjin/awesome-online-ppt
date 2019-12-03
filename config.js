
const ip = '192.168.31.150'
module.exports = {
    // 全局使用mock数据
    mock: 0,
    // 服务端地址
    siteUrl: `http://${ip}:5001`,
    // 图标库地址
    iconUrl: '//at.alicdn.com/t/font_1401343_bzsdoc95ij.js',
    // 样式排除
    cssExclude: [
        'antd.css',
        'style/style.css',
    ],
    // http 超时设置（秒/s）
    timeout: 30,
    // 不需要cssModule的样式文件
}
