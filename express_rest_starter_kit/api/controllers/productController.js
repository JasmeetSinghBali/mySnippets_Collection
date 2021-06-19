import {Product} from '../models';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import CustomErrorHandler from '../services/CustomErrorHandler';
import Joi from 'joi';
import productSchema from '../validators/productValidation';

// multer base configuration
// cb is callback & null is for error
const storage=multer.diskStorage({
  destination: (req,file,cb) => cb(null,path.join(__dirname,'../uploads/')),
  filename: (req,file,cb) => {
    // 1E9 is a biliion like of random number
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    // uniqueName will be like 375377483-43873872.png/jpeg/jpg/gif
    cb(null,uniqueName);
  }
});

const handleMultipartData=multer({
  storage,
  limits:{
    fileSize:1000000 * 5
  }// 5 mb limit of filesize for 2 mb just change to * 2
}).single('image');

const productController={
  // ============= CREATE NEW PRODUCT ===============
  async store(req,res,next){
    //console.log(appRoot);
    // handling multipart-form-data like image
    handleMultipartData(req,res,async (err)=>{
      if(err){
        return next(CustomErrorHandler.serverError(err.message));
      }
      //console.log(req.file);
      //to grab image path
      const filePath = req.file.path;
      console.log(filePath.substr(94,));

      //validation
      const {error}=productSchema.validate(req.body);
      if(error){
        // delete the uploaded image in case the body data do not coply to the product model schema
        fs.unlink(`${appRoot}/${filePath.substr(94,)}`,(err)=>{
          if(err){
            // error in file system deletion
            return next(CustomErrorHandler.serverError(err.message));
          }
        });
        // appRoot=rootfolder
        // here appRoot is a global variable defined in server.js

        // error in validation JOI error
        return next(error);
      }

      // Store new product in DB
      const {name,price,quantity}=req.body;

      let document;
      try{
        document= await Product.create({
          name,// name:name
          price,// price:price
          quantity,// quantity:quantity
          image:filePath.substr(93,)
        });
      }catch(err){
        return next(err);
      }

      res.status(201).json(document);
    });
  },
  // =========== UPDATE EXISTING PRODUCT via product id=========
  update(req,res,next){
    handleMultipartData(req,res,async (err)=>{
      if(err){
        return next(CustomErrorHandler.serverError(err.message));
      }
      let filePath;
      if(req.file){
        filePath = req.file.path;
        console.log(filePath.substr(94,));
      }

      const {error}=productSchema.validate(req.body);
      if(error){
        // delete the uploaded image in case the body data do not coply to the product model schema
        if(req.file){
          fs.unlink(`${appRoot}/${filePath.substr(94,)}`,(err)=>{
            if(err){
              // error in file system deletion
              return next(CustomErrorHandler.serverError(err.message));
            }
          });
        }
        // appRoot=rootfolder
        // here appRoot is a global variable defined in server.js

        // error in validation JOI error
        return next(error);
      }

      // Store new product in DB
      const {name,price,quantity}=req.body;

      let document;
      try{
        document= await Product.findOneAndUpdate({_id:req.params.id},{
          name,// name:name
          price,// price:price
          quantity,// quantity:quantity
          ...(req.file && {image:filePath.substr(93,)})// checks wheather the req.body has the new image file if yes the it passes it to get stored in the DB
        },{new:true});
      }catch(err){
        return next(err);
      }

      res.status(200).json(document);
    });
  },
  // ================== DELETE product via product id ==================
  async remove(req,res,next){

    const document=await Product.findOneAndRemove({_id:req.params.id});
    if(!document){
      return next(new Error('Nothing To Delete'));
    }
    // delete the image from local storage /uploads
    // their is _doc which is original one i.e do not contains any getter function when we get the image key from the database
    const imagePath=document._doc.image;
    fs.unlink(`${appRoot}${imagePath}`,(err)=>{
      if(err){
        return next(CustomErrorHandler.serverError());
      }
    });

    // send the document that got deleted
    res.json(document);

  },
  async getall(req,res,next){
    let data;
    try{
      // use mongoose-pagination to avoid error from mongo if large amount of data.
      // -updatedAt '-' sign indicates that updatedAt and __v will not be included in the response
      data = await Product.find().select('-updatedAt -__v').sort({ _id: -1 }); // sort({_id}:-1) sorts documents with respect to id in descending order
      if(!data){
        return next(new Error('No Data Found!!'));
      }
    }catch(err){
      return next(CustomErrorHandler.serverError());
    }
    return res.json(data);
  },
  async getsingle(req,res,next){
    let data;
    try{
      data = await Product.findOne({_id:req.params.id}).select('-updatedAt -__v');
      if(!data){
        return next(new Error('No Data Found with this Product ID!!'));
      }
    }catch(err){
      return next(CustomErrorHandler.serverError());
    }
    return res.json(data);
  }
}

export default productController;
