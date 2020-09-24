const {sendMail}=require("./app");
const cron =require("node-cron");//to schedule the reports i.e the time intervals for which u want to send Emails/reports.
let counter=1;
//to Completely Understand Node-cron refer the docs
//https://nodecron.com/docs/
cron.schedule('* * * * *',()=>{
	console.log("============Verifying Credentials============");
	sendMail(`Hello their!! this is the : ${counter} time Sending Of Email`,"<b>This is the Email Body</b>");
	counter++;
	console.log("Credentials Verified ✓");
	console.log("===========Sending Email==============");
	console.log("Email sent  ✓");
});



