/**Common auth middleware for api backend goes here
 * check access token, auth header, user email pass etc...
 */
const authMiddleware = (req,res,next)=>{
    console.log("Authentication....happening ✔")
    /**some super code of your's auth goes here */
}

exports.authMiddleware = authMiddleware;