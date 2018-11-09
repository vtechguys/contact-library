

const {TWILIO,MSG91,SERVICES,TYPE,EXPIRES_IN} = require('../config')
const {OTP_BODY} = require('../smsTemplates')
const uniqueId = require('../../utils/uniqueId')


module.exports = messenger = {

    prepareSMS : (to,text,type,service)=>{
        var message = {}
        message['to'] = to
        message['messageId'] = uniqueId.randomString(8)
        message['date_sent'] = Date.now()

        switch(type){
            case TYPE.PROMOTIONAL:
                message['type'] = TYPE.PROMOTIONAL
                message['text'] = text
            break;
            case TYPE.TRANSACTIONAL:
                message['type'] = TYPE.TRANSACTIONAL
                message['text'] = text
            break;
            case TYPE.OTP :
                var verification = {}
                message['type'] = TYPE.OTP
                verification['OTP'] = uniqueId.randomString(4)
                verification['expiresIn'] = message.date_sent + EXPIRES_IN*60000
                verification['status'] = 'Not Verified'
                message['verification'] = verification
                message['text'] = OTP_BODY + verification.OTP
            break;
            
        }

        switch(service){
            case SERVICES.TWILIO :
                message['service'] = SERVICES.TWILIO
                message['from'] = TWILIO.MY_NUMBER
            break;
            case SERVICES.MSG91 :
                message['service'] = SERVICES.MSG91
                message['from'] = MSG91.SENDER_ID
            break;
            default : 
                message['service'] = SERVICES.MSG91
                message['from'] = MSG91.SENDER_ID
        }
        message['status'] = 'Sent'
        // console.log(message)
        
        return message
    },

    sendSMS : (message)=>{

        switch(message.service){

            case SERVICES.TWILIO :

                const {ACCOUNT_SID,AUTH_TOKEN} = TWILIO
                const client = require('twilio')(ACCOUNT_SID,AUTH_TOKEN)
                client.messages.create({
                    body : message.text,
                    to : '+91'+message.to,  //+91 - country code
                    from : message.from
                })
                // ,(error, result)=>{
                //     if(error){
                //         console.log(error)
                //         callback(error, null)
                //     }else{
                //         if(!result){
                //             callback(null, null)
                //         }else{

                            // console.log(result)
                            // result['service'] = SERVICES.TWILIO
                            // const dbOperations = require('../../db/crudOperations/sms')
                            // dbOperations.createSMS(result,(error, result1)=>{
                            //     if(error){
                            //         callback(error,null)
                            //     }else{
                            //         if(!result1){
                            //             callback(null, null)
                            //         }else{
                            //             result['dbStatus'] = result1
                            //             callback(null, result)
                            //         }
                            //     }
                            // })
                //         }
                //     }
                // })
                break;

            case SERVICES.MSG91 :
                const {SENDER_ID,API_KEY,ROUTE_ID} = MSG91
                if(message.type === TYPE.PROMOTIONAL){
                    // console.log(TYPE.PROMOTIONAL)
                    var msg91 = require('msg91')(API_KEY,SENDER_ID,ROUTE_ID.PROMOTIONAL)
                }

                if(message.type === TYPE.TRANSACTIONAL || message.type === TYPE.OTP){
                    // console.log(TYPE.TRANSACTIONAL)
                    var msg91 = require('msg91')(API_KEY,SENDER_ID,ROUTE_ID.TRANSACTIONAL)
                }
                // console.log(message)
                msg91.send(message.to,message.text,function(error, result){
                    if(error){
                        console.log(error)
                    }else{
                        console.log(result)
                    }
                })
                // ,(error, result)=>{
                //     if(error){
                //         console.log(error)
                //         callback(error, null)
                //     }else{
                //         if(!result){
                //             callback(null, null)
                //         }else{
                            // console.log(result)
                            // var messageObj = {}
                            // messageObj['sid'] = result
                            // messageObj['accountSid'] = SENDER_ID
                            // messageObj['to'] = message.to  //saving without country code
                            // messageObj['from'] = SENDER_ID
                            // messageObj['body'] = message.body
                            // messageObj['service'] = SERVICES.MSG91
                            // messageObj['status'] = "Sent"
                            // messageObj['direction'] = "outbound-api"
                            // messageObj['type'] = message.type
                            // console.log(messageObj)
                            // const dbOperations = require('../../db/crudOperations/sms')
                            // dbOperations.createSMS(messageObj,(error, result1)=>{
                            //     if(error){
                            //         callback(error, null)
                            //     }else{
                            //         if(!result1){
                            //             callback(null, null)
                            //         }else{
                            //             messageObj['dbStatus'] = result1
                            //             callback(null, messageObj)
                            //         }
                            //     }
                            // })
                            // console.log(result)
                //         }
                //     }
                // })


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
    // sendOTP : (message,callback)=>{
    //     var STRING = uniqueId.randomString(4)
    //     var BODY = OTP_BODY + STRING
    //     const {SENDER_ID,API_KEY,ROUTE_ID} = MSG91
    //             var msg91 = require('msg91')(API_KEY,SENDER_ID,ROUTE_ID.TRANSACTIONAL)
    //             msg91.send(message.to,BODY,(error, result)=>{
    //                 if(error){
    //                     console.log(error)
    //                     callback(error, null)
    //                 }else{
    //                     if(!result){
    //                         callback(null, null)
    //                     }else{
                            // console.log(result)
                            // var messageObj = {}
                            // messageObj['messageId'] = result
                            // messageObj['to'] = message.to  //saving without country code
                            // messageObj['from'] = SENDER_ID
                            // messageObj['body'] = message.body
                            // messageObj['service'] = SERVICES.MSG91
                            // messageObj['status'] = "Sent"
                            // messageObj['OTP'] = STRING
                            // messageObj['direction'] = "outbound-api"
                            // console.log(messageObj)
                            // const dbOperations = require('../../db/crudOperations/otp')
                            // dbOperations.createOTP(messageObj,(error, result1)=>{
                            //     if(error){
                            //         callback(error, null)
                            //     }else{
                            //         if(!result1){
                            //             callback(null, null)
                            //         }else{
                            //             messageObj['dbStatus'] = result1
                            //             callback(null, messageObj)
                            //         }
                            //     }
                            // })
                            // console.log(result)
    //                     }
    //                 }
    //             })
    // }
}