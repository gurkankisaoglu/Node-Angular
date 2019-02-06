//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const messageList = require('../models/Message');


//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    messageList.getAllLists((err, lists)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, lists:lists},null,2));
            res.end();
        }
    });
});



module.exports = router;
