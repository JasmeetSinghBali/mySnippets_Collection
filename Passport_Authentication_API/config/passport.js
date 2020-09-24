//for creating the strategy for passport.js
//check the docs for more info
//http://www.passportjs.org/docs/

const LocalStrategy=require('passport-local').Strategy,
	  mongoose=require('mongoose'),
	  bcrypt=require('bcryptjs'),
//Load user model
	  User=require('../models/User');

//configure passport and export it
module.exports=function(passport){
	passport.use(
	new LocalStrategy({usernameField:'email'},(email,password,done)=>{
		//check the user is already in database.
		User.findOne({email:email})
		.then(user=>{
			//no match
			if(!user){
				return done(null,false,{message:'That email is Not Registered'});
				
			}
			//Check/Match the Password
			//.compare(enteredpassword,collection.passwordin database) is a inbuilt method
			bcrypt.compare(password,user.password,(err,isMatch)=>{
				if(err) throw err;
				if(isMatch){//matches
					return done(null,user);
					
				}else{//do not matches
					return done(null,false,{message: 'Wrong Password'});
				}
			});
		})
		.catch(err=>console.log(err));
	})
	);
	//in the session part we need to establish a session via cokkies if the user is authenticated and make use of serialize and deserialize
	//http://www.passportjs.org/docs/configure/
	passport.serializeUser((user, done)=> {
		done(null, user.id);
	});

	passport.deserializeUser((id, done)=> {
		User.findById(id, (err, user)=> {
			done(err, user);
		});
	});
}