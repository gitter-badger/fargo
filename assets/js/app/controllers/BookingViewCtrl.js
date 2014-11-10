
angular.module('fargo')

  .controller('BookingViewCtrl', function ($scope, $state, Booking, Cargo, booking) {

    $scope.booking = booking;
  });
