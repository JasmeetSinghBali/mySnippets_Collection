import CustomErrorhandler from '../../services/CustomErrorHandler';
import User from '../../models/user';

const whoamiController={
  async me(req,res,next){
    try{
      const user= await User.findOne({_id:req.user._id});
      if(!user){
        return next(CustomErrorHandler.notFound());
      }
      res.json(user);
    }catch(err){
      return next(err);
    }
  }
};

export default whoamiController;
