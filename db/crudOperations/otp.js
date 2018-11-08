
const OTP = require('../models/OTP')
const {EXPIRES_IN} = require('../../config/config')

const dbOperations = {
    createOTP : function(messageObj,callback){
        var data = {}
        data['messageId'] = messageObj.messageId
        data['OTP'] = messageObj.OTP
        data['to'] = messageObj.to
        data['from'] = messageObj.from
        data['type'] = 'OTP'
        data['expiresIn'] = Date.now() + EXPIRES_IN*60000 // !0 mins expiration
        data['date_sent'] = Date.now()
        var otp = new OTP(data)
        otp.save(function(error, result){
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

    verifyOTP : function(message,callback){
        var {to, otp} = message
        OTP.findOne({to : to},(error, result)=>{
            if(error){
                callback(error, null)
            }else{
                if(!result){
                    callback(null, null)
                }else{
                    var message = null
                    if(result.status === 'Not Verified' ){

                        if(result.expiresIn <= Date.now()){
                            if(result.OTP === otp){
                                result['status'] = 'Verified'
                                message = 'OTP Verified'
                            }else{
                                message = 'Invalid OTP'
                            }
                        }else{
                            result['status'] = 'Expired'
                            message = 'OTP Expired'
                        }
                    }else{
                        message = 'Invaild OTP'
                    }
                   result.save(function(error, result1){
                       if(error){
                            callback(error, null)
                       }else{
                           if(!result1){
                                callback(null, null)
                           }else{
                               message
                                callback(null, message)
                           }
                       }
                   })

                }
            }
        })
    }
}

module.exports = dbOperations