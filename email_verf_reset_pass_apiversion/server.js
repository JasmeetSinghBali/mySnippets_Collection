const express=require('express'),
      dotenv=require('dotenv'),
      app=express(),
      bodyParser=require('body-parser'),
      mongoose=require('mongoose'),
      signupRoute=require('./controllers/auth'),
      emailActivate=require('./controllers/verify'),
      forgotPassword=require('./controllers/resetpass'),
      newPassword=require('./controllers/resetnewpass'),
      PORT=process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser:true,useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log('------MongoDB Connected-----'))
.catch(err => console.log(err));

// Home Default Route
app.get('/',(req,res)=>{
  res.send('started!');
});

//Auth Route
app.use('/signup',signupRoute);
app.use('/emailactivate',emailActivate);
app.use('/forgetpassword',forgotPassword);
app.use('/newpasswordset',newPassword);

app.listen(PORT,process.env.IP,()=>{
  console.log(`Server started at Port:${PORT}`);
});
