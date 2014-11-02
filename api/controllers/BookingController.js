/**
 * BookingController
 *
 * @description :: Server-side logic for managing Bookings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // TODO:
  // remove this when sails supports nested associations
  'findOne': function(req, res) {
    async.auto({
      booking: function(cb) {
        Booking.
          findOne(req.param('id'))
          .populateAll()
          .exec(function(err, booking) {
            if(err) return cb(err);
            if(!booking) return res.notFound('No record found with the specified `id`.');

            cb(null, booking);
          });
      },
      commodities: ['booking', function(cb, data) {
        Commodity.find({id: _.pluck(data.booking.cargos, 'commodity')}).exec(cb);
      }],
      producers:   ['booking', function(cb, data) {
        Client.find({id: _.pluck(data.booking.cargos, 'producer')}).exec(cb);
      }],
      response:    ['commodities', 'producers', function(cb, data) {
        var commodities = _.indexBy(data.commodities, 'id');
        var producers = _.indexBy(data.producers, 'id');

        data.booking.cargos = data.booking.cargos.map(function(cargo) {
          cargo.producer  = producers[cargo.producer].toJSON();
          cargo.commodity = commodities[cargo.commodity].toJSON();
          return cargo;
        });
        cb(null, data.booking);
      }]
    }, function(err, data) {
      if (err) return res.serverError(err);

      res.json(data.response);
    });
  }
};

