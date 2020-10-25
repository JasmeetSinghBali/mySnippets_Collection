Snippet For Sending Mails By Integrating Your Web Application and Gmail-API.
By-Jasmeet Singh Bali a.k.a Jassi

Contents->
Intro
How To make it Work?
How this API Works?

Intro-
-----------------------------------------------------------------------------------------------------

This API is Used For Integrating Your Web Application with  GMAIL API for the Sole Purpose of Sending Mails.

Gmail API?
Flexible, RESTful access to the user's inbox in other words the functionality of Sending Emails.


Their are Two Approaches to Proceed With This
->Either U make Use of Client library like googleapis where we Simply Create and configure and Object That Defines the Parameters that  are needed.

->the other approach is to make  API's call to the gmail api and then generate a url & set the required Parameters.

We are Going to Use the API call approach.


How Do I make It Work ?
-----------------------------------------------------------------------------------------------------
1.)Clone this Repo. In your Local Machine git clone "url_for_this_repo"

2.)GMAIL API requires an Active Gmail Account From Which U will Be Sending the Mails.

3.)When U have An Active Gmail Account then You Need to Give Your Consent in other words
you need to give Permission to Your Web Application to use the Gmail API and Send Mails On behalf of the Gmail account You Own.

  for that go to "localhost:3000/api_call" to Initiate the OAUTH2.0 Procedure of Authentication.
  You will get AuthCode,accesstokens,refresh tokens in this OAUTH2.0 flow.


4.)After Success of Step -3  and End of OAUTH2.0 Flow, You Will Be Redirected to OAUTH2.0 Playground Developer page where you will have to Click on the "Exchange Authorization code with  Tokens" bottom left button  to Obtain access tokens and refresh tokens.

5.)Now Navigate to the Root Directory of this Project  File named As "creds.env"
Inside this File You have to Store Some key value Pairs as follows---------------

 in creds.env replace the values for the keys with the values u obtained in OAUTH2.0 Playground and Your Web App Client_id and Client_secret key that u obtain when you create credentials in Google API Console  with Gmail API Enabled.

NOTE-dont touch the redirect_uri and scope values let them as it is.
----------------------------------------

client_id="your client_id goes here",
redirect_uri="https://developers.google.com/oauthplayground",
scope="https://mail.google.com/",
user="example@gmail.com/your gmail",
client_secret="your client_secret key goes here",

access_token="your access_token",
refresh_token="your refresh_token",


----------------------------------------



Save the creds.env file.

6.) Finally after Having access to The Gmail API for that particular account ,

  Composing Your Mail message---------
  navigate to app.js in the send_email route section where sendMail function is called change the
  parameters of this function a/c to what your message content should be.

  then, Sending Your Message-----------
  go to "localhost:3000/send_mail"  Route  to   send  mail to the desired recipient.
  the first mail will be sent to yourself check your inbox.

  to change the recipient you have to make changes in the "send_email.js" file
  variable recipientList and mention the email-address their

  for instance,
  recipientList=user1@gmail.com,user2@gmail.com;


  then go to "localhost:3000/send_mail" and your email is sent to your mentioned List of the recipient.





How This API Is Working? /what is the Workflow of the API?
-----------------------------------------------------------------------------------------------------
Sources/Help/Docs->https://developers.google.com/identity/protocols/oauth2/web-server
