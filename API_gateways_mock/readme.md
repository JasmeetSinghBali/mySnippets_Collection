> # API gateways to manage multiple microservices efficiently

- api gateway goal is to redirect appropriate request from client to make it to the concerned microservices

> ### what an api gateway can do while redirecting this request

- additional checks
- validation on incoming requests
- authentication checks
- metrics collection
- message validation
- response transformations
- rate limiting

> ## 🚀 Lets hop on a demo to make a api gateway with Nodejs

- 🎯

  - ✔ all req should be redirected to one of the microservice

  - ✔ some routes will only allow authenticated requests while others can be accessed without a valid authentication (for ex- documentation endpoints)

  - ✔ rate limiting should be set up for free-to-use services in order to reduce the load on backends

  - ✔ Premium services require user to posses credits in their account in order to execute premium requests

> Some enterprise-level API gateway services

- Kong
- Traefik
- F5

> # Demo structure

    *root
        - server.js
        - routes.js
        - logger.js
        - proxyRules.js

- Step 1 basic server, logger setup
- Step 2 routes config /free & /premium each of them with url,proxy,creditCheck,auth
- **Step 3 defining proxy rules using http-proxy-middleware https://www.npmjs.com/package/http-proxy-middleware**
- Step 4 integerate proxyRules in server.js
