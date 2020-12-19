#Google Recaptcha v2

#With
   -backend Server on Node.js
   -node-fetch,express and body-parser as dependencies.

#Sources->
https://developers.google.com/recaptcha/docs/display

#How to make it work!!
Follow the Below Steps.

#To Get Site & Secret Key.
https://www.google.com/recaptcha
Go to Admin Console->fill details & label your captcha .
You will get
-Site key
-Secret key

*Copy  Secret key for server side Integration and site key for client side,  paste inside the '' of secretKey variable  of the Secret Key Section inside server.js file.*

#Changes in index.html

*Inside index.html->body->formgroup g-recaptcha just above the submit button Replace the string that data-sitekey holds with your site key.*

#Test It!
-git clone the recaptcha node folder.
-navigate to root of the folder recaptcha_node via terminal and type 'nodemon'.
-go to http://localhost:3000/ and test the Recaptcha.
