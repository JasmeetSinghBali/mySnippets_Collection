const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const permissionChecker = require('express-jwt-permissions');

const port = process.env.PORT || 5000;

// ✨ Verifies wheather the jwt access token recieved from app backend is valid or not by interacting with Auth0 server✨
let jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-4rjpnjxf.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://www.my-api.com',
    issuer: 'https://dev-4rjpnjxf.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

// ✨ Authorization endpoint via which the my-api interacts with Auth0 first for permission checks✨
// permissionChecker.check has list of scopes(strings) inside an array 
app.get('/myapi', permissionChecker().check([`read:myapi`]), function (req, res) {
    res.json({
        myapi1: 'This is the first resource',
        myapi2: 'This is the Second resource'
    });
});

app.listen(port,()=>{
    console.log(`Resource Server running at ${port}`);
});