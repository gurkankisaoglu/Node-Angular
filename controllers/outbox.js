//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const messageList = require('../models/Message');
const tokenList = require('../models/Token');


router.get('/:id',(req,res) => {
    let token = req.headers.authorization;
    tokenList.getAllLists((err,list)=>{
        if(err) {
            res.json({success: false});
        }else{
            for(let i=0 ; i<list.length ; i++){
                if(token === list[i]._doc.token){
                    let id=req.params.id;
                    messageList.getOutbox(id,(err,list) => {
                        if(err) {
                            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
                        }
                        else {
                            res.write(JSON.stringify({success: true, lists:list},null,2));
                            res.end();
                        }
                    });
                }
            }
        }
    });
});


module.exports = router;
