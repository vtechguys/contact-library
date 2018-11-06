const Email = require('../models/email');
const utils = require('../../config/utils');

const emailTypes = require('../../config/email');
const mailer = utils.mailer;
const dbOperations = {

    sendEmail:function(emailObj,callback){
        let type = emailObj.type;
        //will send mail
        mailer.createMail(emailObj,type);
        //creates a new db entry
        var emailDoc = {};
        console.log("\t",
        
        
        
        
        
        "this is it",
        
        emailTypes[type]);
        emailDoc["to"] = emailObj.to;
        emailDoc["subject"] = emailObj.subject || emailTypes[type].subject || "subject";
        emailDoc["text"] = emailObj.text || emailTypes[type].text;
        emailDoc["by"] = emailObj.admin;

        let email = new Email(emailObj);
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