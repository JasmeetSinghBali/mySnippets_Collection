const registerController={
  register(req,res,next){
    // register logic
    return res.json({
      msg:"Hello from register logic"
    });
  }
}

export default registerController;
