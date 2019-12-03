const async = require('async')


exports.test = (req, res) => {
    return res.send({
        res: 1,
        data: {
            user: 'jyjin'
        }
    })
}
