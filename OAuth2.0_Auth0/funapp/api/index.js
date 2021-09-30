const express = require('express');
const cors = require('cors');

const app = express();

// so that the request from frontend part(3000) can be made to backend part(5000) of funapp
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello!!🎃');
});

// 🎇🎇🎇🎇Verifying JWT(Access token) recieved from client(react part of funapp at 3000)🎇🎇🎇🎇🎇
app.get('/protected',(req,res)=>{
    res.send('Hello from protected route 🦨');
});


app.listen(5000,()=>{
    console.log('Server started at 5000');
});