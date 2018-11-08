const Email = require('../models/email');
const utils = require('../../config/utils');

const emailTypes = require('../../config/email');
const mailer = utils.mailer;
const dbOperations = {

    sendEmail:function(emailObj,callback){
        let type = emailObj.type;
        var emailDoc = {};
        emailDoc["to"] = emailObj.to;
        emailDoc["subject"] = emailObj.subject || emailTypes[type].subject;
        emailDoc["text"] = emailObj.text || emailTypes[type].text;
        emailDoc["by"] = emailObj.admin;
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
    }

}
module.exports = dbOperations;