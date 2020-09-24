const express=require('express'),
	  app=express(),
	  expressLayouts=require('express-ejs-layouts'),
	  mongoose=require('mongoose'),
	  flash=require('connect-flash'),//to flash messages after redirecting that messages need to be stored in the session note that flashing messages on the form page we were just rendering it but then flashing messages after redirecting is entirely different scenario for this we need the sessions functionality.
	  session=require('express-session'),//for creation of session
	  passport=require('passport'),
	  PORT=process.env.PORT || 3000;

//Passport Config
require('./config/passport')(passport);


//MongoDB Config
const db=require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true })
	.then(() => console.log('MongoDB Connected..'))//handling a promise
	.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine","ejs");

//BodyParser enabling the express body parser so that we can get data via
//req.body
app.use(express.urlencoded({extended: false}));

//Express Session
//for how to config it use docs 
//https://www.npmjs.com/package/express-session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);

//passport
app.use(passport.initialize());
app.use(passport.session());



//Connect Flash
app.use(flash());//with this we now have acess to req.flash

//our self defined MIDDLEWARE with Global vars acessing that and for flashing different coloured messages . 
app.use(function(req,res,next){
		res.locals.success_msg=req.flash('success_msg');//setting local variables a/c to ur req so that it is accesible .
		//here sucess_msg is the variable u are trying to set as global.
		res.locals.error_msg=req.flash('error_msg');
		res.locals.error=req.flash('error');//for passport i.e login authentication flash message.
		next();//after doing all the stuff in the middle ware who and where to give the control to.
});

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


app.listen(PORT,process.env.IP,console.log(`Server Started on Port ${PORT}`));
