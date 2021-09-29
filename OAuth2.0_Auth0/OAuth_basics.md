AIM - Securing Web Applications/API's

> ### What is OAuth2.0 ?

> Simple login or forms(email(username)/password) authentication (the most basic authentication)

                    # https://example.com

                        Username-
                        Password-
                            Login

                    # after login pressed
                    server----> DB (hashes password provided by user , matches with the hashed password stored in DB, look up user info, look up authorization info)

                    # sets up cookie header for session managment of the logged in/out users
                    Set-Cookie: sessionid=foob4r;Max-Age: 86400;

> What is the harm in having authentication system inside of your app

- Security & Maintenance
- need to keep track of best practices in security in terms of web /mobile applications, password hashing and other updated protocols or mechanism

> How OAuth2.0 protocol works

- **🎇 Delegated Authorization Problem**
  -> **How can I let a website access my data without me giving away my password**
  -> **OAuth comes to rescue**

            # Case-1
            # How OAuth Flow works
            we want to allow yelp to only have access to the contacts mentioned in gmail

            So at yelp.com

            Button-> connect with google

            # after the button is clicked
            # Oauth flow is initiated

            # redirects to
            # accounts.google.com

                email-
                password-

            # so this way we are sharing our email and password with google.com servers and not yelp

            # then accounts.google.com asks
            Allow yelp to access pulic profile and contacts
            yes no

            # if user selects yes
            # then user redirected back to yelp.com/callback(redirect uri)

            # so now yelp can access google api contacts on our behalf to access our contact list

> OAuth2.0 terminology

- **Resource owner (me and you who owns the data like contact list)**
- **client (refers to the third party application like yelp)**
- **Authorization server (the system that we use to say yes i.e authorize third party application like accounts.google.com,Okta,AuthO)**
- **Resource server (api or system that can actually access the data that client is requesting)**
- **Authorization grant (makes sure that we give our consent i.e we say yes then only provides authorization grant to third party application)**
- **Redirect uri (after user clicks yes)**
- **Access token (key that is used by the client to access our data like contacts)**

> #### **✔ The Overall OAuth2.0 flow**

> Client-> authorization server -> prompts user -> redirect uri(recieves authorization code)

> client(with authorization code) request for access token in exchange fashion from-> authorization server

> finally client can then use access token to make api request to resource like accessing contacts or other stuff from resource server...
