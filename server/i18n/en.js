/**
 * 国际化-英文
 * 
 * author   : jyjin
 * date     : create at 2018.07.29
 * remark   : 国际化入口
 */
module.exports = {
    // System tip
    'JSS_0001': 'Add data failed',
    'JSS_0002': 'Remove data failed',
    'JSS_0003': 'Update data failed',
    'JSS_0004': 'Query data failed',
    'JSS_0005': 'Save data failed',
    'JSS_0006': 'Get data failed',

    // Authentication tip
    'JSS_AUTH_0001': 'token verification error',
    'JSS_AUTH_0002': 'token expired',
    'JSS_AUTH_0003': '用户名或密码不能为空',
    'JSS_AUTH_0004': '请输入3到20位的用户名',
    'JSS_AUTH_0006': '上线失败',

    // 校验提示
    'JSS_VLD_0001': (s) => `参数'${s}'不可以缺失`,
    'JSS_VLD_0002': (k, m, n) => `${k}长度必须在${m}到${n}之间`,
    'JSS_VLD_0003': '邮箱格式错误',
    'JSS_VLD_0004': '手机号格式错误',
    'JSS_VLD_0005': '密码格式错误',
    'JSS_VLD_0006': (k) => `${k}已存在`,
}