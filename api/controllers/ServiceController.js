/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');

module.exports = {

  ports: function(req, res) {
    /* jshint camelcase:false */
    request({
      url: 'http://www.fleetmon.com/api/p/personal-v1/porturl/',
      qs: {
        username: sails.config.fleetmon.username,
        q: req.param('term'),
        api_key: sails.config.fleetmon.apiKey,
        format: 'json'
      }
    }, function(err, response) {
      /* jshint camelcase:true */
      if(err) return next(err);

      var body = JSON.parse(response.body);
      res.status(200).json(body.objects);
    });
  }
};
