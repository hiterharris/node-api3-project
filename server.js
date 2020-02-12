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
  req.time = Date.now();
  console.log(`${req.method} request to ${req.originalUrl} at ${req.time}`);
  next();
}

module.exports = server;
