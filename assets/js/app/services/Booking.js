
angular.module('fargo')

  .factory('Booking', function(restmod) {

    return restmod.model('/bookings').mix({
      cargos:     {hasMany: 'Cargo'},
      transfers:  {hasMany: 'Transfer'},
      containers: {hasMany: 'Container'}
    });
  });
