> ## REST API Starter Kit

****Status : Under Development****

22 at register controller logic

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

***
***

> #### Blueprint

- [ ] API Endpoints
  - [ ] Register (new user)
    - [ ] Validate the request
    - [ ] authorize the request
    - [ ] check if user already exists
    - [ ] prepare-model
    - [ ] store in database
    - [ ] generate jwt token
    - [ ] send response
  - [ ] Login    (existing user)
  - [ ] Who am I (get info about user)
  - [ ] CRUD
    - [ ] Add      
    - [ ] Update
    - [ ] Get All
    - [ ] Get Single
    - [ ] Delete
