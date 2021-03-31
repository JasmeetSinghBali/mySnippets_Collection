const mongoose=require('mongoose');


//Define Schema of Doctor
const userSchema=new mongoose.Schema({
  firstname:{
    type:String,
    required:true,
    max:20
  },
  lastname:{
    type:String,
    required:true,
    max:20

  },//need to add a dropdown
  hospitalname:{
    type:String,
    required:true

  },
  email:{
    type:String,
    required:true,
    max:255,
    min:6

  },
  password:{
    type:String,
    required:true,
    max:1024,
    min:6
  },
  phone:{
    type:Number,
    required:false,
    min:10

  },
  pincode:{
    type:Number,
    required:false,
    min:6

  },
  state:{
    type:String,
    required:false,
    max:20

  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports=mongoose.model('User',userSchema);
