const http = require('node:http');

const server = http.createServer((req, res)=>{
    if(req.url != '/'){
        return res.end();
    }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, ()=>{
    console.log(`stream&buffer server listening on ${PORT}`)
})