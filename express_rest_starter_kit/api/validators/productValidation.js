import Joi from 'joi';

// client side validation for new product form data with image
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  image:Joi.string()
});

export default productSchema;
