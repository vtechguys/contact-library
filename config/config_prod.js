module.exports = {
    SMTP_SERVICE:process.env.SMTP_SERVICE,
    SMTP_MAIL_ID:process.env.SMTP_MAIL_ID,
    SMTP_MAIL_PASS:process.env.SMTP_MAIL_PASS,


    COMPANY_NAME:process.env.COMPANY_NAME,

    DB_URL:process.env.DB_URL,

    VALID_MAIL_TYPES:['query','followUp','newsLetter','promotionalOffer'],
    ADMIN_MAILS:[
        {mail:process.env.USER_1_ID,pass:process.env.USER_1_PASS},
        {mail:process.env.USER_2_ID,pass:process.env.USER_2_PASS},
        {mail:process.env.USER_3_ID,pass:process.env.USER_3_PASS},
        {mail:process.env.USER_4_ID,pass:process.env.USER_4_PASS},
        {mail:process.env.USER_5_ID,pass:process.env.USER_5_PASS}],
        
        SERVICES_TWILIO : process.env.SERVICES_TWILIO,
        SERVICES_MSG91 : process.env.SERVICES_MSG91,

    
        TWILIO_AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN,
        TWILIO_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID,
        TWILIO_MY_NUMBER : process.env.TWILIO_MY_NUMBER,

        COUNTRY_CODE_INDIA : process.env.COUNTRY_CODE_INDIA,

        MSG91_API_KEY :process.env.MSG91_API_KEY,
        MSG91_SENDER_ID : process.env.MSG91_SENDER_ID,
        MSG91_ROUTE_ID_PROMOTIONAL : process.env.MSG91_ROUTE_ID_PROMOTIONAL,
        MSG91_ROUTE_ID_TRANSACTIONAL : process.env.MSG91_ROUTE_ID_TRANSACTIONAL,
        
        
        TYPE_PROMOTIONAL : process.env.TYPE_PROMOTIONAL,
        TYPE_TRANSACTIONAL : process.env.TYPE_TRANSACTIONAL
    
    
}