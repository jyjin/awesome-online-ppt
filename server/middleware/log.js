module.exports = (req, res, next) => {
    var params = Object.assign({}, req.query, req.params, req.body)
    console.log(`\n* ${req.method.toLowerCase()} request == ${req.url}   `, params)
    next()
}