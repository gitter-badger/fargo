/**
 * BookingController
 *
 * @description :: Server-side logic for managing Bookings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var blueprints = require('../services/blueprints');


module.exports = {

  findOne: blueprints.findOneWith([
    'requestedBy',
    'customer',
    'destination',
    'origin',
    'cargos',
    'cargos.producer',
    'cargos.commodity'
  ]),

  create: function createBooking(req, res) {

    var data = actionUtil.parseValues(req);

    Booking.create(data).exec(function created (err, booking) {
      if (err) return res.negotiate(err);

      Log.create({
        booking: booking.id,
        author:  req.user,
        action:  Log.actions.bookingCreated
      }, function(err, log) {
        if(err) {
          // rollback on error
          Booking.destroy(booking.id, function() {
            return res.serverError(err);
          });
        }
        if (req._sails.hooks.pubsub) {
          if (req.isSocket) {
            Booking.subscribe(req, booking);
            Booking.introduce(booking);
            Log.subscribe(req, log);
            Log.introduce(log);
          }
          // todo resolve 'Model.subscribe()' warning raised here
          Log.publishCreate(log);
          Booking.publishCreate(booking);
        }
        res.status(201);
        res.ok(booking.toJSON());
      });
    });
  }
};
