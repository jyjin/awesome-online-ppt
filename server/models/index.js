const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TestSchema = require('./test')
const UserSchema = require('./user')

mongoose.connect('mongodb://jyjin:jyjin2018@104.194.95.113:27017/webApp',(err)=>{
    if(err){
        console.log(`* Connect DATABASE error, error: `, err)
        process.exit(1);
    }else{
        console.log(`* Connect database success !`)
    }
});

exports.Test = mongoose.model('Test', new Schema(TestSchema));
exports.User = mongoose.model('User', new Schema(UserSchema));


