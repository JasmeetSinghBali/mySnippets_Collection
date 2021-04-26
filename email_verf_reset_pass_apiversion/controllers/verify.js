const router=require('express').Router(),
      User=require('../models/Users'),
      jwt=require('jsonwebtoken'),
      bcrypt=require('bcrypt');




// Verify after the user has clicked or visited the verification link send by email
router.post('/verify',async (req,res) =>{
  try{
    const token=req.body.token;
    if(token){

      jwt.verify(token,process.env.JWT_ACTIV_TOKEN,(err,decodedToken)=>{
        if(err){
          return res.status(401).json({error:'Expired Link!! Not Able To Verify'});
        }
        // get back name,email and password from decoded token
        const {name,email,password}=decodedToken;

        // ========= Duplicate Email accounts Handle Validation Here Pending ==========
        // Create new User
        const user=new User({name,email,password});

        // Add user to the database
        user.save((err,success)=>{
          if(err){
            console.log('User Not Added To database');
            return res.status(400).send(err)
          }
          console.log('Verified User added to database')
          return res.send({Success:`${user._id} : Account has been Verified and User Added to Database`});
        });



      });



    }else{
      return res.status(401).send('Something Went Wrong We were not able to Verify Your email ,Please try again')
    }

  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
});




module.exports=router;
