//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const userlist = require('../models/User');
const tokenlist = require('../models/Token');
var rtg = require('random-token-generator');
const requestIp = require('request-ip');
const  {detect} = require('detect-browser');
const browser = detect();
const ipInfo = require("ipinfo");
// Current ip information



router.post('/', (req,res,next) => {
    let username = req.body.username;
    let password = req.body.password;
    userlist.loginControl(username,password,(err,list) => {
        if(err){
            res.json({success: false, message: `Login Failed with Error`});
        }else{
            if(list[0]!==undefined){
                rtg.generateKey({
                    len: 32, // Generate 32 characters or bytes of data
                    string: true, // Output keys as a hex string
                    strong: true, // Use the crypographically secure randomBytes function
                    retry: false // Retry once on error
                }, function(err, key) {
                    let newList = new tokenlist({
                        username:username,
                        token: key,
                    });
                    tokenlist.addList(newList,(err,list2) => {
                        if(err){
                            res.json({success: false, message: `Failed to create a new list. Error: ${err}`});
                        }else{
                            res.write(JSON.stringify({success: true, lists:list,token:key},null,2));
                            res.end();
                        }
                    });
                });
            }
            else{
                res.json({success: false, message: `Failed to login.`});
            }
        }
    });
});


router.put('/:token', (req,res,next) => {
// The below options are also the defaults
    let token=req.params.token;
    tokenlist.update({ token: token}, { $set: { "Logout": Date.now() }}, (err,list)=>{
        if(err){
            res.json({success: false, message: `Failed`});
        }else{
            res.write(JSON.stringify({success: true, lists:list},null,2));
            res.end();
        }
    });
});

module.exports = router;
