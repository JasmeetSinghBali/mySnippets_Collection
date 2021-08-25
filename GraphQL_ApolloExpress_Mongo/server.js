const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// imporitn resolvers & typeDefs
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// mongoose config
const mongoose = require('mongoose');

// start apollo-express server
async function startServer(){
  const app = express();

  // apollo server config typeDef & resolver
  const apolloServer = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
  });

  await apolloServer.start();

  // this takes /graphql as the default route for the api
  // specifying path as /myapi now is handled by apollo server middleware
  apolloServer.applyMiddleware({app:app,path:'/myapi'});

  // using middleware to handle other routes excluding /graphql default route which is handled by the above line apollo server middleware
  app.use((req,res)=>{
    res.send('✔ Response from express-apollo server!!')
  });

  // connect to database
  await mongoose.connect('mongodb://localhost:27017/product_db',{
    useUnifiedTopology:true,
    useNewUrlParser:true
  });
  console.log('Connected to localhost MongoDB via mongoose..');

  app.listen(5000,()=>console.log("Server started at 5000"));
}
startServer();
