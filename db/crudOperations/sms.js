
const SMS = require('../models/SMS')
const messenger = require('../../config/utils/messenger')
const config = require('../../config/config')
// const uniqueId = require('../../utils/uniqueId')
// const {SERVICES, TWILIO, MSG91, TYPE} = require('../../config/config')
// const {OTP_BODY} = require('../../config/smsTemplates')

const dbOperations = {
    createSMS : function (messageObj, callback){
    
        var message = messenger.prepareSMS(messageObj.to,messageObj.text, messageObj.type)
        
        message.service === config.SERVICES_MSG91 ? messenger.sendViaMSG91(message) : messenger.sendViaTwilio(message)
    
        var sms = new SMS(message)
        sms.save((error, result)=>{
            if(error){
                callback(error, null)
            }else{
                callback(null, result)
            }
        })
    },
    getSMS : function(callback){
        SMS.find((error, result)=>{
            if(error){
                callback(error, null)
            }else{
                if(!result){
                    callback(null, null)
                }else{
                    callback(null, result)
                }
            }
        })
    }
}

module.exports = dbOperations