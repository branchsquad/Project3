var express = require('express'),
    router = new express.Router()


function authenticateUser(req, res, next) {
    // If the user is authenticated, then we continue the execution
    if (req.isAuthenticated()) return next();

    // Otherwise the request is always redirected to the home page
    res.redirect('/');
  }

// router.route("/secret")
//   .get(authenticateUser, usersController.secret)
//use this for edit page?

module.exports = {
  authenticateUser: authenticateUser
}
