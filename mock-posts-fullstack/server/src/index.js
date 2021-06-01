const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Routes
// const Posts = require('./api/posts');
// const Views = require('./api/views');
// const Search = require('./api/search');

const middlewares = require('./middlewares');

// connecting to MongDB
mongoose.connect(process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('------MongoDB Connected-----'))
  .catch((err) => console.log(err));

app.use(morgan('combined'));

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.json(
    {
      message: 'Hello Sweety!',
    },
  );
});

// Routes
// app.use('/api/posts',Logs); for CUD posts
// app.use('/api/show',FlaggedUser); for liked and unliked posts
// app.use('/api/search',SearchTerm);
// a route to filter/Read out the posts by the query that was entered in search bar

// not found middleware if the route requested by the user do not exist.
app.use(middlewares.notFound);

// Actual error handler for generalized error if request to routed url cause some error.
app.use(middlewares.errorHandler);

app.listen(PORT, process.env.IP, () => {
  console.log(`Server Started at Port: ${PORT}`);
});
