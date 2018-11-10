const mongoose = require('mongoose')
const Schema= mongoose.Schema;

const SmsSchema = new Schema({
    messageId : {
        type  :String,
        required : true,
        unique : true
    },
    date_sent : {
        type : Date,
        required : true
    },
    status : {
        type  : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    from : {
        type : String,
        required :true
    },
    service :{
        type : String,
        required : true
    },
    type : {
        type :String,
        required :true
    },
    text : {
        type : String,
        required : true
    }
})

const SMS = mongoose.model('SMS',SmsSchema)

module.exports = SMS