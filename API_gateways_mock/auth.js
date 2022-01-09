const {authMiddleware} = require("./authMiddleware");

const setupAuth = (app,routes)=>{
    routes.forEach(element => {
        // if auth is enabled for this route
        // then attach the authMiddleware for this route
        if(element.auth){
            app.use(element.url,authMiddleware(),(req,res,next)=>{
                console.log(`${element.url} was hit`)
                // await & call your controller logic here
                
                // move forward aagey barhooo
                next()
            })
        }   
    });
}

exports.setupAuth = setupAuth