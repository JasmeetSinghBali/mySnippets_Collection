2 Factor Authentication
----------------------------
with
-Speakeasy
QR code Verification and 2fa secret key authentication possible.
Source-https://github.com/speakeasyjs/speakeasy

-Authenticator extension google chrome.
https://chrome.google.com/webstore/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai/related?hl=en

Dependencies
---------------------------------
"dependencies": {
  "express": "^4.17.1",
  "node-json-db": "^1.1.0",
  "speakeasy": "^2.0.0",
  "uuid": "^8.3.2"
},
"devDependencies": {
  "nodemon": "^2.0.6"
}
Additional Tools userId
----------------------------------
Postman
https://www.postman.com/

JSON formatter .
https://jsonformatter.curiousconcept.com/

To test it!!
----------------------------------
-git clone
-navigate to Two_factor_auth folder
-npm start in terminal

visit http://localhost:5000/api to verify the server is running.

Use POSTMAN(Desktop/Linux version) to make the api GET and POST requests.

/api GET
/api/register POST (To register new user with random uuid that creates temp secret key in json database)
/api/verify POST (That verifies the token and converts the temp_secret to secret i.e permanent secret key in the local json database)
/api/validate

To verify a particular user ID u need the ID of the user & the secret key refer the myDatabase locally created on your system .

Authenticator Google chrome extension
--------------------------------------
chrome->top right corner(chrome extensions)->Authenticator->edit(pencil sign)->plus(+)->Manual entry-> paste the secret from database here & name the issuer as u like.

A token is generated->ex= 792127 click on it to copy this token

http://localhost:5000/api/verify POST
---------------------------
Send Raw body as json
{
  "userId":"Paste the User ID here",
  "token":"paste the generated token from authenticator here"
}

Sample Response
-----------------------------
{
    "verified": true
}

Now check your json database your database will have updated the temp_secret to secret for this particular user for which u performed the Authentication.

Similar Approach need to be followed for
POST api/validate
----------------------------------------
Send Raw body as json
{
  "userId":"Paste the User ID here",
  "token":"paste the generated token from authenticator here"
}

Sample Response
-----------------------------
{
    "validated": true
}

validated:false if the toke expires as their is a time window check for the updated token in the authenticator in chrome extension.
