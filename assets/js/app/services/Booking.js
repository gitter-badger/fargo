

angular.module('fargo')

  .factory('Booking', function(Restangular) {

    return Restangular.all('bookings');
  });
