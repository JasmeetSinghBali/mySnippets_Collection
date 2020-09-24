//Create a Schema for the Mongoose Database
const mongoose=require('mongoose'),
	  UserSchema=new mongoose.Schema({
		  name:{
			  type: String,
			  required: true
		  },
		  email:{
			  type: String,
			  required: true
		  },
		  password:{
			  type: String,
			  required: true
		  },
		  date:{
			  type: Date,
			  default: Date.now
		  },
	  });
//passing UserSchema With the name To the Mongoose.
const User =mongoose.model('User',UserSchema);

module.exports = User;