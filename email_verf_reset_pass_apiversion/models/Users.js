const mongoose=require('mongoose');


// Define Schema for new User
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    max:20
  },
  email:{
    type:String,
    required:true,
    max:20

  },
  password:{
    type:String,
    required:true,
    max:1024,
    min:6
  },
  resetLink:{
    data:String,
    default:''
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports=mongoose.model('User',userSchema);
