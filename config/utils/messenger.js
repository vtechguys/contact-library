

const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_MY_NUMBER,
    MSG91_API_KEY,MSG91_SENDER_ID,MSG91_ROUTE_ID_PROMOTIONAL,MSG91_ROUTE_ID_TRANSACTIONAL,
    SERVICES_TWILIO,SERVICES_MSG91,
    TYPE_PROMOTIONAL,TYPE_TRANSACTIONAL,
    COUNTRY_CODE_INDIA
    } = require('../config')

// const {OTP_BODY} = require('../smsTemplates')
const uniqueId = require('../../utils/uniqueId')


module.exports = messenger = {

    prepareSMS : (to,text,type)=>{
        var message = {}
        message['to'] = to
        message['messageId'] = uniqueId.randomString(8)
        message['date_sent'] = Date.now()
        message['status'] = 'Sent'

        switch(type){
            case TYPE_PROMOTIONAL:
                message['type'] = TYPE_PROMOTIONAL
                message['text'] = text
                message['service'] = SERVICES_MSG91
                message['from'] = MSG91_SENDER_ID
            break;
            case TYPE_TRANSACTIONAL:
                message['type'] = TYPE_TRANSACTIONAL
                message['text'] = text
                message['service'] = SERVICES_MSG91 || SERVICES_TWILIO
                message['from'] = message.service === SERVICES_TWILIO ? TWILIO_MY_NUMBER : MSG91_SENDER_ID
            break;
            
        }
        
        
        return message
    },

    //sends Message Only to verified numbers 
    sendViaTwilio : (message)=>{
            
                const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)
                client.messages.create({
                    body : message.text,
                    to : COUNTRY_CODE_INDIA + message.to,  //+91 - country code
                    from : message.from
                })

        },

    sendViaMSG91 : (message)=>{
    
                if(message.type === TYPE_PROMOTIONAL){
                    var msg91 = require('msg91')(MSG91_API_KEY,MSG91_SENDER_ID,MSG91_ROUTE_ID_PROMOTIONAL)
                }

                if(message.type === TYPE_TRANSACTIONAL ){
                    var msg91 = require('msg91')(MSG91_API_KEY,MSG91_SENDER_ID,MSG91_ROUTE_ID_TRANSACTIONAL)
                }

                msg91.send(message.to,message.text)
    }
        
    }
   
    
