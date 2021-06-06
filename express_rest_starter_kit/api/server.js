import express from 'express';
import { API_PORT } from './config';

const app=express();
import routes from './routes';

app.use('/api',routes);

app.listen(API_PORT,process.env.IP,()=>{
  console.log(`Server Started At ${API_PORT}`)
})
