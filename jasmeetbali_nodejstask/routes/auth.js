const router=require('express').Router(),
      User=require('../models/Doctor'),
      {registerValidation,loginValidation}=require('../validation'),
      jwt=require('jsonwebtoken'),
      bcrypt=require('bcrypt');

//Register
router.post('/register',async(req,res)=>{

  const {error}=registerValidation(req.body);
  //validation check
  if(error)return res.status(400).send(error.details[0].message);

  //check for doctor duplicated email
  const emailExist=await User.findOne({email:req.body.email});
  if(emailExist) return res.status(400).send('Email Already Exists');


  //Hash the password
  const salt=await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(req.body.password,salt);

  //create new user
  const user=new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    hospitalname:req.body.hospitalname,
    email:req.body.email,
    password:hashPassword,
    phone:req.body.phone,
    pincode:req.body.pincode,
    state:req.body.state,
});
//Add  the doctor details to database.
 try{
     const savedUser=await user.save();
     res.send({user_created:user._id});
   }catch(err){
      res.status(400).send(err);
    }
});

//login
router.post('/login',async(req,res)=>{
  //Validate User
  const {error}=loginValidation(req.body);
  if(error)return res.status(400).send(error.details[0].message);

  //Check wheather the user with the email exist
  const user=await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send('Email not found!!');

  //PASSWORD IS CORRECT
  const validPass=await bcrypt.compare(req.body.password,user.password);
  if(!validPass) return res.status(400).send('Password is wrong.');

  //create and assign a token
  const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
  res.header('auth-token',token).send(token);//add it to our header auth-token is arbitary name and spit it back

});

module.exports=router;
