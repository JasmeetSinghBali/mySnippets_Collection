import express from 'express';
import { API_PORT, DB_URL } from './config';
import errorHandler from './middlewares/errorHandler';

const app=express();
import routes from './routes';
import mongoose from 'mongoose';

// Database connection
mongoose.connect(DB_URL,
 {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
 })
 .then(() => console.log('------MongoDB Connected-----'))
 .catch(err => console.log(err));



app.use(express.json());

app.use('/api',routes);



// General Error handler Middleware to be Placed just before the app.listen
app.use(errorHandler);

app.listen(API_PORT,process.env.IP,()=>{
  console.log(`Server Started At ${API_PORT}`)
})
