> # Snipppet for 3 NodeJS, 1 Load balancer microservices based system with docker-compose

> Step-1 Build the node image via dockerfile
                
                docker build -t nodeapp .

> Step-2 create haproxy container for load balancing, make sure to first to write config file for haproxy

**refer https://www.haproxy.com/blog/the-four-essential-sections-of-an-haproxy-configuration/**

                # haproxy-> haproxy.cfg
            
> Step-3 create docker-compose.yml


**the idea is that only the load balancer should be accesible publically**

> Step-4 fire up containers with docker-compose

        # make sure to be in the directory where the docker-compose.yml is located

        docker-compose up

> Step-5 test and put the containers down

        # go to localhost:8080 and observe how haproxy directs/load balances our requests when we refresh page first  to 1111 then 2222 and then 3333 node containers automatically
        
        docker-compose down