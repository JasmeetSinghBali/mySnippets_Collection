//Validation
const Joi=require('@hapi/joi');

//register Validation
const registerValidation=(data)=>{

  const schema={
    name: Joi.string().min(6).required(),
    email:Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required()
  }
  return Joi.validate(data,schema);
}

//Login Validation
const loginValidation=(data)=>{
  const schema={
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
  }
  return Joi.validate(data,schema);
}



module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;
