> ## REST API Starter Kit

****Status : Under Development****

231 whoami route

> ## API folder structure

        -express_rest_starter_kit
          *api
             *config
               -index.js
             *controllers
               -index.js
               *auth
                 -registerController.js
             *routes
               -index.js
            -server.js

> #### Important Info (WHAT IS WHAT ? )

****config has (.env variables) exported via index.js****

****controllers has all the routes logic which is exported via a common index.js****

****routes has all the routes path along with controller refference that is exported via common index.js to be imported in the server.js****

Routes(make it with readme.so table format)

=====================
Developer Section
=====================


> #### Blueprint

- [ ] API Endpoints
  - [x] Register (new user)
    - [x] Validate the request
    - [x] authorize the request
    - [x] check if user already exists
    - [x] prepare-model
    - [x] store in database
    - [x] generate jwt token
    - [x] send response
  - [x] Login (existing user)
  - [x] Who am I (get info about user)
  - [ ] CRUD
    - [ ] Add      
    - [ ] Update
    - [ ] Get All
    - [ ] Get Single
    - [ ] Delete

> #### Issues
> #### Future developments

> #### Imp Facts encountered during development

- [x] error handling middleware of express cannot catch errors if the error is thrown inside of a async function.
***Solution: Use next() to pass the control along with the error to a general error handler(middleware) i.e using return next(error) instead of throw error****

- [x] use custom error handler when error origin is from server.
- [x] when extending a parent class make sure to call the constructor of the parent class as super() in the constructor body of the child class like the CustomErrorHandler Services.
- [x] remember if key and value variable of same name then we can write res.json({access_token}); instead of res.json({access_token:access_token}).
