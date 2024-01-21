const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    code:{
        type:Number,
        required:true
    },
    expireIn:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('otp',otpSchema,'otp')