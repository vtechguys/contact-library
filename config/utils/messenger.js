

const {TWILIO,MSG91,SERVICES,TYPE} = require('../config')
const {OTP_BODY} = require('../smsTemplates')
const uniqueId = require('../../utils/uniqueId')


module.exports = messenger = {
    //outbound service
    sendSMS : (message, callback)=>{

        switch(message.service){

            case SERVICES.TWILIO :

                const {ACCOUNT_SID,AUTH_TOKEN,MY_NUMBER} = TWILIO
                const client = require('twilio')(ACCOUNT_SID,AUTH_TOKEN)
                client.messages.create({
                    body : message.body,
                    to : '+91'+message.to,  //+91 - country code
                    from : MY_NUMBER
                },(error, result)=>{
                    if(error){
                        console.log(error)
                        callback(error, null)
                    }else{
                        if(!result){
                            callback(null, null)
                        }else{
                            console.log(result)
                            result['service'] = SERVICES.TWILIO
                            const dbOperations = require('../../db/crudOperations/sms')
                            dbOperations.createSMS(result,(error, result1)=>{
                                if(error){
                                    callback(error,null)
                                }else{
                                    if(!result1){
                                        callback(null, null)
                                    }else{
                                        result['dbStatus'] = result1
                                        callback(null, result)
                                    }
                                }
                            })
                        }
                    }
                })
                break;

            case SERVICES.MSG91 :
                const {SENDER_ID,API_KEY,ROUTE_ID} = MSG91
                if(message.type === TYPE.PROMOTIONAL){
                    var msg91 = require('msg91')(API_KEY,SENDER_ID,ROUTE_ID.PROMOTIONAL)
                }

                if(message.type === TYPE.TRANSACTIONAL){
                    var msg91 = require('msg91')(API_KEY,SENDER_ID,ROUTE_ID.TRANSACTIONAL)
                }
                
                msg91.send(message.to,message.body,(error, result)=>{
                    if(error){
                        console.log(error)
                        callback(error, null)
                    }else{
                        if(!result){
                            callback(null, null)
                        }else{
                            console.log(result)
                            var messageObj = {}
                            messageObj['sid'] = result
                            messageObj['accountSid'] = SENDER_ID
                            messageObj['to'] = message.to  //saving without country code
                            messageObj['from'] = SENDER_ID
                            messageObj['body'] = message.body
                            messageObj['service'] = SERVICES.MSG91
                            messageObj['status'] = "Sent"
                            messageObj['direction'] = "outbound-api"
                            messageObj['type'] = message.type
                            console.log(messageObj)
                            const dbOperations = require('../../db/crudOperations/sms')
                            dbOperations.createSMS(messageObj,(error, result1)=>{
                                if(error){
                                    callback(error, null)
                                }else{
                                    if(!result1){
                                        callback(null, null)
                                    }else{
                                        messageObj['dbStatus'] = result1
                                        callback(null, messageObj)
                                    }
                                }
                            })
                            console.log(result)
                        }
                    }
                })


                break;

            default : 
            
                // const {SENDER_ID,API_KEY,ROUTE_ID} = MSG91
                // var msg91 = require('msg91')(API_KEY,SENDER_ID,ROUTE_ID.TRANSACTIONAL)
                // msg91.send(message.to,message.body,(error, result)=>{
                //     if(error){
                //         console.log(error)
                //     }else{
                //         if(!result){

                //         }else{
                //             console.log(result)
                //         }
                //     }
                // })
                console.log('fvghgvcvbnbvc')

        }
        
    },
    sendOTP : (message,callback)=>{
        var STRING = uniqueId.randomString(4)
        var BODY = OTP_BODY + STRING
        const {SENDER_ID,API_KEY,ROUTE_ID} = MSG91
                var msg91 = require('msg91')(API_KEY,SENDER_ID,ROUTE_ID.TRANSACTIONAL)
                msg91.send(message.to,BODY,(error, result)=>{
                    if(error){
                        console.log(error)
                        callback(error, null)
                    }else{
                        if(!result){
                            callback(null, null)
                        }else{
                            console.log(result)
                            var messageObj = {}
                            messageObj['messageId'] = result
                            messageObj['to'] = message.to  //saving without country code
                            messageObj['from'] = SENDER_ID
                            messageObj['body'] = message.body
                            messageObj['service'] = SERVICES.MSG91
                            messageObj['status'] = "Sent"
                            messageObj['OTP'] = STRING
                            messageObj['direction'] = "outbound-api"
                            console.log(messageObj)
                            const dbOperations = require('../../db/crudOperations/otp')
                            dbOperations.createOTP(messageObj,(error, result1)=>{
                                if(error){
                                    callback(error, null)
                                }else{
                                    if(!result1){
                                        callback(null, null)
                                    }else{
                                        messageObj['dbStatus'] = result1
                                        callback(null, messageObj)
                                    }
                                }
                            })
                            console.log(result)
                        }
                    }
                })
    }
}