const jwt=require('jsonwebtoken');

//Middleware function for protected routes
module.exports= function (req,res,next){
  const token=req.header('auth-token');
  if(!token) return res.status(400).send('Access Denied');

  try{
    //CHECK TOKEN AUTHENTICITY
    const verified=jwt.verify(token,process.env.TOKEN_SECRET);
    req.user=verified;
    next();//so that the protected route function can be executed.

  }catch(err){
    res.status(400).send('Invalid Token');

  }
}
