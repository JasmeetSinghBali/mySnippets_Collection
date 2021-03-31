if (process.env.NODE_ENV!=="production"){
  require('dotenv').config();
}
const express=require('express'),
      app=express(),
      Patient=require('./models/Patient'),
      Doctor=require('./models/Doctor'),
      {patientValidation}=require('./validation'),
      verify=require('./routes/verifytoken'),
      bcrypt=require('bcrypt'),
      multer=require('multer'),
      {storage}=require('./cloudinary'),
      upload=multer({storage}),
      bodyParser=require('body-parser'),
      dotenv=require('dotenv'),
      mongoose=require('mongoose'),
      postRoute=require('./routes/post'),
      authRoute=require('./routes/auth'),
      PORT=process.env.port || 3000;







//Connect to database
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true,useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));

//to send post requests
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));//__dirname is the directory where the style script is it is a convention way in node js to be on the safe side to avoid erors or abnormal behaviour.

//Routes
app.use('/api/doctor',authRoute);
app.use('/api/posts',postRoute);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//===========Adding new Patients===============================
app.post("/details",upload.single('image'),async(req,res)=>{
  const salt=await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(req.body.password,salt);

  const {error}=patientValidation(req.body);
  //validation check
  if(error)return res.status(400).send(error.details[0].message);

  //check for patient duplicated email
  const emailExist=await Patient.findOne({email:req.body.email});
  if(emailExist) return res.status(400).send('Email Already Exists');



  //Create new patient
  const patient=new Patient({
    name:req.body.name,
    doctor_appointed:req.body.doctor_appointed,
    email:req.body.email,
    address:req.body.address,
    password:hashPassword,
    phone:req.body.phone,
    image:req.file.path

});
try{
    const savedUser=await patient.save();
    console.log(savedUser);
    res.send({new_patient_id:patient._id});

  }catch(err){
     res.status(400).send(err);
   }
  // console.log(req.body,req.file);
  // res.send(req.file);
});

//delete patient records by protected route.
app.delete("/patient/:id",verify,(req,res)=>{
  Patient.findByIdAndRemove(req.params.id,function(err,patient){
		if(err){
			res.send("Operation unsuccessfull...");
		}
		else{
			res.send("deleted...")
		}
	});
});
//get patient photo url hosted at cloudinary by patient id protected route
app.get("/patient/photo/:id",verify,(req,res)=>{
  Patient.findById(req.params.id,function(err,patient){
  		if(err){
  			res.send("Operation unsuccessfull...");
  		}
  		else{
  			res.send(patient.image);
  		}
  	});
});



app.listen(PORT,process.env.IP,()=>{console.log(`Server Started at ${PORT}`)});
