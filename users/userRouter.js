const express = require('express');

const userDb = require('./userDb');

const router = express.Router();


router.post('/', (req, res) => {
  userDb.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
    })
});

router.post('/:id/posts', validateUserId(), (req, res) => {
  userDb.insert(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    console.log(error);
  })
});

router.get('/', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  userDb.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
  })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  userDb.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  userDb.remove(req.params.id)
  .then(remove => {
    res.status(200).json(remove)
  })
});

router.put('/:id', validateUserId(), (req, res) => {
  userDb.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    userDb
      .getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
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

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
