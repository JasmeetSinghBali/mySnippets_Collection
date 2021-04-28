const router=require('express').Router(),
      _ =require('lodash'),
      User=require('../models/Users'),
      jwt=require('jsonwebtoken'),
      bcrypt=require('bcrypt');

// Mailgun config
const mailgun = require("mailgun-js");



// Check that user has the token to Create New  Password i.e reset password
router.put('/newpass',async (req,res) =>{
  try{
    // we take the token to reset password
    const {resetLink,newPass}=req.body;
    if(!resetLink){
      return res.status(400).send('No corresponding reset link find with the user');
    }
    jwt.verify(resetLink,process.env.JWT_RESET_PASS,(err,decodeData)=>{
      if(err){
        return res.status(400).send('Token Invalid or Expired');
      }
      // Find the corresponding user with the reset link
      User.findOne({resetLink}).exec((err,user)=>{
        if(err){
          return res.status(400).send('No corresponding resetLink found in the database to this user');
        }
        // setting reset link to empty once the user password is changed so that this token cannot be used again.
        const obj={
          password:newPass,
          resetLink:''
        }
        // bascially password updated to new password
        user=_.extend(user,obj);
        user.save((err,result)=>{
          if(err){
            return res.status(401).json({err:"Could not Change Password for the user"});
          }else{
            console.log(result);
            return res.status(200).json({success:"Password Changed!!"});
          }
        })
      })
    })
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports=router;
