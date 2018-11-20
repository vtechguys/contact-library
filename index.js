
//Express Dependency
const express = require('express');
//Body Parser
const bodyParser = require('body-parser');
const dbConnect = require('./db/db');
//App
const app = express();
//Port of Node Js
const PORT = process.env.PORT || 5500;
//Middlewares
// Cross origin resourse sharing config
app.use(function (request, response, next) {
    console.log("cross-origin");
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//Parse Http request 
app.use(bodyParser.urlencoded( { extended:false } ));
//Put parse url on body of request obj. req.body
app.use(bodyParser.json());

const contact = require('./routes/api/contact');





app.use('/contact',contact);

app.use('*',function(request,response,next){
     //response.json({"message":"The usl requested is not found","code":404,"success":false});
     console.log("\n\n\nThis is not a valid route\n\n\n");
     console.log("/contact//send-email,/contact//send-email-otp,/contact/send-sms")
    next();
})




app.listen(PORT,()=>{
    console.log("Server Stated at ",PORT);
});