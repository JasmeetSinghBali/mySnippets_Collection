require('./creds.env');
const nodemailer=require('nodemailer'),
      recipientList=user;
module.exports={
	sendMail:async (subject,text,to = recipientList)=>{
		try{
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					type: "OAuth2",
					user:user,
					clientId:client_id,
					clientSecret:client_secret,
					refreshToken:refresh_token,
					accessToken:access_token
				},
				//debug: true,//show debug output
				//logger: true//log info in console
});

const message={
	From:'"Testing Email Automator"<$senderEmail>',
	to,//you can place here multiple addreses who will recieve this email like 'user1@gmail.com,user2@gmail.com,user3@gmail.com'
	subject,
	text:subject,
	html:"<b>Hello!</b><br>this is the message You are Getting from J-EmailSender",

};
	transporter.sendMail(message,()=>{});
	}catch(err){
		console.log("Oops,Something Went Wrong");
		console.log(err);
	}

	},
};
