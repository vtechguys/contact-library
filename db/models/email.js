const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    to:{
        type:String,
        required:[true,"Email To Field is required"],
    },
    subject:{
        type:String,
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
        required:[true,"Email By Field is required"]

    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },

});

module.exports = Email = mongoose.model('email',EmailSchema);