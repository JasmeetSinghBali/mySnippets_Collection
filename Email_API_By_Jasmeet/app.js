//Server CODE->By JASMEET SINGH BALI
const express=require('express'),
      authuri=require('./generateAuthCodeUri'),
      api    =express();
require('./creds.env');
//default Route Check
api.get("/",(req,res)=>{
  res.send("Welcome To J-Email_Sender!   How To Use It=> Please Read InstructionsReadMe.md File In the Root Directory of this Project.");
});



//Initiate OAUTH2.0 Procedure Route
api.get('/api_call',(req,res)=>{
  //Redirect the user to Google's OAuth 2.0 server to initiate the authentication and authorization process with authentication URI with Required Parameters.
  res.redirect(authuri.generate());
  console.log("API Call, OAUTH2.0 Procedure Initiated....");
});

const {sendMail}=require("./send_email");

//Send Email Route
api.get('/send_mail',(req,res)=>{
  sendMail("Here Your Message Goes!!!! this is the  Email From J-EmailSender","<b>This is the Email Body</b>");
  console.log("Credentials Verified ✓");
	console.log("===========Sending Email==============");
	console.log("Email sent  ✓");
});



api.listen(3000,process.env.IP,()=>{
  console.log("Server Started")
});
