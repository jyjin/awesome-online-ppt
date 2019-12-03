

/**
 * user.js
 * 用户表 
 * author jyjin
 * create at 2018.09.11
 * --------------------
 * 
 * password 密码（md5格式）
 * username 用户名 唯一
 * phone    手机号 唯一
 * email    邮箱 唯一
 * gender   性别
 * age      年龄
 * status   状态 0不在线（未登录） 1在线（可分配破聊） 2隐身（不可分配破聊，且登录了）
 * createAt 创建时间
 * updateAt 更新时间
 */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId;

module.exports = {
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    password: { type: String },
    username: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },
    gender: { type: Number, default: null },
    status: { type: Number, default: 0 },
    receiveUserId: { type: ObjectId, default: null }
}