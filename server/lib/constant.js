/**
 * 静态变量
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 系统错误返回
 */

const i18n = require('../i18n')
const _RES = (res = -1, errorCode) => {
    return {
        res,
        errorCode,
        i18n: {
            cn: i18n('cn')[errorCode],
            en: i18n('en')[errorCode]
        }
    }
}

const _RES_FUN1 = (res = -1, errorCode, arg) => {
    return {
        res,
        errorCode,
        i18n: {
            cn: i18n('cn')[errorCode](arg),
            en: i18n('en')[errorCode](arg)
        }
    }
}

const _RES_FUN2 = (res = -1, errorCode, arg1, arg2) => {
    return {
        res,
        errorCode,
        i18n: {
            cn: i18n('cn')[errorCode](arg1, arg2),
            en: i18n('en')[errorCode](arg1, arg2)
        }
    }
}

const _RES_FUN3 = (res = -1, errorCode, arg1, arg2, arg3) => {
    return {
        res,
        errorCode,
        i18n: {
            cn: i18n('cn')[errorCode](arg1, arg2, arg3),
            en: i18n('en')[errorCode](arg1, arg2, arg3)
        }
    }
}

const CONSTANT = {
    // System tip
    DATA_ADD_ERROR: _RES(-1, 'JSS_0001'),
    DATA_REMOVE_ERROR: _RES(-1, 'JSS_0002'),
    DATA_UPDATE_ERROR: _RES(-1, 'JSS_0003'),
    DATA_GET_ERROR: _RES(-1, 'JSS_0004'),
    DATA_SAVE_ERROR: _RES(-1, 'JSS_0005'),
    DATA_SAVE_ERROR: _RES(-1, 'JSS_0006'),

    // Auth tip
    AUTH_TOKEN_ERROR: _RES(-1, 'JSS_AUTH_0001'),
    AUTH_TOKEN_EXPIRED: _RES(-1, 'JSS_AUTH_0002'),
    AUTH_PARAM_MISSGING: _RES(-1, 'JSS_AUTH_0003'),
    AUTH_ACCOUNT_LENGTH_ILLEGAL: _RES(-1, 'JSS_AUTH_0004'),
    LOGIN_ERROR: _RES(-1, 'JSS_AUTH_0005'),
    ONLINE_FAILED: _RES(-1, 'JSS_AUTH_0006'),

    // VLDidate tip
    REQUIRE_SOME_PARAM: (arg) => _RES_FUN1(-1, 'JSS_VLD_0001', arg),
    ILLEGAL_LENGTH_BETWEEN: (key, arg1, arg2) => _RES_FUN3(-1, 'JSS_VLD_0002', key, arg1, arg2),
    ILLEGAL_EMAIL: _RES(-1, 'JSS_VLD_0003'),
    ILLEGAL_PHONE: _RES(-1, 'JSS_VLD_0004'),
    ILLEGAL_PASSWORD: _RES(-1, 'JSS_VLD_0005'),
    SOME_EXIST: (arg) => _RES_FUN1(-1, 'JSS_VLD_0006', arg),
}

module.exports = CONSTANT