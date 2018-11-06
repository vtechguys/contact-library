'use strict';
const config = require('./config');

const emails = {

    ADMIN: config.SMTP_MAIL_ID,

    COMPANY_NAME:config.COMPANY_NAME,

    quey:{

        subject:`Answer to your query made with ${ config.COMPANY_NAME }`,
        
        text:"This is a mail in response to your query with us."//dynamic
    },
    followUp:{
        subject:`FollowUp from ${ config.COMPANY_NAME }`,
        
        text:"A followup mail from us."
    },
    newsLetter:{
        subject:`FollowUp from ${ config.COMPANY_NAME }`,
      
        text:"A followup mail from us."
    },
    promotionalOffer:{
        subject:`promotionalOffer from ${ config.COMPANY_NAME }`,
        
        text:"A promotionalOffer mail from us."
    },
    
   
   
};

module.exports = emails;