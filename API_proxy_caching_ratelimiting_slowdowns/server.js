const express = require('express');
const app = express();

const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');


const BASE_URL = "https://api.nasa.gov/insight_weather/?";

const axios = require('axios');
require('dotenv').config();

// ==============Caching==============
let cachedData;
let cacheTime; // to refresh the cache after a timeperiod to store the updated values

//Enable if behind reverse proxy(Heroku,Bluemix,AWS ELB , Nginx)
//https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
// so when your app is behind proxy the header will be set forwaredfor that is actually IP address of the requesting client
// it also make sure that individual IP address are rate limited rather than only limiting the localhost.

//rate-limiter
const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 sec
  max: 10 // limit each IP to 2 request per windowMs
});

//Increase  response time to avoid DDOS/Spamming of api endpoint
const speedLimiter = slowDown({
  windowMs: 30 * 1000, //30s
  delayAfter: 1, //delay after 1st request
  delayMs: 500 //adds 500 ms delay for geting the response to the subsequent request
  // request 1 delayed by 500ms
  // request 2 delayed by 1000ms
  // request 3 delayed by 1500ms
});

//custom api-key collection
const apiKeys = new Map();
// creates a valid api key inside apiKeys map
apiKeys.set('12345',true);


// the middleware here goes like first rate-limiter then slows down response then check for api key even if someone brute force then the limiter and slow down will create server unresponsive for that IP address and then it caches the data
app.get('/data', limiter , speedLimiter ,(req,res,next)=>{
  //custom middleware to check custom api key present in the request
  const apiKey = req.get('X-API-KEY');
  if(apiKeys.has(apiKey)){
    next();
  }else{
    const error = new Error('Invalid API KEY');
    return res.send('You are not authorized you dont have Custom API Key , Please Provide X-API-KEY Header while making request.');
  }
},async (req,res)=>{
  //in-memory caching (manual) can use redis or mongo alternatively
  // when the cacheTime has not exceeded 30s wrt to current time then we want to refersh
  if(cacheTime && cacheTime > Date.now() - 30 * 1000){
    return res.json(cachedData);
  }
  try{
    //1. make request to nasa api
    // URLSearchParams will convert this key value pairs as query string seperated by & refer https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
    const params = new URLSearchParams({
      api_key: process.env.NASA_API_KEY,
      feedtype: 'json',
      ver: '1.0'
    });
    const  {data} = await axios.get(`${BASE_URL}${params}}`);
    //2. respond to this request with data from nasa api
    cachedData = data;
    cacheTime= Date.now();

    data.cacheTime = cacheTime;

    return res.json(data);

  }catch(err){
    console.log('Something went wrong');
    return res.send(err);
  }

});



app.listen(5000,()=>{console.log("🦨Running ...")});
