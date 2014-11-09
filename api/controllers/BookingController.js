/**
 * BookingController
 *
 * @description :: Server-side logic for managing Bookings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var blueprints = require('../services/blueprints');

module.exports = {

  // TODO: remove this when sails supports nested populate
  'findOne':  blueprints.findOne,
  'populate': blueprints.populate
};
