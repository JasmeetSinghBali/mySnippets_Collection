const Product = require('./models/Product.model');

// query resolver for our Apollo Server
const resolvers = {
  Query:{
    hello:()=>{
      return "Hello World";
    },
    getAllProducts:async()=>{
      const product = await Product.find();
      return product;
    },

    // args.id we destructured {id} in this resolver params
    getSingleProduct:async(parent,{ id },context,info)=>{
      return await Product.findById(id);
    }

  },
  Mutation:{
    createProduct:async(parent,args,context,info)=>{
      const {name,price} = args.product;
      const product = new Product({name,price});
      await product.save();
      return product;
    },
    deleteProduct:async(parent,{id},context,info)=>{
      await Product.findByIdAndDelete(id);
      return 'Product Deleted';
    },
    updateProduct:async(parent,args,context,info)=>{
      const {name,price} = args.product;

      // a seprate object holder for updatesto make sure if user selectively updates some parameters then this do not results in null being stored for the params which are not updated by the user
      // this way for the params the user has not mentioned anything will presist its past state
      const updates = {}
      if(name !== undefined){
        updates.name=name
      }
      if(price !== undefined){
        updates.price=price
      }

      return await Product.findByIdAndUpdate(args.id,updates,{new:true});
    }
  }
};

module.exports = resolvers;
