const express = require('express');

const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
  })
});

router.get('/:id', validatePostId(), (req, res) => {
  postDb.getById(req.params.id)
  .then(post => {
    res.status(200).json([post]);
  })
  .catch(error => {
    console.log(error);
  })
});

router.delete('/:id', validatePostId(), (req, res) => {
  postDb.remove(req.params.id)
  .then(remove => {
    res.status(200).json(remove);
  })
  .catch(error => {
    console.log(error);
  })
});

router.put('/:id', validatePostId(), (req, res) => {
  postDb.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(error => {
    console.log(error);
  })
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    postDb
      .getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(400).json({ message: "id does not exist" });
        }
      })
      .catch(err =>
        res.status(500).json({ message: "error getting user with this ID" })
      );
  };
}

module.exports = router;
