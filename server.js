const express = require('express');

const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use(logger);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/users', userRouter);

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl}`); // Add timestamp
  next();
}

module.exports = server;
