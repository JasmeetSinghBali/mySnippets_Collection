const express=require('express'),
	  app=express(),
	  bodyParser=require('body-parser'),
	  qr=require("qrcode");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended:false }));	
app.use(bodyParser.json());

app.get("/",(req,res)=>{
	res.render("index");
});

app.post("/scan",(req,res)=>{
	const url=req.body.url;
	
	if(url.length ===0){
		res.send("Cannot Generate...");
		
	}
	qr.toDataURL(url,{ errorCorrectionLevel: 'L' }, (err,src)=>{
		if(err){
			res.send("Error Occured");
			
		}else{
			//console.log(src);
			res.render("scan",{ src});
		}
	});
});


app.listen(3000,process.env.IP,()=>{
	console.log("Server Started...");
});