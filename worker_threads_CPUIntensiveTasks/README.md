> Aim: to implement multi-threading in Nodejs

> Current situation

- Nodejs is event based I/O async-await opearations/task architecture though its possible in nodejs to have multiple child process i.e threads but ultimately javascript code execution is synchronous only.

- Now small chunks of synchronous code in javascript could be defined & then nodejs can just invoke them one by one without waiting for any of them specifically instead the callback & Promise resolution mech. helps in knowing wheather that small piece of javascript code got executed completely or not.

> The Problem

- the problem arises when the synchronous javascript code is now CPU-intensive like hashing, which will actually result in blocking the rest of the small chunked synchronous js code.

> Solutions

- **run parallel processes in the background for CPU-intensive-tasks**

> Sol-1: Use of forked processes Without Threads

            const myservicesWorker = createService('script.js')
            service.compute(data,function(err,result){
                //result is available here
            })

- background processing can be achieved via fork a process in nodejs and pass message.

            the main process can communicate with the child process by sending and receiving events.

            no memory is shared

            all the data is cloned i.e a copy is passed i.e change in one side doesen't change another

            if we dont share memory, their is no race condition i.e no two threads are updating the same variable at a time without thread.

> SOL1 drawbacks

- forking process is expensive
- it means run a new virtual machine from scratch and using a lot of memory
- as the processes dont share any memory

- since we are forking process we need OS scheduling for the processes but here in case the first thread takes 10 s and second thread takes 1 s the 1 s thread have to wait for 10 s to get exected.

- now multiple forks need to be done to tackle above problems but then that takes a heavy load on memory.

> so we can use worker-farm that act as pool for forked process

- its a pool of process that can be reused again once thy have completed their current task.

        // main app
        const workerFarm = require('worker-farm')
        const service = workerFarm(require.resolve('./script))

        service('hello',function(err,output){
            console.log(output)
        })

        // script.js
        // this runs as forked process
        module.exports = (inp,callback)=>{
            callback(null, inp + ' ' + world)
        }

        output
        hello world

> ## Its possible to solve the problem with forked process but they are expensive rather using threads lightweight process is always better.

> # Solution(Pro-Mode-On) Worker Threads

- worker threads are isolated contexts
- but they can exchange messages to main process to avoid race conditions
- they also live in same process so they use less memory
- they give same behaviour as threads without sharing memory
- **we can share memory with worker threads & pass ArrayBuffer or SharedArrayBuffer if their is a intensiveneed to do CPU-intensive tasks with large amounts of data**

> # Implementing worker threads

- worker thread pools needs to maintained to avoid exhausting ur system resources

> **a generic pool managment liberary is https://www.npmjs.com/package/workerpool**

> **use AsyncResource in nodejs for async tracking of worker pool https://nodejs.org/api/async_context.html#using-asyncresource-for-a-worker-thread-pool**
