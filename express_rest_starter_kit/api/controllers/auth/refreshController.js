import Joi from 'joi';
import {RefreshToken,User} from '../../models';
import {REFRESH_SECRET} from '../../config';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JWTService from '../../services/JWTService';

const refreshController={
  async refresh(req,res,next){
    // validate request
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required()
    });
    const {error}=refreshSchema.validate(req.body);

    if(error){
      return next(error);
    }

    // check refresh token available in database
    let refreshtoken;
    try{
      refreshtoken=await RefreshToken.findOne({ token: req.body.refresh_token});

      // check token has been revoked or user logged out
      if(!refreshtoken){
        return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
      }
      let userID;
      // verify the refresh token obtained from body
      try{
        const {_id} = await JWTService.verify(req.body.refresh_token,REFRESH_SECRET);
        userID=_id;
      }catch(err){
        return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
      }

      // check that the userID is present in
      const user = await User.findOne({_id:userID});
      if(!user){
        return next(CustomErrorHandler.unAuthorized('Refresh token Not Acceptable, No User Was Found in the DB'));
      }

      //generate new access and refresh token if every previos check passes
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
      return next(err.message);
    }
  }
};

export default refreshController;
