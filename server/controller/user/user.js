const User = require('../../proxy').User
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { expiresIn, appTokenSecret } = require('../../config')
const { DATA_GET_ERROR, DATA_SAVE_ERROR, DATA_UPDATE_ERROR, ONLINE_FAILED, AUTH_TOKEN_ERROR, LOGIN_ERROR, REQUIRE_SOME_PARAM } = require('../../lib/constant')
const async = require('async')

const getToken = (data) => {
    return jwt.sign(data, appTokenSecret, { expiresIn: expiresIn })
}

exports.authByToken = (req, res) => {
    return res.send({
        res: 1,
        data: {
            user: req.user
        }
    })
}

exports.signIn = (req, res) => {
    var opt = {
        account: req.body.account,
        password: req.body.password,
        status: req.body.status || 1,
    }

    var apiName = 'queryUser_byUsername'
    if (req.user.type == 1) {
        apiName = 'queryUser_byEmail'
    } else if (req.user.type == 2) {
        apiName = 'queryUser_byPhone'
    } else {
        apiName = 'queryUser_byUsername'
    }

    User[apiName](opt.account, (err, result) => {
        if (err) {
            console.log(`* Query data error: `, err)
            return res.send(DATA_GET_ERROR)
        }
        if (!result) {
            return res.send(LOGIN_ERROR)
        }
        // console.log('result: ', result)
        if (result.password === opt.password) {
            setUserStatus(result._id, opt.status, (err, resultSave) => {
                if (err) {
                    return res.send(ONLINE_FAILED)
                }
                return res.send({
                    res: 1,
                    data: {
                        token: getToken({
                            userId: result._id,
                            username: result.username
                        }),
                        user: result
                    }
                })
            })
        } else {
            return res.send(LOGIN_ERROR)
        }
    }, 1)
}

exports.queryUserByUsername = (req, res) => {
    var opt = {
        username: req.params.username
    }

    User.queryUser_byUsername(opt.username, (err, result) => {
        if (err || !result) {
            console.log(`* Query data error: `, err)
            return res.send(DATA_GET_ERROR)
        }

        return res.send({
            res: 1,
            data: result
        })
    })
}

exports.addUser = (req, res) => {
    let opt = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        account: req.body.account
    }
    User.addUser(opt, (err, result) => {
        if (err || !result) {
            console.log(`* ERROR IN [ addUser ]: `, err)
            return res.send({
                res: -1,
                message: 'Save data error'
            })
        }
        return res.send({
            res: 1,
            data: {
                token: getToken({
                    userId: result._id,
                    username: result.username
                }),
                user: result
            }
        })
    })
}

exports.queryUserList = (req, res) => {
    User.queryUserList((err, result) => {
        if (err || !result) {
            console.log(`* ERROR IN [ queryUserInfo ]: `, err)
            return res.send({
                res: -1,
                message: 'Query data error'
            })
        }

        return res.send({
            res: 1,
            data: result
        })
    })
}

let setUserStatus = (id, status, callback) => {
    User.queryUser_byId(id, (err, result) => {
        if (err) {
            return callback(err)
        }
        result.status = status
        result.save(callback)
    })
}

let setUserStatusCallback = (res, err, result) => {
    if (err) {
        return res.send(DATA_UPDATE_ERROR)
    }
    res.send({
        res: 1,
        data: result
    })
}

exports.online = (req, res) => {
    var id = req.body.id
    if (!id) {
        return res.send(REQUIRE_SOME_PARAM('id'))
    }
    setUserStatus(id, 1, (err, result) => setUserStatusCallback(res, err, result))
}

exports.offline = (req, res) => {
    var id = req.body.id
    if (!id) {
        return res.send(REQUIRE_SOME_PARAM('id'))
    }
    setUserStatus(id, 0, (err, result) => setUserStatusCallback(res, err, result))
}

exports.chatHangup = (id, callback) => {

    if (!id) {
        return callback(-1)
    }

    async.auto({
        emitUser: (cb) => {
            User.queryUser_byId(id, (err, result) => {
                if (err) {
                    return cb(err)
                }
                var { receiveUserId: tempId } = result
                result.receiveUserId = null
                result.save((errSave, resultSave) => {
                    console.log(resultSave)
                    if (errSave) {
                        return cb(errSave)
                    }
                    return cb(null, tempId)
                })
            })
        },
        receiveUser: ['emitUser', (result, cb) => {
            console.log('== ', result.emitUser)
            var receiveUserId = result.emitUser
            if (receiveUserId) {
                User.queryUser_byId(receiveUserId, (errRcUser, resultRcUser) => {
                    if (errRcUser) {
                        return cb(errRcUser)
                    }
                    resultRcUser.receiveUserId = null
                    resultRcUser.save((err, resultSave)=>{
                        if(err){
                            return cb(err)
                        }
                        console.log(resultSave)
                        return cb(null, resultSave)
                    })
                })
            } else {
                cb(null, null)
            }
        }]
    }, (err, result) => {
        if (err) {
            return callback(-1)
        }
        return callback(null, result)
    })

}