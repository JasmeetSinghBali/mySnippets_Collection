# Email Verification and Reset Password With Node and Express

### Aim: Add New User to Database On email verification

### API Version

****By: Jasmeet****

Core Packages and External API Used-

- Express
- MailGun API
- jsonwebtoken

***

## How to make it Work?

### Step 1  Clone this project.
***
 ### Step 2 Mailgun Config

      - Go to <a href="https://signup.mailgun.com/new/signup"></a>



- After Creating an Account in mailgun go to ->Sending->Domains.
- a sandbox domain will be created automatically It will look like this ****sandboxdjfkjdkfjdjfkjdkf**** click on this.
- You will then have two options API & SMTP.
- Select the API version and select Node.js in the language to show the code snippet to help you how to send emails via mailgun.

- on the Right side under ****Authorized Recipients**** on the same page set the Emails for the Users who will be recieving emails from mailgun on behalf of you.

- Make sure that the Recipients email you add they give their consent of receiving email from you via mailgun this is done by verifying in their email via link that was automatically send when you added them in your Authorized Recipients List in mailgun.

- ****Once The Recipients Verify & gives their consent you will see Verified under that Recipients email address in your mailgun dashboard****

- ****Now you need API key and DOMAIN for accessing the mailgun API your Node.js Server Code & the npm package mailgun-js to interact with mailgun servers.****



### How to Find my API key and Domain Name.

####  You can find your Domain name from the top where it says
****How would you like to send your emails from sandboxdhfjhdfjh.mailgun.org?**** or ****when you open code snippet after selecting API in Sending --> Overview APIkey and API base url which also contains your domain name appended at the end of url****

#### Example- sandboxdhfjhdfjh.mailgun.org This is your Domain Name.
#### Example- shjdhsjdhsjdhsjdhsjhdasda-hh4jh5j4-djfkdj5 this is your API key

***
### Step 3 Creating a .env file in the root level of this Project.





### Step 4 Making a request in Postman For Creating New User and Sending Email Verification Link.

- POST http://localhost:3000/signup/newUser

****in the request body send json object as****

      {
        "name":"Waduuu",
        "email":"to whom the email verify link will be send the one you specify in the Authorized Recipients in Mailgun",
        "password":"a password you want to create for the user"
      }

### Step 5 Verifying token recieved in email

- POST http://localhost:3000/emailactivate/verify

****in the request body send json object as****

     {
       "token":"the token that your recieved via email in step 4"
      }

****Success****

      {
          "Success": "6086ca52c60a0556d0e22930 : Account has been Verified and User Added to Database"
      }
