const { isLength, isEmail, isMobilePhone } = require('validator')
const { AUTH_PARAM_MISSGING, AUTH_ACCOUNT_LENGTH_ILLEGAL } = require('../lib/constant')

module.exports = (req, res, next) => {
    var opt = {
        account: req.body.account,
        password: req.body.password
    }

    // 用户名、密码不能为空
    if (!opt.account || !opt.password) {
        return res.send(AUTH_PARAM_MISSGING)
    }

    // 用户名必须3-20为字符
    if (!isLength(opt.account, { min: 1, max: 20 })) {
        return res.send(AUTH_ACCOUNT_LENGTH_ILLEGAL)
    }

    // 登录账号类型解析
    // type:
    // 1 邮箱登录
    // 2 手机号登录
    // 3 用户名登录
    req.user = {
        type: 3
    }
    if (isEmail(opt.account)) {
        // 邮箱登录
        req.user.type = 1
    } else if (isMobilePhone(opt.account)) {
        // 手机号登录
        req.user.type = 2

    } else {
        // 用户名登录
        req.user.type = 3
    }
    next()
}
