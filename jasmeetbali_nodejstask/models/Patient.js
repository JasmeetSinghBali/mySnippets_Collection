const mongoose=require('mongoose');

//Define Schema for Patient
const patientSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    max:20
  },
  address:{
    type:String,
    required:true,
    max:20

  },
  email:{
    type:String,
    required:true,
    max:255,
    min:6

  },
  phone:{
    type:Number,
    required:false,
    min:12

  },
  password:{
    type:String,
    required:true,
    min:8,
    max:15

  },
  image:
    {
      type:String,

    }





});

module.exports=mongoose.model("Patient",patientSchema);
