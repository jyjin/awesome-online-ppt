const user = require('./user')
const log = require('../../middleware/log')
const jwtAuth = require('../../middleware/jwtAuth')
const accountAnalysis = require('../../middleware/accountAnalysis')
const userRequire = require('../../middleware/userRequire')

module.exports = (app) => {
    // 用户登录
    app.post('/user/signIn', log, accountAnalysis, user.signIn)
    // token认证
    app.get('/user/authByToken/:token', log, jwtAuth, user.authByToken);
    // 查询用户 根据用户名
    app.get('/user/getUser/:username', log, jwtAuth, user.queryUserByUsername);
    // 添加用户
    app.post('/user/signUp', log, userRequire, user.addUser)
    // 查询用户列表
    app.use('/user/queryUserList', log, jwtAuth, user.queryUserList)
    // 上线
    app.use('/user/online', log, jwtAuth, user.online)
    // 下线
    app.use('/user/offline', log, jwtAuth, user.offline)
}