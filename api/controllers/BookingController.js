/**
 * BookingController
 *
 * @description :: Server-side logic for managing Bookings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var findOnePopulated = require('../services/findOnePopulated');

module.exports = {

  // TODO: remove this when sails supports nested associations
  'findOne': findOnePopulated
};

