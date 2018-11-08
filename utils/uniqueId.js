

module.exports = uniqueId = {
    randomString : function(x){
    const randomstring = require('randomstring')
    return randomstring.generate(x)
    }
}