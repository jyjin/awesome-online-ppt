/**
 * 基础路由
 * 
 * author   : jyjin
 * date     : create at 2018.07.27
 * remark   : 
 */

global.__verbose = console.log
global.__debug = console.error

const { isLinux } = require('../../lib/util')
const __viewPath = isLinux ?
    __dirname.replace('/server/controller/test', '/view') :
    __dirname.replace('\\server\\controller\\test', '\\view')

module.exports = (app) => {

    app.use('/sendFile', (req, res) => {
        return res.sendFile('welcome.html', {
            root: __viewPath
        })
    })

    app.post('/json', (req, res) => {
        return res.send({
            res: 1,
            data: {
                msg: `${req.method} request success`,
                query: req.query,
                params: req.params,
                body: req.body
            }
        })
    })

    app.use('/render', (req, res) => {
        return res.render('server-test', {
            title: 'Default page',
            welcome: 'This is a request test render.'
        })
    })

    app.use('/test', (req, res) => {
        return res.send({
            res: 1,
            data: {
                msg: `${req.method} request success`,
                query: req.query,
                params: req.params,
                body: req.body
            }
        })
    })

    app.use('/redirect', (req, res) => {
        return res.redirect('/')
    })

    // app.use('/', (req, res) => {
    //     return res.render('server-test', {
    //         title: 'Default page',
    //         welcome: 'Please checkout your api, it looks like no specify api url after host url.'
    //     })
    // })
}