const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    to:{
        type:String,
        required:[true,"Email To Field is required"],
    },
    subject:{
        type:String,
        required:[true,"Email Subject Field is required"],

    },
    text:{
        type:String,
        required:[true,"Email Text Field is required"]
    },
    by:{
        type:String,
        required:[true,"Email By Field is required"]
    },
    type:{
        type:String,
        required:[true,"Email Type Field is required"]

    },
    cc:[String],
    bcc:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    

});

module.exports = Email = mongoose.model('email',EmailSchema);