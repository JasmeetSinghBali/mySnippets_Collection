const express=require('express'),
	  router=express.Router(),//.Router is the class that is capable of handling the Routes along with the validation like 404 error and stuff like that...
	  {ensureAuthenticated}=require('../config/auth');
	

//Welcome  Page
router.get('/',(req,res) => res.render('welcome'));

//Dashboard
router.get('/dashboard',ensureAuthenticated, (req,res)=>res.render('dashboard',{
	name:req.user.name
}));
	

module.exports = router;