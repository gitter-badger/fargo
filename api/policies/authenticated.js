/**
 * authenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller

  if (req.isAuthenticated()) {
    return next();
  }

  // User is not allowed
  // use custom response as sails does not provide method for unathenticated errors
  return res.unauthenticated();
};