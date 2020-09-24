module.exports={
	ensureAuthenticated:function(req,res,next){
		//.isAuthenticated() is a built in function of passport to check wheather the user is still logged in.
		if(req.isAuthenticated()){
			return next();
			
		}
		else{
			req.flash('error_msg','Please Log In to View Dashboard');
			res.redirect('/users/login');
		}
	}
}