const express = require('express');
const api = express();
const router = require('./routes');

api.use(express.json());
api.use(router);

api.listen(5000,()=>{
    console.log('Server up at 5000...');
});