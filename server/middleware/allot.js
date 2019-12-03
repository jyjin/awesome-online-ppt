var User = require('../proxy/user')
var { random } = require('lodash')
var { auto } = require('async')
var { DATA_GET_ERROR } = require('../lib/constant')

module.exports = (emitUserId, callback) => {
    auto({
        receiveUser: (cb) => {
            let query = { status: 1, _id: { $ne: emitUserId }, $or: [{ receiveUserId: { $exists: false } }, { receiveUserId: null }] }
            User.queryUserList_byQuery(query, (err, result) => {
                console.log(err)
                console.log(result)
                if (err) {
                    return cb(err)
                }
                // 没有空闲用户 直接退出
                if (!result.length) {
                    return cb(-1)
                }
                // 随机分配空闲用户
                var index = random(0, result.length - 1)
                var receiveUser = result[index]
                // 更新空闲用户的接受者
                receiveUser.receiveUserId = emitUserId
                receiveUser.save(cb)
            })
        },
        emitUser: ['receiveUser', (ret, cb) => {
            User.queryUser_byId(emitUserId, (err, emitUser) => {
                if (err) {
                    return cb(err)
                }
                var { receiveUser } = ret
                emitUser.receiveUserId = receiveUser._id
                emitUser.save(cb)
            })
        }]
    }, (err, result) => {
        if (err) {
            //没有空闲用户
            if (err == -1) {
                return callback(null, -1)
            }
            return callback(err)
        }
        var { receiveUser, emitUser } = result
        callback(null, receiveUser)
    })
}
