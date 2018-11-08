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
    SERVICES : {
        TWILIO : process.env.TWILIO,
        MSG91 : process.env.MSG91
    },
    TWILIO : {
        AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN,
        ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID,
        MY_NUMBER : process.env.TWILIO_MY_NUMBER
    },
    MSG91 : {
        API_KEY :process.env.MSG91_API_KEY,
        SENDER_ID : process.env.MSG91_SENDER_ID,
        ROUTE_ID :{
            PROMOTIONAL : process.env.MSG91_ROUTE_ID_PROMOTIONAL,
            TRANSACTIONAL : process.env.MSG91_ROUTE_ID_TRANSACTIONAL
        }
    },
    EXPIRES_IN : process.env.EXPIRES_IN,
    TYPE : {
        PROMOTIONAL : process.env.MSG91_TYPE_PROMOTIONAL,
        TRANSACTIONAL : process.env.MSG91_TYPE_TRANSACTIONAL,
        OTP : process.env.MSG91_TYPE_OTP
    }
    
}