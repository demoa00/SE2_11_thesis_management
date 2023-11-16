'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local');

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

// Set up local strategy to verify, search in the DB a user with a matching password, 
// and retrieve its information (i.e., id, username, name).
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.createNewAuthenticatedSession(username, password).then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username and/or password.' });
      } else {
        User.getUserData(user).then((userData) => {
          return done(null, userData);
        }).catch(() => { return done(null, false, { message: 'Incorrect username and/or password.' }); });
      }
    })
  }
));

module.exports.createNewAuthenticatedSession = function createNewAuthenticatedSession(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      utils.writeJson(res, info, 400);
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      utils.writeJson(res, req.user, 201);
    });
  })(req, res, next);
};

module.exports.deleteAuthenticatedSession = function deleteAuthenticatedSession(req, res, next) {
  if (req.user.isStudent) {
    if (req.user.studentId === req.params.userId) {
      req.logOut(() => res.end());
    } else {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    }
  } else {
    if (req.user.professorId === req.params.userId) {
      req.logOut(() => res.end());
    } else {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    }
  }
};
