/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 30
    },

    username: {
      type: 'string',
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30
    },

    email:{
      type: 'email',
      required: true,
      unique: true
    },

    password:{
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 50
    },

    keys: {
      collection: 'key',
      via: 'owner'
    },

    validatePassword: function (password) {
      return bcrypt.compareSync(password, this.password);
    },

    toJSON: function() {
      var obj = this.toObject();
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
    if(attrs.newPassword){
      bcrypt.hash(attrs.newPassword, sails.config.saltWorkFactor, function(err,  hash) {
        if (err) return cb(err);

        delete attrs.newPassword;
        attrs.password = hash;
        cb();
      });
    } else {
      return cb();
    }
  }
};