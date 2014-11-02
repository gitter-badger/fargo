
angular.module('fargo')

  .controller('BookingController', function ($scope, $state, Booking, Client, User, Location) {

    $scope.booking = {};

    $scope.lookupCustomers = function(term) {
      return Client.$searchByTerm(term).$asPromise();
    };

    $scope.lookupLocations = function (term) {
      return Location.$searchByTerm(term).$asPromise();
    };

    $scope.lookupUsers = function(term) {
      return User.$searchByTerm(term).$asPromise();
    };

    $scope.submit = function() {
      Booking.$create($scope.booking).$asPromise().then(function(booking) {
        $state.go('bookings.view', {id: booking.id});
      });
    };
  });
