const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const TokenListSchema = mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "token":{
        type:String,
        required:true
    },
    "Login":{
        type:Date,
        default:Date.now(),
        required:true
    },
    "Logout":{
        type:Date,
        required:false
    },

    "IP":{
        type:String,
        required:false,
    },

    "Browser":{
        type:String,
        required:false
    }

});
const TokenList = module.exports = mongoose.model('TokenList', TokenListSchema);


//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
    TokenList.find(callback)
};


module.exports.addList = (newList, callback) => {
    newList.save(callback)
};

