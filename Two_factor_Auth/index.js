const express=require('express'),
      app=express(),
      speakeasy=require('speakeasy'),
      uuid=require('uuid'),
      {JsonDB} =require('node-json-db'),
      {Config} =require('node-json-db/dist/lib/JsonDBConfig'),
      PORT= process.env.PORT || 5000;
app.use(express.json());
//Initializing json database
const db=new JsonDB(new Config('myDatabase',true,false,'/'));

app.get("/api",(req,res)=>
res.json({
  message:'This is  a 2 Factor Authentication!'})
);

//Register a User  and create Temp Secret
app.post('/api/register',(req,res)=>{
    const id=uuid.v4();//generates a unique identifier

    try{
      const path=`/user/${id}`;
      const temp_secret=speakeasy.generateSecret();//generates a temp secret
      db.push(path,{id,temp_secret});//.push(path, data to put in your database)
      res.json({id,secret:temp_secret.base32});
    }catch(error){
      console.log(error);
      res.status(500).json({message:'Something went wrong with generating secret key.'})

    }
});

//Verify token and make secret key permanent.
app.post('/api/verify',(req,res)=>{
  const {token,userId}=req.body;
  try{
    const path=`/user/${userId}`;
    const user=db.getData(path);

    //take the stored user in our database
    const {base32:secret}=user.temp_secret;

    const verified =speakeasy.totp.verify({secret: secret,
    encoding:'base32',
    token:token
  });
  //verified method totp of speakeasy returns true or false
  if(verified){
    db.push(path,{id:userId,secret:user.temp_secret});
    res.json({verified:true});

  }else{
    res.json({verified:false});
  }

  }catch(e){
    console.log(e);
  }
})

//Validate token and make secret key permanent.
app.post('/api/validate',(req,res)=>{
  const {token,userId}=req.body;
  try{
    const path=`/user/${userId}`;
    const user=db.getData(path);

    //take the stored user in our database
    const {base32:secret}=user.secret;

    const tokenValidates =speakeasy.totp.verify({secret: secret,
    encoding:'base32',
    token:token,
    window:1
  });
  //verified method totp of speakeasy returns true or false
  if(tokenValidates){

    res.json({validated:true});

  }else{
    res.json({validated:false});
  }

  }catch(e){
    console.log(e);
    res.status(500).json({message:'Error finding user'})
  }
})

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
