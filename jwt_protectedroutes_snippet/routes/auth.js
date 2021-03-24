const router =require('express').Router(),
      User=require('../model/User'),
      {registerValidation,loginValidation}=require('../validation'),
      jwt=require('jsonwebtoken'),
      bcrypt=require('bcrypt');



router.post('/register',async (req,res)=>{


  //Validate before adding user in  DB
  const {error}=registerValidation(req.body);
  if(error)return res.status(400).send(error.details[0].message);


   //Check wheather the user already in database
   const emailExist=await User.findOne({email:req.body.email});
   if(emailExist) return res.status(400).send('Email Already Exsits!!');

   //Hash the password
   const salt=await bcrypt.genSalt(10);
   const hashPassword=await bcrypt.hash(req.body.password,salt);

   //Create New User
   const user=new User({
     name:req.body.name,
     email:req.body.email,
     password:hashPassword
   });
   try{
     const savedUser=await user.save();
     res.send({user:user._id});
   }catch(err){
     res.status(400).send(err);
   }
 });

 //Login
 router.post('/login',async (req,res)=>{
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
