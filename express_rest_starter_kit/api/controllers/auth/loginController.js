import Joi from 'joi';
import User from '../../models/user';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JWTService from '../../services/JWTService';

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

      // send token to client
      res.json({access_token});

    }catch(err){
      return next(err);
    }
  }
};

export default loginController;
