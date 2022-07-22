> ## Oauth2 client in go

example- we are trying to login into gitlab using github

so github will ask for prompt

                    gitlabhq -- github

                    Authorize gitlabhq [authorizing will redirect you to https://gitlab.com]

three parties in Ouath2 mechanism

1. the client - person who is trying to log in
2. the consumer - the application that the client want to log into(like gitlab)
3. the service provider - the external application that authenticates the user identity(like github)

> The idea here is to create go http server(consumer) that uses the github Oauth2 API(service provider) to authenticate the user(client)

                    Client            Consumer                  Service Provider

            Request Authorization
                    |
                    |   github.com/login/oauth/authoriz?client_id=""&redirect_uri="
                    |--------------------------------------> Authorize client
                                                                |
                                                                |
                                                              Redirects to consumer
                                                              redirectURL with request token
                                                              |
                                                              |(localhost:8080/redirect/code="")
                                   request access_token       |
                                   from service provider<-----
                                   via request token                                                     |github.com/login/oauth/access_token
                                         |
                                         |
                                         |-----------------> Provide access token
                                                                |
                                                                | (access token)
                                         redirects to application page with access token
                                         |
                                         |
            Client can now make authorize requests

> Understanding urls

https://github.com/login/oauth/authorize?client_id=myclientid123&redirect_uri=http://localhost:3000/oauth/redirect

1. oauth/authorize is the gateway for github's Oauth flow , all Oauth providers have a gateway url that we have to send to client in order to proceed

2. client_id is the unique identifier for consumer, consumer can be registerd with oauth service provider and then the service provider will generate a unique client_id and client_secret for that consumer.

3. redirect_uri refers to the url to which the oauth service provider will redirect client to with the request token, this also has to be set with the ouath service provider to avoid any malicious callback urls redirection.

> imp facts

- The service provider also adds a request token along with the url. In this case, Github adds this as the code parameter, so the redirect URL will actually be something like http://localhost:3000/oauth/redirect?code=mycode123, where mycode123 is the request token.

> Getting ACCESS_TOKEN

- We need this request token and our client secret to get the access token, which is the token that is actually used to get information about the user. We get this access token by making a POST HTTP call to https://github.com/login/oauth/access_token along with the mentioned information.

> state in authorize request to github oauth provider initially

https://github.com/login/oauth/authorize?client_id=myclientid123&redirect_uri=http://localhost:3000/oauth/redirect&state=SOMERANDOMSTRING

1. generate a random string at client side store in local storage
2. make the above request to the consumer + oauth service provider
3. consumer redirect to welcome page, now at client side compare the state variable value and the welcome page url state value to prevent cross-site request forgery

> Session tokens

- In this example, the access token was passed to the client so that it can make requests as the authorized user. To make this more secure, the access token should not be passed directly to the user. Instead, create a session token that is sent to the user as a cookie.

- map the session token : access_token in DB server side, now the client will make request to the server instead of github directly which will search for the mapped access token from db against the provided session token in client cookies and then the server makes request to the github oauth service on behalf of client.

        Client          Consumer                Database                ServiceProvider

           1 ---start--   |(cookies)
                          |store sessiontoken   sessiontoken: null
                          |
                          | <----got access token -----------------------------
                          |map access token     sessiontoken: access_token
           2 --getUserInf |
                          |get access token from DB
                          --access_token---
                          |
                          | getUserInfo with access_token from service---------------->
                           < --------------------receive userINFo from service provider
              (client)    |
         display user info|
