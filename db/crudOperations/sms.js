
const SMS = require('../models/SMS')

const dbOperations = {
    createSMS : function (messageObj, callback){
        var data = {}
        data['messageId'] = messageObj.sid
        data['account_sid'] = messageObj.accountSid
        data['to'] = messageObj.to  //saving without country code
        data['from'] = messageObj.from
        data['body'] = messageObj.body
        data['status'] = 'Sent'
        data['direction'] = messageObj.direction
        data['service'] = messageObj.service
        data['type'] = messageObj.type || 'SMS'
        data['date_created'] = messageObj.dateCreated || Date.now()
        data['date_sent'] = messageObj.dateSent || Date.now()
        var sms = new SMS(data)
        sms.save(function(error, result){
            if(error){
                callback(error, null)
            }else{
                if(!result){
                    callback(null, null)
                }else{
                    console.log(result)
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