/**
 * 自定义模板引擎
 * 
 * author   : jyjin
 * date     : create at 2018.07.27
 * remark   : 
 */
var handlebars = require('handlebars')
var fs = require('fs')
exports.handlebarsEngine = (filePath, options, callback) => {
    fs.readFile(filePath, function (err, content) {
        if (err) {
            return callback(new Error(err));
        }

        // 这是一个非常简单实现。。。    
        // var rendered = content.toString().replace('123', `[${options.sessionkey}]`)

        // 这是一个主流模板引擎套用实现。。。
        var template = handlebars.compile(content.toString())

        var rendered = template(options)
        return callback(null, rendered);
    })
}