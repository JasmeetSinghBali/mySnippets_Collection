import {Product} from '../models';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import CustomErrorHandler from '../services/CustomErrorHandler';
import Joi from 'joi';

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
      // client side validation for new product form data with image
      const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
      });
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
  }
}

export default productController;
