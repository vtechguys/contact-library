
const SMS = require('../models/SMS')
const {prepareSMS,sendSMS} = require('../../config/utils/messenger')
// const uniqueId = require('../../utils/uniqueId')
// const {SERVICES, TWILIO, MSG91, TYPE} = require('../../config/config')
// const {OTP_BODY} = require('../../config/smsTemplates')

const dbOperations = {
    createSMS : function (messageObj, callback){
        // var data = {}
        // data['messageId'] = uniqueId.randomString(8)
        // data['to'] = messageObj.to  //saving without country code
        // data['body'] = messageObj.type === TYPE.OTP ? OTP_BODY : messageObj
        // data['service'] = messageObj.service || SERVICES.MSG91  // MSG91 default service
        // data['from'] = messageObj.service === SERVICES.TWILIO ? TWILIO.MY_NUMBER : MSG91.SENDER_ID
        // data['type'] = messageObj.type || 'SMS'
        // data['date_sent'] =  Date.now()
        // data['status'] = 'Sent'
        var messages = []
        messageObj.to.forEach((value)=>{
            messages.push(prepareSMS(value,messageObj.text,messageObj.type,messageObj.service))
        })
        messages.forEach((message)=>{
            sendSMS(message)
        })

        SMS.insertMany(messages,(error, result)=>{
            // console.log("ERROR")
            // console.log(error)
            // console.log("RESULT")
            // console.log(result)
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
        // var sms = new SMS(data)
        // sms.save(function(error, result){
        //     if(error){
        //         callback(error, null)
        //     }else{
        //         if(!result){
        //             callback(null, null)
        //         }else{
        //             console.log(result)
        //             callback(null, result)
        //         }
        //     }
        // })
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