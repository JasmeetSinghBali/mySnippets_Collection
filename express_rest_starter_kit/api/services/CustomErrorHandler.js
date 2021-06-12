class CustomErrorHandler extends Error{
  constructor(status,msg){
    super();
    this.status = status;
    this.message= msg;

  }
  // static methods can be called without creating a instance of class
  static useralreadyExist(message){
    // this method will be returning the object of this class
    return new CustomErrorHandler(409,message);

  }

  // no email found
  static invalidCredentials(message='Username or password is wrong!'){
    // this method will be returning the object of this class
    return new CustomErrorHandler(401,message);

  }
  // unauthorized when no Authorization header
  static unAuthorized(message='You Shall Not Pass!!'){
    // this method will be returning the object of this class
    return new CustomErrorHandler(401,message);

  }

  // User not found
  static notFound(message='404 Not Found'){
    // this method will be returning the object of this class
    return new CustomErrorHandler(404,message);

  }
}

export default CustomErrorHandler;
