const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const JwksRsa = require('jwks-rsa');
const axios  = require('axios');

require('dotenv').config()
const app = express();

// so that the request from frontend part(3000) can be made to backend part(5000) of funapp
app.use(cors());

// ✨ middleware
// 🎇🎇🎇🎇Verifying JWT(Access token) recieved from client(react part of funapp at 3000)🎇🎇🎇🎇🎇
const verifyJWT=jwt({
    secret: JwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.JWKS_URI}`
    }),
    audience: `${process.env.RESOURCE_API_UI}`,
    issuer: `${process.env.RESOURCE_API_ISSUER}`, // api->quickstart->nodejs
    algorithms: ['RS256'] // from Auth0 dasboard api settings
}).unless({ path: ['/'] }); // now the default route i.e / can be made successfully from the client side and no token access is required

// used as middleware for all routes except / default route
app.use(verifyJWT);

app.get('/',(req,res)=>{
    res.send('Hello from unprotected route!!🎃');
});

// verifyJWT passed as middleware that verify the jwt token recieved from client
app.get('/protected',async(req,res)=>{

    try{
        const accesstoken = req.headers.authorization.split(' ')[1];
        // /userinfo access user info from authorization server with same access token recieved from client and send data back to client
        const result = await axios.get(`${process.env.RESOURCE_API_ISSUER}userinfo`,{
            headers:{
                authorization: `Bearer ${accesstoken}`
            }
        });
        const userInfo = result.data;
        res.send(userInfo);
    }catch(err){
        res.send(err.message);
    }

    
});


// 👀404 route not found
app.use((err,req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404
    next(error); // passed to generic error middleware at line 48
})


// 👀Generic minimalistic error handler
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'internal server error'
    res.status(status).send(message);
});



app.listen(5000,()=>{
    console.log('Server started at http://localhost:5000');
});