> ## OAuth 2.0 using AuthO ( React + Node )

> 🌠 AIM - Set up OAuth2.0 using Auth0 for your application (Web or mobile)

> Authorization Server- Auth0

> Auth0 - cloud identity provider uses OPENID connect protocol

> ### 🎢 Snipppet Blueprint (🎇)

                            # ✔ To sum Up
                            Auth0 (act as authorization server)
                            api part of (funapp act as resource server)
                            funapp (React frontend part) act as Client who is trying to access api part of funapp via  Auth0 backed by OAuth2.0 and OpenID

> ### 🎨 Complete Dev Logs

- [x] Go to Auth0 dashboard-> Applications -> API's
- [x] Create API (make sure to add Identifier)
- [x] Quick start -> Node.js
- [x] refer Settings tab for Identifier,token expirationa and other details/settings
- [x] **enable both RBAC & Add permission in the acces token (under RBAC settings) so we can add specific permissions to the access token.**
- [x] Go to the Permissions section where read/write and all types of scope can be added

                    # Add permission
                    read:myapi         description Read your api resources
                    write:myapi        description Write your api resources

> ### 🎈 set up funApp

- [x] go to applications -> Create applications
- [x] choose single page->react
- [x] now their is quick start complete guid how to setup frontend app via sdk
- [x] go to settings and observer the client id, client secret , domain the client id & secret are used to get the acccess tokens
- [x] **configure the application URI a/c to the index.js a/c to local development**

                # as the React SPA will be running at 3000

                Callback URI -http://localhost:3000/
                Allowed logout URL - http://localhost:3000/
                Allowed web origins - http://localhost:3000/


                # callback URI(set up inside frontend application)
                after we have authenticated given our consent then frontend will redirect client to this URI

- [x] **at production level you will fill the DNS and specific url's**

---

> ### ✨ Auth0 Integration for React App (frontend at 3000) part of funapp

                    npx create-react-app funapp
                    npm i @auth0/auth0-react axios --save

                    npm start

- [x] **Wrap the App component inside index.js Provider provided by auth0 refer index.js**

                    <Auth0Provider
                    domain=""
                    clientId=""
                    redirectUri=""
                    >
                        <App />
                    </Auth0Provider>

- [x] **the domain,client id and redirect uri can be obtained from auth0 dashboard applications->funapp & settings**

                    # make a .env inside of root i.e funapp
                    # add domain,client id and redirect uri
                    npm i dotenv --save
                    require('dotenv').config();

                    # .env (REACT_APP_) make sure to add this prefix for every env variable
                    REACT_APP_DOMAIN=mydomain.com
                    REACT_APP_CLIENT_ID=asdsajdhjashdjhasjd23232

- [x] **use the useAuth0 hook for managing state variables, login, logout functionalities etc..**

> 🏷 Login with redirect flow

- [x] npm start
- [x] click on login with redirect
- [x] sign up
- [x] **give consent funApp(client/react app) wants to access domain(Auth0 domain), Note if we would be running the app in real domain then this screen wont appear , in Auth0 all applications are first party applications but at the same time funapp is not verified application hence it displays this screen, in a real application this screen wont appear**
- [x] Click accept
- [x] go to your gmail account that you mentioned while signing up and you will recieve a verification link dont click it.
- [x] come back to the application you will observer that User is now logged in with user object containing info.
- [x] now click on verify link in email and user object email_verified key will change from false to true after you refresh the page.

> 🏷 Login with pop up flow

- [x] opens a seperate browser to login into the Auth0 domain i.e you are sharing your email and password with the authorization server just like in the redirect version.
- [x] User will be logged in and User object is displayed.

> 🏷 Login with pop up -> continue with google flow(Google log in into funapp)

- [x] continue with google
- [x] Auth0 provides client ID and client secret for GCP automatically for dev purpose for a real world application you will need client ID and client Secret from your GCP account.

---

> ### ✨ Auth0 Integration for (backend part at 5000) of funapp refer api dir inside funapp dir

> refer App.js(React part) and index.js(api)

> 👀 Aim -> is to protect our api route such that when the frontend part of funapp request from 3000/ wants to access protected resource at the 5000/protected route then Auth0 as authorization server will share authorization code that can later be used to generate access token(JWT) that can be verified by api(part of funapp) so as to give the client side of funapp access to /protected route.

- cd api
- npm init -y
- npm i cors express --save
- run both api and frontend part in seperate terminals

- [x] **make a request from frontend App.js to the api(backend) refer App.js and make sure axios is installed at frontend**

- [x] **create a api inside the api section inside Applications dashboard of Auth0**
- [x] **now make changes to the index.js inside of api**
- [x] **the idea is to verify jwt at backend api part of funapp that will be sent as access token by the Auth0 authorization server to the client**

> 🎇IMPORTANT refer index.js inside src frontend Need to make sure to specify the audience and scopes so that when react make request to Auth0 servers it is treated as OpenID connect request i.e O.I.D.C request while audience will hold the unique identifier for resource_api

                        audience="Unique identifier"
                        scope="openid profile email"

30:5
