const router =require('express').Router(),
      express=require("express"),
      app=express(),
      verify =require('./verifytoken'),
      bodyParser=require("body-parser");

app.set('view engine','ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//to show form to add new patient
router.get("/newpatient",(req,res)=>{
  res.render("../views/patient/new");
});

module.exports=router;
