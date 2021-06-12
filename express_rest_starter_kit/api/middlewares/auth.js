import CustomErrorHandler from '../services/CustomErrorHandler';
import JWTService from '../services/JWTService';

const auth = async (req,res,next)=>{
  let auth_header = req.headers.authorization;
  
  if(!auth_header){
    return next(CustomErrorHandler.unAuthorized());
  }
  // extract the access_token from client header request
  const token = auth_header.split(' ');
  // access token[1] to grab token
  try{
    // grab id from JWT token service
    const {_id,role} = await JWTService.verify(token[1]);
    const user={
      _id,
      role
    }

    req.user=user;

    // pass control back to whoamiController
    next();

  }catch(err){
    return next(CustomErrorHandler.unAuthorized());
  }

}

export default auth;
