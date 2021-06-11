class CustomErrorHandler extends Error{
  constructor(status,msg){
    this.status = status;
    this.message= msg;

  }
  // static methods can be called without creating a instance of class
  static useralreadyExist(message){
    // this method will be returning the object of this class
    return new CustomErrorHandler(409,message);

  }
}

export default CustomErrorHandler;
