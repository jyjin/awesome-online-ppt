/**
 * server app.js
 * create by jyjin 
 * create at 2018.07.25
 */

const express = require('express')
const bodyParser = require('body-parser')
const serverRoutes = require('./routes')
const app = express();
const { handlebarsEngine } = require('./middleware/templateEngines')
const { isLinux } = require('./lib/util')

console.log('* start at ', __dirname)
const __viewsPath = isLinux ?
    __dirname.replace('/server', '/view') :
    __dirname.replace('\\server', '\\view')

//==============================自己任意定制其他模板==========================================
app.set('views', __viewsPath)                                           //指定视图目录
app.set('view engine', 'html')                                          //注册自定义模板类型
app.engine('html', handlebarsEngine)                                    //指定自定义视图引擎
//-------------------------------------------------------------------------------------------

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))

//静态资源访问
app.use(express.static('dist'))
app.use(express.static('public'))


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,token,x-access-lan')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if ('OPTIONS' === req.method) {
        res.sendStatus(200)
    }
    else {
        next()
    }
});

// interface api
serverRoutes(app)

console.log(' --dir ', __dirname)

app.use('/assets/', express.static(`${__dirname}/assets/`))

app.use((req, res) => {
    console.log('=> User visit website...')
    return res.render('../dist/index', {
        title: 'Pob',
        host: 'http://127.0.0.1:5001/'
    })
})


module.exports = app