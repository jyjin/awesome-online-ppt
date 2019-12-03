
const { isEmail, isMobilePhone, isLength } = require('validator')
const { REQUIRE_SOME_PARAM, ILLEGAL_LENGTH_BETWEEN, ILLEGAL_EMAIL, ILLEGAL_PHONE, ILLEGAL_PASSWORD, DATA_ADD_ERROR, SOME_EXIST } = require('../lib/constant')
const User = require('../proxy/user')
const { auto } = require('async')
module.exports = (req, res, next) => {
    let opt = {
        password: req.body.password,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
    }

    // 用户名必填
    if (!opt.username) {
        return res.send(REQUIRE_SOME_PARAM('username'))
    }

    // 密码必填
    if (!opt.password) {
        return res.send(REQUIRE_SOME_PARAM('password'))
    }

    // 邮箱必填
    if (!opt.email) {
        return res.send(REQUIRE_SOME_PARAM('email'))
    }

    // 手机号必填
    if (!opt.phone) {
        return res.send(REQUIRE_SOME_PARAM('phone'))
    }

    // 用户名3-20位
    if (!isLength(opt.username, { min: 1, max: 20 })) {
        return res.send(ILLEGAL_LENGTH_BETWEEN('username', 1, 20))
    }

    // 邮箱校验
    if (!isEmail(opt.email)) {
        return res.send(ILLEGAL_EMAIL)
    }

    // 手机号校验
    if (!isMobilePhone(opt.phone)) {
        return res.send(ILLEGAL_PHONE)
    }


    auto({
        usernameCounts: (cb) => {
            User.getUserCounts_byUsername(opt.username, cb)
        },
        emailCounts: (cb) => {
            User.getUserCounts_byEmail(opt.email, cb)
        },
        phoneCounts: (cb) => {
            User.getUserCounts_byPhone(opt.phone, cb)
        }
    }, (err, result) => {
        if (err) {
            console.log(`* Query data error: `, err)
            return res.send(DATA_ADD_ERROR)
        }

        // 用户名已存在
        if (result.usernameCounts > 0) {
            return res.send(SOME_EXIST('username'))
        }

        // 邮箱已存在
        if (result.emailCounts > 0) {
            return res.send(SOME_EXIST('email'))
        }

        // 手机号已存在
        if (result.phoneCounts > 0) {
            return res.send(SOME_EXIST('phone'))
        }
        next()
    })
}