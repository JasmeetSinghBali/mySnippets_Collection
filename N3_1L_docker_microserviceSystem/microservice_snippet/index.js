require('dotenv').config();
const app = require('express')();
const appid = process.env.APP_ID;


app.get("/",(req,res)=>{
    res.send(`appid: ${appid} home page: says hello!`);
});

app.get("/app1",(req,res)=>{
    res.send(`appid: ${appid} app1  page: says hello!`);
});

app.get("/app2",(req,res)=>{
    res.send(`appid: ${appid} app2 page: says hello!`);
});

app.get("/admin",(req,res)=>{
    res.send(`appid: ${appid} ADMIN page: very few people says hello!`);
});

app.listen(appid,()=>{
    console.log(`${appid} is listening`);
});