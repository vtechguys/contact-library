const randomstring = require('randomstring');


module.exports = uniqueId = {
    randomString : function(x){
    return randomstring.generate(x)
    },
    randomNumber: function(x){
        return randomstring.generate({
            "length":x,
            "charset":"numeric"
        })
    }
}