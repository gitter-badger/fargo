
angular.module('fargo')

  .controller('BookingViewController', function ($scope, $state, Booking, Cargo, booking) {

    $scope.booking = booking;
  });
