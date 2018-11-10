module.exports = {
    SMTP_SERVICE:"gmail",
    SMTP_MAIL_ID:"dev.devopsgenesis@gmail.com",
    SMTP_MAIL_PASS:"Ytrewq.12345",


    COMPANY_NAME:"DevOps Genesis",
    COMPANY_COVER_IMAGE:"https://hub.packtpub.com/wp-content/uploads/2018/03/264-cover-image.png",
    COMPANY_LOGO:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Devops-toolchain.svg/220px-Devops-toolchain.svg.png",

    DB_URL:'mongodb://localhost:27017/messenger',

    VALID_MAIL_TYPES:['query','followUp','newsLetter','promotionalOffer'],
    ADMIN_MAILS:[
        {mail:'aniketjhaindia@gmail.com',pass:"abcd"},
        {mail:'ashughildiyal5@gmail.com',pass:"abcd"},
        {mail:'mishraprince0786@gmail.com',pass:"abcd"},
        {mail:'aloksingh3112@gmail.com',pass:"abcd"},
        {mail:'hsharma151197@gmail.com',pass:"abcd"}],

        //messaging variables
    
        SERVICES_TWILIO : 'twilio',
        SERVICES_MSG91 : 'msg91',
    
        TWILIO_AUTH_TOKEN : 'e9df2bb28db3d6b8b257920768fb2a9f',
        TWILIO_ACCOUNT_SID : 'AC6c66bd7fdb3305f7cc54a681905ffbfc',
        TWILIO_MY_NUMBER : '+13152846061',

        COUNTRY_CODE_INDIA : '+91',
    
        MSG91_API_KEY :'246455AZYeXWiILcl5be1b10f',
        MSG91_SENDER_ID : 'DEVOPS',
        MSG91_ROUTE_ID_PROMOTIONAL : 1,
        MSG91_ROUTE_ID_TRANSACTIONAL : 4,
        
        EXPIRES_IN : 10,
    
        TYPE_PROMOTIONAL : 'promotional',
        TYPE_TRANSACTIONAL : 'transactional'    
    
}
