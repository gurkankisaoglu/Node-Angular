//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const messageList = require('../models/Message');
const tokenList = require('../models/Token');

router.post('/:id', (req,res,next) => {
    let token = req.body.headers.Authorization[0];
    tokenList.getAllLists((err,list)=>{
        if(err) {
            res.json({success: false});
        }else{
            for(let i=0 ; i<list.length ; i++){
                if(token === list[i]._doc.token){
                    let newList = new messageList({
                        subject: req.body.request.subject,
                        from: req.params.id,
                        to: req.body.request.to,
                        date: req.body.request.date,
                        text: req.body.request.text,
                    });
                    messageList.addList(newList,(err, list) => {
                        if(err) {
                            res.json({success: false, message: `Failed to create a new list. Error: ${err}`});
                        }
                        else
                            res.json({success:true, message: "Added successfully."});
                    });
                }
            }
        }
    });
});

module.exports = router;
