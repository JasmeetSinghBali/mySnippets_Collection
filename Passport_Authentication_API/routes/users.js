const express=require('express'),
	  router=express.Router(),//.Router is the class that is capable of handling the Routes along with the validation like 404 error and stuff like that...
	  bcrypt=require('bcryptjs'),//for encrypting passwords
	  passport=require('passport');
//requiring the User model.
const User=require('../models/User');


//Login Page
router.get('/login',(req,res) => res.render('login'));
//module.exports = router;


//Register Page
router.get('/register',(req,res) => res.render('register'));
//module.exports = router;


//Register Handle
router.post('/register',(req,res)=>{
	//getting the data from form and store into variable.
	const {name,email,password,password2 }= req.body;
	// Form Validation
	let errors=[];
	
	//check require fields
	if(!name || !email || !password || !password2){
		errors.push({msg:'Please Fill in all fields'});
	}
	
	//check passwords match
	if(password!=password2){
		errors.push({msg:'Passwords Do not match'});
	}
	//check pass length
	if(password.length<6){
		errors.push({msg:'Password should be at least 6 characters'});
	}
	if(errors.length>0) {
		//we are passing all the variables so that in case validation fails
		//we dont want the form to be completely empty we want the data 
		//that has passed the validation duhhh!!.
		res.render('register',{
			errors,
			name,
			email,
			password,
			password2
		});
	}else{
		//Validation Passed
		//now we need to find a user via mongoose method .findOne() 
		//from the collection that is made in the mongodb 
		User.findOne({email:email})//it is going to give a promise to handle the promise we use .then()
			.then(user =>{
			if(user){
				//User Exists duplication raise error
				errors.push({msg:'Email is already Registered'});
				res.render('register',{
				errors,
				name,
				email,
				password,
				password2
				});
			}else{
				const newUser=new User({
					name,
					email,
					password
				});
				//console.log(newUser);//the new user that is created
				
				//Hash Password via bcrypt methods called .genSalt(no_of_characters,callback),.hash(plaintextpassword,salt,callback) that we created via .genSalt method)
				bcrypt.genSalt(10, (err,salt) =>{
					bcrypt.hash( newUser.password, salt, (err,hash)=>{
						if(err)throw err;
						newUser.password=hash;//set the password to hash password.
						//save user
						newUser.save()
						.then(user => {
							req.flash(
								'success_msg',
								'Registeration Successfull'
							);
							res.redirect("/users/login");
						})//handle the promise
							.catch(err=>console.log(err));
					});
				});
			}
		});
	}
});

//Login Handling
//Note if u get Unknown local strategy u may have not required passport in your app.js
//refer this https://stackoverflow.com/questions/41585947/passport-unknown-authentication-strategy-local
router.post('/login',(req,res,next)=>{
	passport.authenticate('local',{
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash:true
	})(req,res,next);
});


//Logout Handling
router.get('/logout',(req,res)=>{
	req.logout();//.logout is passport middleware built in function
	req.flash('success_msg','You are Logged Out');
	res.redirect('/users/login');
});
module.exports= router;





