const express =require('express');
const app = express();
const fork = require('child_process').fork;

app.get('/isprime',(req,res)=>{
    
    // when a new request is made fork i.e clone the process
    const childProcess = fork("./isprime.js");
    // sending input information to  child process controls goes to isPrime process.on
    childProcess.send({"number": parseInt(req.query.number)});
    // sending processed response from child process to parent
    childProcess.on("message",message=>{
        res.send(message);    
    });
});

app.listen(5000,()=>{
    console.log('🎠 Non-Blocking Server with Multiple child process running at 5000...');
});

