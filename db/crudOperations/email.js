const Email = require('../models/email');
const utils = require('../../config/utils');
const uniqueID = require('../../utils/uniqueId');
const emailTypes = require('../../config/email');
const mailer = utils.mailer;
const dbOperations = {

    sendEmail:function(emailObj,callback){
        let type = emailObj.type;
        var emailDoc = {};
        emailDoc["to"] = emailObj.to;
        emailDoc["subject"] = emailObj.subject || emailTypes[type].subject;
        emailDoc["text"] = emailObj.text || emailTypes[type].text;
        emailDoc["by"] = "dev.devopsgenesis@gmail.com";
        emailDoc["type"] = emailObj.type;
        emailDoc["cc"] = emailObj.cc;
        emailDoc["bcc"] = emailObj.bcc;
        emailDoc["config"] = emailObj.config;
        //will send mail
        mailer.createMail(emailDoc,type);
        //creates a new db entry
        let email = new Email(emailDoc);

        email.save(function(error,result){
            if(error){
                
                callback(error,null);
            }
            else{
                callback(null,result);
            }
        })
    },
    sendOTP:function(emailObj,callback){
        let type = "OTP";
        let otpDoc = {};
        console.log("type",emailTypes[type]);
        otpDoc["to"] = emailObj.to;
        otpDoc["subject"] = emailTypes[type].subject;
        otpDoc["text"] = (emailObj.text || emailTypes[type].text) + ' ' + uniqueID.randomNumber(6);
        otpDoc["by"] = emailObj.admin;
        otpDoc["type"] = type;

        //will sendOTP email
        mailer.createMail(otpDoc,type);
        //create a new db entry
        let email = new Email(otpDoc);

        email.save(function(error,result){
            if(error){
                
                callback(error,null);
            }
            else{
                callback(null,result);
            }
        })


    }

}
module.exports = dbOperations;
