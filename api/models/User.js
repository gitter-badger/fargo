/**
* User.js
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');
var auth   = require('../../common/authorisation');

module.exports = {
  schema: true,
  attributes: {
    firstName: {type: 'string', required: true, minLength: 3, maxLength: 30},
    lastName : {type: 'string', required: true, minLength: 3, maxLength: 30},
    username:  {type: 'string', required: true, unique: true, minLength: 3, maxLength: 30},
    email:     {type: 'email',  required: true, unique: true},
    password:  {type: 'string', required: true, minLength: 5, maxLength: 100, columnName: 'encrypted_password'},
    role:      {type: 'string', enum: auth.roles},

    hasPermission: function(permission) {
      return auth.checkAccess(this.role, permission);
    },

    validatePassword: function (password) {
      return bcrypt.compareSync(password, this.password);
    },

    toJSON: function() {
      var obj = this.toObject();
      obj.displayName = this.firstName + ' ' + this.lastName;
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function (attrs, cb) {
    bcrypt.hash(attrs.password, sails.config.saltWorkFactor, function (err, hash) {
      attrs.password = hash;
      return cb();
    });
  },

  beforeUpdate: function (attrs, cb) {
    if (attrs.newPassword) {
      bcrypt.hash(attrs.password, sails.config.saltWorkFactor, function (err, hash) {
        if (err) return cb(err);

        delete attrs.newPassword;
        attrs.password = hash;
        cb();
      });
    } else cb();
  }
};
