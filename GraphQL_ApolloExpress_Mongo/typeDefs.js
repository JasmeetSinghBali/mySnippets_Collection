const { gql } = require('apollo-server-express');

// type definations for Apollo Graphql Server

const typeDefs = gql`

  type Product{
    id: ID
    name: String
    price : Int
  }
  type Query{
    hello: String

    getAllProducts:[Product]

    getSingleProduct(id: ID): Product
  }

  input ProductInput{
    name: String
    price: Int
  }

  type Mutation {
    createProduct(product: ProductInput): Product
    deleteProduct(id:ID): String
    updateProduct(id: ID, product: ProductInput) : Product
  }
`

module.exports = typeDefs;
