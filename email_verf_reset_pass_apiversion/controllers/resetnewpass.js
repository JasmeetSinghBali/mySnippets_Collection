const router=require('express').Router(),
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
    if(resetLink){
      jwt.verify(resetLink,process.env.JWT_RESET_PASS,(err,decodeData)=>{
        if(err){
          return res.status(401).json({err:"token Expired or Invalid"});
        }
        // Find the corresponding user with the reset link
        User.findOne({resetLink}).exec((err,user)=>{
          if(user){
            
          }
          else{
            return res.status(400).send('No corresponding reset link find with the user');
          }
      });

    }else{
      return res.status(401).json({err:"No token Provided to reset the password"});
    }



  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
});




module.exports=router;
