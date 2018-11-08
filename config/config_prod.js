module.exports = {
    SMTP_SERVICE:process.env.SMTP_SERVICE,
    SMTP_MAIL_ID:process.env.SMTP_MAIL_ID,
    SMTP_MAIL_PASS:process.env.SMTP_MAIL_PASS,


    COMPANY_NAME:process.env.COMPANY_NAME,

    DB_URL:process.env.DB_URL,

    VALID_MAIL_TYPES:['query','followUp','newsLetter','promotionalOffer'],
    ADMIN_MAILS:[
        {mail:process.env.USER_1_ID,pass:process.env.USER_PASS},
        {mail:process.env.USER_2_ID,pass:process.env.USER_PASS},
        {mail:process.env.USER_3_ID,pass:process.env.USER_PASS},
        {mail:process.env.USER_4_ID,pass:process.env.USER_PASS},
        {mail:process.env.USER_5_ID,pass:process.env.USER_PASS}]
    
}