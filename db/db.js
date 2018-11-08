const mongoose = require('mongoose');

const config = require('../config/config');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URL,{ useNewUrlParser: true }).then((success)=>{
    console.log("Successfully connected to MongoDB");
}).catch((err)=>{
    console.log("Unable to connect to MongoDB ",err);
});
module.exports = mongoose;
