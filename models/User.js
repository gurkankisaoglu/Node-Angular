//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const UserlistSchema = mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "gender":{
        type:String,
        required:true
    },
    "address":{
        type:String,
        required:true
    },
    "authority":{
        type:Number,
        required:true
    }
});

//Create a model using mongoose.model and export it
const UserList = module.exports = mongoose.model('UserList', UserlistSchema );


//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
    UserList.find(callback)
};

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback)
};


//We pass on an id and remove it from DB using Bucketlist.remove()
module.exports.deleteListById = (id, callback) => {
    let query = {username : id};
    UserList.remove(query, callback)
};

module.exports.loginControl = (username, pasword, callback) =>{
    let query = {username : username, password: pasword};
    UserList.find(query,callback)
};

module.exports.updateListByUsername = (username, callback) => {

};

