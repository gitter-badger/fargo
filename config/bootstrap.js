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

  var arr = [];

  //arr.push(Location.import);
  //arr.push(Commodity.import);
  //
  //arr.push(function createUsers(cb) {
  //  User.create([{
  //    firstName: 'Captain',
  //    lastName:  'Biff',
  //    username:  'biff',
  //    email:     'captain@biff.no',
  //    password:  'admin',
  //    role:      'admin'
  //  }, {
  //    firstName: 'Akay',
  //    lastName:  'Akbiyik',
  //    username:  'akay',
  //    email:     'akay@akbiyik.tr',
  //    password:  'admin',
  //    role:      'admin'
  //  }, {
  //    firstName: 'Creasey',
  //    lastName:  'Bear',
  //    username:  'cbear',
  //    email:     'creasey@bear.com',
  //    password:  'admin',
  //    role:      'user'
  //  }], cb);
  //});
  //
  //arr.push(function createClients(cb) {
  //  Client.create([{
  //    name: 'West Norway AS'
  //  }, {
  //    name: 'Møre Codfish AS'
  //  }, {
  //    name: 'Hoel Transport AS',
  //    role: 'trucking'
  //  }, {
  //    name: 'Hapag Lloyd',
  //    role: 'shipping'
  //  }, {
  //    name: 'Hevold Shipping AS',
  //    role: 'shipping'
  //  }, {
  //    name: 'Enger Transport AS',
  //    role: 'containerTrucking'
  //  }, {
  //    name: 'Rolls Royce',
  //    role: 'producer'
  //  }, {
  //    name: 'Brødrene Sperre',
  //    role: 'producer'
  //  }, {
  //    name: 'Fjordlaks',
  //    role: 'producer'
  //  }, {
  //    name: 'Gustav Stokke',
  //    role: 'producer'
  //  }], cb);
  //});

  async.parallel(arr, cb);
};
