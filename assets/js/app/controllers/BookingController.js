
angular.module('fargo')

  .controller('BookingController', function ($scope, Booking, Client, User, dataService) {

    $scope.booking = {};

    $scope.lookupCustomers = function(term) {
      return Client.findByTerm(term);
    };

    $scope.lookupPorts = function (term) {
      return dataService.findPortsByTerm(term);
    };

    $scope.lookupUsers = function(term) {
      return User.findByTerm(term);
    };

    $scope.submit = function() {
      var booking = angular.copy($scope.booking);
      booking.customer    = booking.customer.id;
      booking.requestedBy = booking.requestedBy.id;

      Booking.post(booking).then(function(res) {
        console.log(res);
      });
    };
  });
