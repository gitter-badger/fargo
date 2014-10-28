/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  async.series([

    function(cb) {
      User.create([{
        firstName: 'Captain',
        lastName:  'Biff',
        username:  'biff',
        email:     'captain@biff.no',
        password:  'admin',
        role:      'admin'
      }, {
        firstName: 'Akay',
        lastName:  'Akbiyik',
        username:  'akay',
        email:     'akay@akbiyik.tr',
        password:  'admin',
        role:      'admin'
      }, {
        firstName: 'Creasey',
        lastName:  'Bear',
        username:  'cbear',
        email:     'creasey@bear.com',
        password:  'admin',
        role:      'user'
      }], cb);
    },

    function(cb) {
      Client.create([{
        name: 'Goat Inc'
      }, {
        name: 'Hapag Lloyd',
        labels: [{label: 'shipper'}]
      }], cb);
    }
  ],cb);
};
