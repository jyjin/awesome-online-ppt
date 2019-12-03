/**
 * 国际化入口
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 国际化入口
 */

const cn = require('./cn')
const en = require('./en')

module.exports = (local) => {

    if ('cn' == local) return cn
    if ('en' == local) return en
    return cn

}