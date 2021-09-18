const express =require('express');
const app = express();

app.get('/isprime',(req,res)=>{
    const jsonResponse = isPrime(parseInt(req.query.number));
    res.send(jsonResponse);
});

app.listen(5000,()=>{
    console.log('💀 Blocked Server with Single Main Thread🌽 running at 5000...');
});

function isPrime(number){
    let startTime = new Date();
    let endTime = new Date();
    let isPrime = true;
    for (let i=3 ; i<number;i++){
        // not a prime break the loop
        // see how much time it took
        if(number % i ===0){
            endTime = new Date();
            isPrime = false;
            break;
        }
    }
    if(isPrime){
        endTime=new Date();
    }
    return {
        "number": number,
        "isPrime" : isPrime,
        "time" : endTime.getTime() - startTime.getTime()
    };
}