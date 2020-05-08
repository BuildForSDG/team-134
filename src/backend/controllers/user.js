
const bcrypt = require('bcrypt');

const User = require('../models/User');

const signup = (req, res, next) => {
  const { email, username, password } = req.body; // user attributes from request body

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      // new user details
      const user = new User({
        email,
        username,
        password: hash
      });
      // attempt to save user in database
      user
        .save()
        // response returned after successfully saving user in database
        .then(() => res.status(201).json({ code: 201, message: 'user successfully created' }))
        .catch((err) => {
          // in case of any error when saving user in database
          // we channel the error to the error handler in app.js
          next(err);
        });
    })
    .catch((error) => {
      // if an error is encountered hashing the password
      // we channel the error to the error handler in app.js
      next(error);
    });
};

module.exports = {
  signup
};
