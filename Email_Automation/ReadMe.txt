This is a SNIPPET that can act as a boilerplate for Your main application in  Sending AUTOMATED Emails/Reports  in node-mailer by
node-mailer and node-cron linked to  Gmail API  with OAUTH2 Token based authentication.

The Necessary Instructions will be in Main.js and app.js File.
This Snippet  Has the Potential to Be implemented on large scale .


You need to replace the below in app.js->
1.)the sender and reciever email Address
2.)clientid,clientsecret,refreshtoken and accesstoken

Detailed Steps->
				for using OAuth2 with node mailer refer next line link docs
				https://nodemailer.com/smtp/oauth2/#example-3
				Remember you need to do certain steps before using node mailer with gmail
				
1.)set 2 factor authentication and make app password for the gmail account that will be used as sender.

2.)create a project in google console and in gmail api enable it  to web application.

3.)set up OAuth consent screen and the parameter inside it  as Authorised redirect URIs:https://developers.google.com/oauthplayground

4.)now in OAuth2.0 playgrounds set up your OAuth api and Declare the scope as https://mail.google.com

5.)now authorize it and click on the automatic refresh button.

the client id,client secret will be shown when you create new project in gmail api and the refresh token and acess token will be dispalyed in the Oauth2.0 playground last step i.e 3rd step.

If U have Done Everything Correctly then type "npm start"
in terminal and your Node-mailer is up and Running. 