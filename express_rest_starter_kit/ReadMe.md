> ## REST API Starter Kit

****Status : DONE****


> ## API folder structure

        -express_rest_starter_kit
          *api
             *config
               -index.js
             *controllers
               -index.js
               -productController.js
               *auth
                 -registerController.js
                 -loginController.js
                 -refreshController.js
                 -whoamiController.js
             *middlewares
               -admin.js
               -auth.js
               -errorHandler.js
             *models
               -index.js
               -user.js
               -product.js
               -refreshToken.js
             *routes
               -index.js
             *services
               - CustomErrorHandler.js
               - JWTService.js
             *uploads
               - 3748374834-3293829.jpg
             *validators
               -productValidation.js
            -server.js

> #### REST EXPRESS API Boilerplate Structure Information (WHAT IS WHAT ?)

- [x] ****server.js the entry file to start your api****

- [x] ****config has (.env variables) exported via index.js****

- [x] ****controllers has all the routes logic which is exported via a common index.js****

- [x] ****middlewares contain auth.js (checking authorization header in request header) and errorHandler that act as general error handler for the entire api.****

- [x] ****models has the DB Schemas exported by a single file named index.js****

- [x] ****routes has all the routes path along with controller reference that is exported via common index.js which is then imported in the server.js****

- [x] ****services includes Class based modules like CustomErrorHandler for handling d/f error cases and JWTService for signing JWT token****

- [x] ****uploads folder contain all the image uploaded via the Create New Product Route****

- [x] ****validators contains Client Side Validation modules****



> ## Developer Section

> #### Blueprint

- [x] API Endpoints
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
  - [x] Generate the Refresh token on demand
  - [x] Logout the user
- [x] CRUD
  - [x] Add product with image upload multer local storage Admin Only and Protected(requires Token in header Autorization:Bearer Token)      
  - [x] Update Only Admin Protected needs access token in Header.
  - [x] Get All
  - [x] Get Single
  - [x] Delete
- [x] To make readme.so for node_cli
- [x] To make the CLI to clone the repo for express-api-starter-kit


> #### Imp Facts encountered during development

- [x] error handling middleware of express cannot catch errors if the error is thrown inside of a async function.
***Solution: Use next() to pass the control along with the error to a general error handler(middleware) i.e using return next(error) instead of throw error****

- [x] use custom error handler when error origin is from server.
- [x] when extending a parent class make sure to call the constructor of the parent class as super() in the constructor body of the child class like the CustomErrorHandler Services.
- [x] remember if key and value variable of same name then we can write res.json({access_token}); instead of res.json({access_token:access_token}).
- [x] to avoid certain feilds like password , updated at and version from mongodb response when we use .findOne method we can append another method .select with - flag to prevent those value to be recieved in response like .select('-password -updatedAt -__v')
in whoamiController.js.
- [x] note every api u make make sure that the key for refresh and access token used for signing is different also refresh token are stored in the database unlike access token.
- [x] whenever a token is verified than we can retrieve the payload we sent initially to sign the token. like _id, name etc.
