/**
 * SessionsController
 *
 */
var passport = require('passport');

module.exports = {

  login: function(req, res, next) {
    var user;
    async.series([
      function(cb) {
        passport.authenticate('local', function(err, user_, info) {
          if(err) return cb(err);
          if(!user_) return res.status(422).send({message: info.message});
          user = user_;
          cb();
        })(req, res, next);
      },
      function(cb) {
        req.login(user, cb);
      }
    ], function(err) {
      if(err) return res.serverError(err);

      res.ok(user.toJSON());
    });
  },

  logout: function(req, res) {
    req.logout();
    res.ok();
  }
};
