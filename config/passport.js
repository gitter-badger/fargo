var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findOne(id, function (err, user) {
    cb(err, user);
  });
});

passport.use(new LocalStrategy(function (username, password, cb) {
  User.findOne({
    or: [
      {email: username},
      {username: username}
    ]
  }, function (err, user) {
    if (err) return cb(err);
    if (user === undefined) return cb(null, null, {message: 'Unknown credentials'});

    user.validatePassword(password) ? cb(null, user) : cb(null, false, { message: 'Invalid password' });
  });
}));
