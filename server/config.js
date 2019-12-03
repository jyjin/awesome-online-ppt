/**
 * 系统配置文件
 * author   : jyjin
 * date     : create at 2018.07.28
 */

module.exports = {
    port: 5001,                                 // 后台服务端口
    expiresIn: 60 * 3600 * 2,                              // token过期时长（秒/s）
    appTokenSecret: 'jyjinsavetheworld',        // token验证密匙
}