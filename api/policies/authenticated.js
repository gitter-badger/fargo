/**
 * authenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var passport = require('./passport');

module.exports = function(req, res, next) {
  passport(req, res, function() {
    // check against req.session.passport.user as req.isAuthenticated
    // is not available to the mock request sent over sockets
    if (req.user) {
      return next();
    }
    return res.unauthenticated();
  });
};
