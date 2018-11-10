
const SMS = require('../models/SMS')
const {prepareSMS,sendViaTwilio, sendViaMSG91} = require('../../config/utils/messenger')
const {SERVICES_MSG91, SERVICES_TWILIO} = require('../../config/config')
// const uniqueId = require('../../utils/uniqueId')
// const {SERVICES, TWILIO, MSG91, TYPE} = require('../../config/config')
// const {OTP_BODY} = require('../../config/smsTemplates')

const dbOperations = {
    createSMS : function (messageObj, callback){
    
        var message = prepareSMS(messageObj.to,messageObj.text, messageObj.type)
        
        message.service === SERVICES_MSG91 ? sendViaMSG91(message) :  sendViaTwilio(message)
    
        var sms = new SMS(message)
        sms.save((error, result)=>{
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