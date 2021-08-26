# Problem Statement ->

#### How to secure an API without any sort of user login?

### Case - your application front end part hits a third party api using api key since their is now way to securely store api key in frontend , you will move api call to backend but is their any way to prevent others from accessing your api?

----

# Possible Solution Layer(refer server.js)


- [x] Caching (to prevent irrelevant api request everytime instead storing result from api that can be used again instead of making request to api) via in-memory manual or via redis/mongodb
- [x] Rate Limiting (express-rate-limit)
- [x] Intentionally increase the time taken to get response from api i.e increasing the time taken to process request so that DDOS can be prevented. (express-slow-down)
- [x] Create your own api key(so that if the same user is using differnet IP to access it then we can still rate limit them using their credentials as each user will have their own unique api-key)
- [x] set up proxy proxy means when we make request to the api the request is first taken to a different part or handler via proxy and then after handling it the response is returned to the origin of the request
Consider proxy as man in a middle like stuff.

# Example Adaptor for mars.nasa.gov weather api

https://mars.nasa.gov/insight/weather/
