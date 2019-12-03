/**
 * test.js
 * 测试model
 * author jyjin
 * create at 2018.09.11
 * --------------------
 * name 
 * type 
 * createAt     创建时间
 * updateAt     更新时间
 */
module.export = {
    name: { type: String },
    type: { type: Number },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
}