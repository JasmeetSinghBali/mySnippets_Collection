const router=require('express').Router(),
      User=require('../models/Users'),
      jwt=require('jsonwebtoken'),
      bcrypt=require('bcrypt');

// Mailgun config
const mailgun = require("mailgun-js");



// Reset Password
router.put('/reset',async (req,res) =>{
  try{
    const email=req.body.email;

    User.findOne({email:email}).exec((err,user)=>{
      if(user){

        console.log(user);
        // Creating a unique jwttoken to send for Reset password
        const token=jwt.sign(
          {_id:user._id},
          process.env.JWT_RESET_PASS,
          {expiresIn: '20m'
        });

        const act_link= `<h3>${process.env.CLIENT_URL}/resetpassword/${token}">Reset My Password</h3>`
        console.log(`Trying to Send Mail To ${req.body.name} with Email: ${req.body.email}...`);
        console.log(act_link);
        const data = {
          from: 'fromMailgun@hello.com',
          to: email,
    	    subject: 'Password Reset token',
    	    html: `Only use the token , copy it and send it as json object in request body in postman to verify the token => ${act_link}`
        };
        const DOMAIN = process.env.DOMAIN_MAILGUN;
        const mg = mailgun({
          apiKey: process.env.MAILGUN_API_KEY,
          domain: DOMAIN
        });

        // Update the reset link in the database of the user.
        return user.updateOne({resetLink:token},(err,success)=>{
          if(err){
            return res.status(400).send('Reset Link Not Updated in the Database');
          }

          // Send Email if the reset link was updated in the database
          mg.messages().send(data, function (error, body) {
            if(error){
              console.log('Email Not sent');
              return res.json({
                Error:"Mailgun was not able to send the Email!"
              });
            }
            return res.status(200).send(`Account Reset token Sent at Email: ${email}! Please Use that token to Reset Password`);
          });
        })

      }
      else{
        console.log(req.body)
        return res.status(400).send('No User Found with this email');
      }

    });
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
});




module.exports=router;
