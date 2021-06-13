import Joi from 'joi';
import {User,RefreshToken} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JWTService from '../../services/JWTService';
import {REFRESH_SECRET} from '../../config';

const registerController={
  async register(req,res,next){
    // register logic

    // validate request
    const registerSchema= Joi.object({
      name: Joi.string().min(4).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9&#@!%$*]{8,40}$')),
      repeat_password: Joi.ref('password')
    });

    console.log(req.body);
    const {error}= registerSchema.validate(req.body);
    // pass it to the general error handler
    if(error){
      return next(error);
    }

    // Prevent Duplicated Email
    try{
      const existEmail= await User.exists({email:req.body.email});
      if(existEmail){
        // pass to the custom error handler service
        return next(CustomErrorHandler.useralreadyExist('This Email Is Already Taken'));
      }
    }catch(err){
      return next(err);
    }

    const {name,email,password}=req.body;
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // make new user & add to DB
    const user= new User({
      name,
      email,
      password: hashedPassword
    })
    let access_token;
    let refresh_token;
    try{
      const result = await user.save();
      console.log(result);
      // Pass the Control to create JWT Token/Sign/verify Services
      access_token = JWTService.sign({_id:result._id,role:result.role});

      // use d/f key for refresh_token and set expiry for longer period
      refresh_token = JWTService.sign({_id:result._id,role:result.role},'1d',REFRESH_SECRET);

      // whitelist the refreshtoken in the DB
      await RefreshToken.create({token:refresh_token});

    }catch(err){
      return next(err);
    }

    return res.json({
      access_token:access_token,
      refresh_token:refresh_token
    });
  }
}

export default registerController;
