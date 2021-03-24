const express=require('express'),
      app=express(),
      PORT=process.env.PORT || 3000,
      dotenv=require('dotenv'),
      mongoose=require('mongoose'),
      postRoute=require('./routes/post'),
      authRoute=require('./routes/auth');

dotenv.config();
//Connect to mongoDB
mongoose.connect(
process.env.DB_CONNECT,
{useNewUrlParser:true,useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));


app.use(express.json());


//Route Middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);


app.listen(PORT,process.env.IP,()=>console.log(`Server started at Port ${PORT}`));
