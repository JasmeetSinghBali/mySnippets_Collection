// this process refers to the child process
process.on("message",message=>{
    const jsonResponse = isPrime(message.number);
    // controls goes back to parent process i.e non-blocking_server.js with jsonResponse
    process.send(jsonResponse);
    // termination/killing child process is crucial to avoid memory bottlenecks
    process.exit();
})

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