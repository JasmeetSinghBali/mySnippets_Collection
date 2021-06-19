import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import {IMAGE_DATABASE_DOMAIN_URL} from '../config';

const productSchema =new Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true,
    get:(image)=>{
      // getter function on the document is automatically called when this record is accessed i.e this is requested by some source by the sppecific url
      // this adds domain url where the image is stored in default case
      // it will be http://localhost:5000 and this is a env variable
      return `${IMAGE_DATABASE_DOMAIN_URL}${image}`;
    }
  }
},{timestamps:true,toJSON:{getters:true},id:false});

export default mongoose.model('Product',productSchema,'products');
