var User = require('../models/user'),
    passport = require('passport'),
    newUserView = require('../config/passport')
    // flash = require('connect-flash')

// function home(req, res) {
//   // if current user, show current user
// }

// function newUser (req, res) {
//   res.render('users/new')
// }
function index(req, res) {
    res.render('users/index')
}

// GET /signup
function getSignup(req, res) {
  res.render('users/authentication/signup', {message: req.flash('signupMessage')})
}

function createUser(req, res) {
    // var id = new User(req.body)
    //
    //

    passport.authenticate('local-signup', function(err, newUser) {
      if (err) {
        throw err
      }
      if (!newUser) {
        res.redirect('/users/signup')
      }
      req.login(newUser, function(err) {
        if(err) {
          throw err
        }
        res.redirect('/users/' + newUser._id)
      })
    })(req, res)

    // var signupStrategy = passport.authenticate('local-signup', {
    //     successRedirect: '/users/' + newUser._id,
    //     failureRedirect: '/users/signup',
    //     failureFlash: true
    // })
    // return signupStrategy(req, res)
}

function getLogin(req, res) {
    res.render('users/authentication/login.ejs', {
        message: req.flash('loginMessage')
    });
}

function postLogin(req, res) {
    var loginProperty = passport.authenticate('local-login', {
        successRedirect: '/users',
        failureRedirect: '/users/login',
        failureFlash: true
    });

    return loginProperty(req, res);
}

function getLogout(req, res) {
  req.logout();
  res.redirect('/');
}

function showUser(req, res) {
  var id = req.params.id
  user = User.findById(id, function(err, user){
    if (err) throw err
    res.render('./users/show', {user: user})
  });
}

function editUser(req, res) {
  var id = req.params.id
  User.findById({_id: id}, function(err, user) {
    if (err) throw err
    res.render('./edit',
    {
      message: req.flash('#'),
      user: user
    })
  })
}

// function updateUser(req, res) {
//     var id = req.params.id
//
//     user = User.findById(id, function(err, user) {
//         if (err || !user) throw err
//         //need to actually update inputs (based on form ejs)
//         user.save(function(err, updatedUser) {
//             if (err) throw err
//
//             res.json(updatedUser)
//         })
//     })
// }

function updateUser(request, response) {
  var id = request.params.id
  console.log(user)

  User.findById({_id: id}, function(error, user){
    if(error) response.json({message: 'could not find user b/c' + error})

    if(request.body.username) user.username = request.body.username
    // if(request.body.local.email) user.local.email = request.body.local.email
    // if(request.body.local.password) user.local.password = request.body.local.password
    if(request.body.state) user.state = request.body.state
    if(request.body.zip) user.zip = request.body.zip

    user.save(function(error){
      if(error) response.json({message: 'could not update'})
      response.json({message: 'user successfully updated'})
    })
  })
}


function destroyUser(req, res) {
    var id = req.params.id

    User.remove({
        _id: id
    }, function(err) {
        if (err) throw err
        res.json({
            message: 'User successfuly deleted!'
        })
    })
}


module.exports = {
  index: index,
  createUser: createUser,
  showUser: showUser,
  editUser: editUser,
  updateUser: updateUser,
  destroyUser: destroyUser,
  getSignup: getSignup,
  getLogin: getLogin,
  postLogin: postLogin
}
