/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');

module.exports = {

  'login': function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if(err)
        return next(err);
      if(!user)
        return res.status(422).send({message: info.message});
      req.login(user, function(err) {
        if(req.body.rememberme) {
          req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7 * 52;
        }
        err ? next(err) : res.status(200).send(req.user.toJSON());
      });
    })(req, res, next);
  },

  'logout': function(req, res) {
    req.logout();
    res.status(200).end();
  }
};