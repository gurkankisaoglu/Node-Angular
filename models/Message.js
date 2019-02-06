//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const MessageSchema = mongoose.Schema({
    "subject":{
        type:String,
        required:true
    },
    "from":{
        type:String,
        required:true
    },
    "to":{
        type:String,
        required:true
    },
    "date":{
        type:Date,
        default:Date.now(),
        required:true
    },
    "text":{
        type:String,
        required:true
    },
});

//Create a model using mongoose.model and export it
const Message = module.exports = mongoose.model('Message', MessageSchema);


//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
    Message.find(callback);
};

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
};

module.exports.getInbox = (id, callback) => {
    let query = {to: id};
    Message.find(query,callback)
};

module.exports.getOutbox=(id, callback) => {
    let query = {from: id};
    console.log(query);
    Message.find(query,callback)
};