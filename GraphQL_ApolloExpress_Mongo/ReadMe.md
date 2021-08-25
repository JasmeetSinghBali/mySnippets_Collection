# GraphQL + Apollo_Express + MongoDB API

#### 1.) apollo -> used to bind the graphql client & server and validate schema,linting operations compatibility with server and generating static types for improved client side type.

****Sources-> https://www.npmjs.com/package/apollo ****

#### 2.) apollo-server-express -> Integeration of Express and Apollo(GraphQL server).

****Sources-> https://www.npmjs.com/package/apollo-server-express****


### To run MongoDB locally(Windows), first install  https://www.mongodb.com/try/download/community

            navigate to C:\Program Files\MongoDB\Server\5.0\bin

            # to enter the mongo terminal
            mongo

            # to show databases
            show dbs

## CRUD GraphQL (Product)

      Get All Products in DB
      -----------------------
      query  {
      getAllProducts {
      id
      name
      }
      }

      Create new product
      ------------------
      mutation{
      createProduct(product:{
      name: "GRT-3012"
      price: 1000
      }){
      id
      name
      price
      }
      }

      Get Single Product By ID
      -------------------------
      query  {
      getSingleProduct(id: "6126379a0e8e5e820c65e975" ) {
      id
      name
      price
      }
      }

      Delete product by ID
      ------------------
      mutation{
        deleteProduct(id: "6126376e0e8e5e820c65e972" )
      }

      Update product by ID
      ------------------
      mutation{
        updateProduct(id:"6126379a0e8e5e820c65e975",product:{
          name: "nameUpdated"
          price: 0
        }) {
          id
          name
          price
        }
      }
