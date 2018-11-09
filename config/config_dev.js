module.exports = {
    SMTP_SERVICE:"gmail",
    SMTP_MAIL_ID:"dev.devopsgenesis@gmail.com",
    SMTP_MAIL_PASS:"Ytrewq.12345",


    COMPANY_NAME:"DevOps Genesis",
    COMPANY_COVER_IMAGE:"https://hub.packtpub.com/wp-content/uploads/2018/03/264-cover-image.png",
    COMPANY_LOGO:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Devops-toolchain.svg/220px-Devops-toolchain.svg.png",

    DB_URL:'mongodb://localhost:27017/messenger',

    VALID_MAIL_TYPES:['query','followUp','newsLetter','promotionalOffer','OTP'],
    ADMIN_MAILS:[
        {mail:'aniketjhaindia@gmail.com',pass:"abcd"},
        {mail:'ashughildiyal5@gmail.com',pass:"abcd"},
        {mail:'mishraprince0786@gmail.com',pass:"abcd"},
        {mail:'aloksingh3112@gmail.com',pass:"abcd"},
        {mail:'hsharma151197@gmail.com',pass:"abcd"}],

        //messaging variables
    SERVICES : {
        TWILIO : 'twilio',
        MSG91 : 'msg91'
    },
    TWILIO : {
        AUTH_TOKEN : 'e9df2bb28db3d6b8b257920768fb2a9f',
        ACCOUNT_SID : 'AC6c66bd7fdb3305f7cc54a681905ffbfc',
        MY_NUMBER : '+13152846061'
    },
    MSG91 : {
        API_KEY :'246455AZYeXWiILcl5be1b10f',
        SENDER_ID : 'DEVOPS',
        ROUTE_ID :{
            PROMOTIONAL : 1,
            TRANSACTIONAL : 4
        }
    },
    EXPIRES_IN : 10,
    TYPE : {
        PROMOTIONAL : 'promotional',
        TRANSACTIONAL : 'transactional',
        OTP : 'OTP'
    }
    
}
