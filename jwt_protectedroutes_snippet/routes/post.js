const router =require('express').Router(),
      verify =require('./verifytokens');


router.get('/',verify,(req,res)=>{
  res.send(req.user);
})


module.exports=router;
