> ## OAuth 2.0 using AuthO ( React + Node )

> 🌠 AIM - Set up OAuth2.0 using Auth0 for your application

> Authorization Server- Auth0

> Auth0 - cloud identity provider

> ### 🎢 Snipppet Blueprint

                            # ✔ To sum Up
                            my-api (act as resource server)
                            Auth0 (act as authorization server)
                            funApp (frontend + backend) act as Client who is trying to access my-api on behalf of a user.

- [x] App frontend -> login and authorize->Auth0
- [x] Auth0-> sends authorization code to App
- [x] App frontend request data with authorization code-> App backend
- [x] App Backend requests exchange of authorization code to get access token -> Auth0
- [x] Auth0 sends acces token -> App backend
- [x] App backend-> uses access token to access resources(make api calls to resource server)
- [x] before response the resource server checks with the Auth0 server for the validity of the access token and finally sends data back to App backend.
- [x] App backend then returns data back to App frontend .

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

- [x] **Now to parse JWT access token, refer quick start guide to configure your app backend to be able to parse and verify jwt access tokens.**
- [x] **✨ to add permissions checks at my-api when it recieves an access token from funApp use package express-jwt-permissions**
- set up dashboard app in Auth0
