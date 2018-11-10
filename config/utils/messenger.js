

const config = require('../config')

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
            case config.TYPE_PROMOTIONAL:
                message['type'] = config.TYPE_PROMOTIONAL
                message['text'] = text
                message['service'] = config.SERVICES_MSG91
                message['from'] = config.MSG91_SENDER_ID
            break;
            case config.TYPE_TRANSACTIONAL:
                message['type'] = config.TYPE_TRANSACTIONAL
                message['text'] = text
                message['service'] = config.SERVICES_MSG91 || config.SERVICES_TWILIO
                message['from'] = message.service === config.SERVICES_TWILIO ? config.TWILIO_MY_NUMBER : config.MSG91_SENDER_ID
            break;
            
        }
        
        
        return message
    },

    //sends Message Only to verified numbers 
    sendViaTwilio : (message)=>{
            
                const client = require('twilio')(config.TWILIO_ACCOUNT_SID,config.TWILIO_AUTH_TOKEN)
                client.messages.create({
                    body : message.text,
                    to : config.COUNTRY_CODE_INDIA + message.to,  //+91 - country code
                    from : message.from
                })

        },

    sendViaMSG91 : (message)=>{
    
                if(message.type === config.TYPE_PROMOTIONAL){
                    var msg91 = require('msg91')(config.MSG91_API_KEY,config.MSG91_SENDER_ID,config.MSG91_ROUTE_ID_PROMOTIONAL)
                }

                if(message.type === config.TYPE_TRANSACTIONAL ){
                    var msg91 = require('msg91')(config.MSG91_API_KEY,config.MSG91_SENDER_ID,config.MSG91_ROUTE_ID_TRANSACTIONAL)
                }

                msg91.send(message.to,message.text)
    }
        
    }
   
    
