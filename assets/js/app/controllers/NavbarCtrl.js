
angular.module('fargo')

  .controller('NavbarCtrl', function($scope, $state, Auth) {

    $scope.isCollapsed = false;
    $scope.isAuthenticated = !!Auth.user;
    $scope.currentUser = Auth.user;
    $scope.data = {};

    $scope.login = function() {
      Auth.login($scope.data.username, $scope.data.password)
        .then(function(user) {
          $scope.data = {};
          $scope.currentUser = user;
          $scope.isAuthenticated = true;
          $state.go('dashboard');
        });
    };

    $scope.logout = function() {
      Auth.logout().then(function() {
        delete $scope.currentUser;
        $scope.isAuthenticated = false;
        $state.go('home');
      });
    };
  });
