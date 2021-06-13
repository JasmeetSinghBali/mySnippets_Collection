import Joi from 'joi';
import {User,RefreshToken} from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JWTService from '../../services/JWTService';
import {REFRESH_SECRET} from '../../config';

const loginController={
  async login(req,res,next){
    // validate request
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9&#@!%$*]{8,40}$'))
    });
    const {error}=loginSchema.validate(req.body);

    if(error){
      return next(error);
    }

    // check email present in DB
    try{
      const user= await User.findOne({email:req.body.email});
      if(!user){
        return next(CustomErrorHandler.invalidCredentials());
      }
      // if user exists check password
      const match=await bcrypt.compare(req.body.password, user.password);

      if(!match){
        return next(CustomErrorHandler.invalidCredentials());
      }

      // Token
      const access_token = JWTService.sign({_id:user._id,role:user.role});

      const refresh_token = JWTService.sign({_id:user._id,role:user.role},'1d',REFRESH_SECRET);

      // whitelist the refreshtoken in the DB
      await RefreshToken.create({token:refresh_token});

      // send access and refresh tokens to client
      res.json(
        {
          access_token,
          refresh_token
        }
      );

    }catch(err){
      return next(err);
    }
  },
  // logging Out User

  async logout(req,res,next){

    // validate request
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required()
    });
    const {error}=refreshSchema.validate(req.body);

    if(error){
      return next(error);
    }
    try{
      await RefreshToken.deleteOne({token:req.body.refresh_token});

    }catch(err){
      return next(new Error('Something Went Wrong in the DB'+err.message));
    }
    res.json({
      status:'User Logged Out, refresh token removed!!'
    })
  }
};

export default loginController;
