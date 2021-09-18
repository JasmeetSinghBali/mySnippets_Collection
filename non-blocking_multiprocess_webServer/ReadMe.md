> # Non-Blocking Multiprocess server (Node.js fork)

- [x] **the idea is to fork incoming request to create child processes that can handle requests,thus leaving the main process happy to process further incoming request**


> ## Blocking Single threaded webServer

- [x] go to localhost 5000 with number=29355126551
    - [x] it keeps on loading
- [x] another tab open localhost 5000 number =7
    - [x] it keeps on loading as it is busy in processing the previous request i.e the big number


> ## Non-Blocking Multiple-process webServer

- [x] **every time a new request is made a child process is spin up & that child process will process that request**

- [x] **process is a global object that refers to the currently executing process it can be master or child, example process in non-blocking_server.js is parent while isPrime process refferences to the child process**

- [x] **also note that parent process cannot send anything as it is main process, while child process can send information to the parent**

- [x] **always remember to exit the child process once the work is done as if it is not exited it becomes orphan and it eats the memory of system**

- [x] go to localhost 5000 with number=29355126551
    - [x] it keeps on loading
- [x] another tab open localhost 5000 number =7
    - [x] it gives back response
- [x] another tab open localhost 5000 number = 13
    - [x] it gives back response

                # in linux
                top
                # in windows
                While(1) {ps | sort -des cpu | select -f 15 | ft -a; sleep 1; cls}

                # shows the process/cpu usage if process.exit is neglected
                # then multiple node orphaned processes runs in background eating all the memory


> ## pros and cons of making multiple process webServer

- [x] **Managing a multiprocess application is difficult**
- [x] **Complexity of debugging is super difficult, like their may be lot of orphaned processes, so we have to implement checks on the parent that child processes are alive or they still processing i.e health checks**
- [x] **debugging become a hell if a child process is hanged then we have to figure out the cause by attaching a debugger with that process with it processID**

- [x] **advantages are services/microservices can execute freely even if one request takes longer to process i.e non-blocking architecture is implemented efficiently**

- [x] **another good way is to create a pool of process instead of spinning up child process each time a new request is made**

> # Conclusion

- [x] **It is always better to use containerization i.e multiple node containers serving only single service in blocking architecture and place these node containers behind load balancer**

- [x] **also using clusters module is always better than using child process as the complexity is quite high when the maintainence part goes for the application for long time durations**