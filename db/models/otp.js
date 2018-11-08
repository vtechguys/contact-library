const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OtpSchema = new Schema({
    messageId : {
        required : true,
        unique : true,
        type : String
    },
    OTP : {
        required :true,
        unique : true,
        type :String
    },
    to : {
        type : String,
        required : true
    },
    from : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    status:{
        type : String,
        default : 'Not Verified'
    },
    expiresIn : {
        type: Date,
        required : true
    },
    date_sent : {
        type : Date,
        required : true
    }
})

const OTP = mongoose.model('OTP',OtpSchema)
module.exports = OTP