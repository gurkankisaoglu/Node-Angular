//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const userlist = require('../models/User');
const tokenList = require('../models/Token');


//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    let token = req.headers.authorization;
    tokenList.getAllLists((err,list)=>{
        if(err) {
            res.json({success: false});
        }else{
            for(let i=0 ; i<list.length ; i++){
                if(token === list[i]._doc.token){
                    userlist.getAllLists((err, lists)=> {
                        if(err) {
                            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
                        }
                        else {
                            res.write(JSON.stringify({success: true, lists:lists},null,2));
                            res.end();
                        }
                    });
                }
            }
        }
    });
});

router.get('/:id',(req,res)=> {
    let token = req.headers.authorization;
    tokenList.getAllLists((err,list)=>{
        if(err) {
            res.json({success: false});
        }else{
            for(let i=0 ; i<list.length ; i++){
                if(token === list[i]._doc.token){
                    tokenList.getAllLists((err,lists)=>{
                        if(err){
                            res.json({success:false})
                        }
                        else{
                            res.write(JSON.stringify({success: true,lists:lists},null,2));
                            res.end();
                        }
                    });
                }
            }
        }
    });
});


//POST HTTP method to /bucketlist
router.post('/', (req,res,next) => {
    let token = req.body.headers.Authorization[0];
    tokenList.getAllLists((err,list)=>{
       if(err) {
           res.json({success: false});
       }else{
           for(let i=0 ; i<list.length ; i++){
               if(token === list[i]._doc.token){
                   let newList = new userlist({
                       username: req.body.request.username,
                       password: req.body.request.password,
                       email: req.body.request.email,
                       gender: req.body.request.gender,
                       address: req.body.request.address,
                       authority: req.body.request.authority
                   });
                   userlist.addList(newList,(err, list) => {
                       if(err) {
                           res.json({success: false, message: `Failed to create a new list. Error: ${err}`});
                       }
                       else{
                           res.json({success:true, message: "Added successfully."});
                       }
                   });
               }
           }
       }
    });
});


router.delete('/:id', (req,res,next)=> {
    let token = req.headers.authorization;
    console.log(token);
    tokenList.getAllLists((err,list)=>{
        if(err) {
            res.json({success: false});
        }else{
            for(let i=0 ; i<list.length ; i++){
                if(token === list[i]._doc.token){
                    let id = req.params.id;
                    userlist.deleteListById(id,(err,list) => {
                        if(err) {
                            res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
                        }
                        else if(list) {
                            res.json({success:true, message: "Deleted successfully"});
                        }
                        else
                            res.json({success:false});
                    })
                }
            }
        }
    });
});

router.post('/:id', (req,res,next)=>{
    let token = req.body.headers.Authorization[0];
    tokenList.getAllLists((err,list)=>{
        if(err) {
            res.json({success: false});
        }else{
            for(let i=0 ; i<list.length ; i++){
                if(token === list[i]._doc.token){
                    let newList = new userlist({
                        username: req.body.request.username,
                        password: req.body.request.password,
                        email: req.body.request.email,
                        gender: req.body.request.gender,
                        address: req.body.request.address,
                        authority: req.body.request.authority
                    });
                    let id = req.params.id;
                    userlist.deleteListById(id,(err,list) => {
                        if(err) {
                            res.json({success:false, message: `Failed`});
                        }
                        else if(list) {
                            userlist.addList(newList,(err, list) => {
                                if(err) {
                                    res.json({success: false, message: `Failed`});
                                }
                                else{
                                    res.json({success:true, message: "Updated"});
                                }
                            });
                        }
                        else
                            res.json({success:false});
                    })
                }
            }
        }
    });
});

module.exports = router;
