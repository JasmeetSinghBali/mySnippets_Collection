const express = require('express');

const { setupAuth } = require('./auth');
const { setupLogging } = require('./logger');
const { setupProxies } = require('./proxyRules');
const { ROUTES } = require('./routes');


const app = express();
const port = 3000;


setupLogging(app);
setupAuth(app,ROUTES);
setupProxies(app,ROUTES);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})