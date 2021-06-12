import {JWT_SECRET} from '../config';
import jwt from 'jsonwebtoken';

class JWTService{
  // Sign token
  static sign(payload,expiry = '60s', secret=JWT_SECRET)
  {
    return jwt.sign(
      payload,
      secret,
      {
        expiresIn:expiry
      }
    );
  }
  // verify token
  static verify(token, secret=JWT_SECRET)
  {
    return jwt.verify(
      token,
      secret
    );
  }
}

export default JWTService;
