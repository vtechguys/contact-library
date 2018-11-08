const router = require('express').Router();

const _ = require('../../utils/lodash');
const config = require('../../config/config');

const {sendOTP,sendSMS} = require('../../config/utils/messenger')
const {SERVICES,TYPE} = config

const dbOperations = require('../../db/crudOperations/email');

const validate = {
    email: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var comValid=true;
        var atpos = string.indexOf("@");
        var dotpos = string.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= string.length) {
            comValid=false;
        }
        var letters = /^[A-Z0-9a-z!@#$%&*+-/=?^_`'{|}~]+$/;
        if (string.length < 5 || string.length > 100 || string.match(letters) === null || string.match("@") === null || comValid===false) {
            return false;
        }
        else {
            return true;
        }
    },
    mobile: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        var string = string.trim();
        var letters = /^[0-9]+$/;
        if (string.length != 10 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    longString: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        
        var string = string.trim();
        var letters = /^[A-Za-z0-9-/_',.:+#&=%()^*!@$[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D] ]+$/;
        if (string.length < 2 || string.length > 5000 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    smallString: function (string) {
        if (string === undefined || typeof(string)!="string") {
            return false;
        }
        
        var string = string.trim();
        var letters = /^[A-Za-z0-9-/_',.:+#&=%()^*!@$[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D] ]+$/;
        if (string.length < 2 || string.length > 100 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    }
}

function validateEmailInfo(info){
    const errors = {};
    if(info){
        if(info.to || info.to===""){
            
            if(!validate.email(info.to)){
                errors["to"] = "To filed is a invalid email";
            }

        }
        else{
            
            errors["to"] = "To field is required.";
        
        }

        if(info.text){
            
            if(!validate.longString(info.text)){
                errors["text"] = "Text filed is a invalid";
            }

        }

        if(info.subject){
            
            if(!validate.smallString(info.subject)){
                errors["subject"] = "Subject filed is a invalid";
            }

        }

        if(info.type || info.type===""){
            
            if(config.VALID_MAIL_TYPES.indexOf(info.type)===-1){
                errors["type"] = "Type filed is a invalid.";
            }

        }
        else{
            errors["type"] = "Type filed is required.";

        }
        
        if(info.admin || info.admin===""){
            
            if(!validate.email(info.admin)){
                errors["Admin"] = "Admin filed is a invalid email";
            }

        }
        else{
            
            errors["admin"] = "Admin field is required.";
        
        }
        if(info.pass || info.pass===""){
            
            if(!validate.smallString(info.pass)){
                errors["pass"] = "Admin Password filed is a invalid";
            }

        }
        else{
            
            errors["pass"] = "Admin Password field is required.";
        
        }




    }
    else{
        errors["to"] = "To field is required.";
        errors["type"]="Type filed is required",
        errors["admin"]="Admin field is required";
        
    }




    return{
        errors:errors,
        isValid:_.isEmpty(errors)
    }
}


function authenticate(email,pass){
    var isValidAdmin = false;
    var isValidAdminPass = false;
    config.ADMIN_MAILS.forEach(adminObj=>{
        if(adminObj.mail===email && adminObj.pass===pass){
            isValidAdmin = true;
            isValidAdminPass = true;
        }
    })
    

    return isValidAdmin && isValidAdminPass;
}

const validateSMS = function(object){

    const errors = {}
    if(_.isEmpty(object.to) || object.to.split(' ').join('').length !== 10){
        console.log(object.to.length)
        errors.to = 'Not a Valid Contact Number'
    }

    if(_.isEmpty(object.text) && object.type !== TYPE.OTP){
        errors.text = 'Message Body cannot be empty'
    }
  
    if(_.isEmpty(object.type)){
        errors.type = 'Message type cannot be empty'
    }else{
      var isExist = false;
      Object.keys(TYPE).forEach(key=>{
          if(TYPE[key] === object.type){
              isExist = true
          }
      })
      if(!isExist){
          errors.type = 'Invalid Type'
      }
  }
  
  
    
  
    if(_.isEmpty(object.service)){
        object.service = SERVICES.MSG91
    }else{
        var isExist = false;
        Object.keys(SERVICES).forEach(key=>{
            if(SERVICES[key] === object.service){
                isExist = true
            }
        })
        if(!isExist){
            errors.service = 'Invalid Service'
        }
    }
  
    return {
        isValid : _.isEmpty(errors),
        errors : errors
    }
  }

router.post('/create-mail',(request,response)=>{
    let body = _.pick(request.body,["to","subject","text","type","admin","pass","config"]);
    const { errors,isValid } = validateEmailInfo( request.body );


    if(!isValid){
        response.json({"message":"Invalid parameters","code":400,"success":false,"errors":errors});

    }
    else{

        if( authenticate(body.admin,body.pass) ){

            dbOperations.sendEmail(body,(error,result)=>{
                if(error){
                    console.log(error);
                    response.json({"message":"Some Error Occured Try again Later!","code":500,"success":false});
                }
                else{
                    if(!result){
                        response.json({"message":"Unable To send mail","code":400,"success":false});
                    }
                    else{
                        response.json({"message":"Successfully sent mail","code":200,"success":false});
    
                    }
                }
            });


        }
        else{
            response.json({"message":"unauthorized","code":401,"success":false});
        }



        
    }



    
});

  
  
  router.post('/send-sms', function(request, response) {
        var body = _.pick(request.body,['text','to','service','type'])
        console.log(body)
        var {isValid, errors} = validateSMS(body)
        body['body'] = body.text
        body.to = body.to.split(' ').join('')
        if(isValid){
          if(body.type !== TYPE.OTP){
            sendSMS(body,(error, result)=>{
              if(error){
                console.log(error)
                response.send({error,message : "Error Occured"})
              }else{
                if(!result){
                  response.send({result : null,message : 'Nothing happened'})
                }else{
                  console.log(result)
                  response.status(200).send({result,message : 'Message sent successfully'})
                }
              }
            })
          }else{
            sendOTP(body,(error, result)=>{
              if(error){
                console.log(error)
                response.send({error,message : "Error Occured"})
              }else{
                if(!result){
                  response.send({result : null,message : 'Nothing happened'})
                }else{
                  console.log(result)
                  response.status(200).send({result,message : 'OTP Sent on ' + body.to})
                }
              }
            })
          }
        }else{
          response.status(500).send({errors,message : 'Invalid Inputs'})
        }
  });
module.exports = router;