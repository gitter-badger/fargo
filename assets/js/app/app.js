'use strict';

angular.module('fargo', [
  'fargo.bootstrap',
  'fargo.flash',
  'fargo.transports',
  'ngCookies',
  'restangular',
  'restmod',
  'ui.bootstrap',
  'ui.router'
])
  .run(function($rootScope, $state, Auth) {

    $rootScope.$on('$stateChangeStart', function (e, toState) {
      // make transition-to state available to state resolves/onEnter
      $state.toState = toState;

      // authorize access
      if (!Auth.authorize(toState.data && toState.data.permission)) {
        e.preventDefault();
        $state.go('error', {status: Auth.user ? 403 : 401}, {location: false});
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {

      if (toState.data) {
        toState.data.title && ($rootScope.title = toState.data.title);
      }
    });
  })


.controller('DevCtrl', function($scope) {

  $scope.cargo = [{
    id: 1,
    quantity: 1000,
    commodity: {
      code: '0303',
      description: 'Frozen Fish'
    },
    description: 'Codfish',
    producer: {
      id: 1,
      name: 'Sven Transport AS'
    }
  }, {
    id: 2,
    quantity: 21,
    commodity: {
      code: '1770',
      description: 'Motor vehicles'
    },
    description: 'General Motorcar',
    producer: {
      id: 2,
      name: 'Rolls Royce'
    }
  }, {
    id: 3,
    quantity: 2150,
    commodity: {
      code: '2995',
      description: 'Computer hardware'
    },
    description: 'Advanced Server System',
    producer: {
      id: 3,
      name: 'Blah Corporation'
    }
  }, {
    id: 4,
    quantity: 100,
    commodity: {
      code: '0390',
      description: 'High Res Jazz'
    },
    description: 'Retina iMac',
    producer: {
      id: 4,
      name: 'Oil Barons Inc'
    }
  }];

  $scope.containers = [{
    id: 1,
    number: 'HULLABALOO',
    type: '40HC',
    temperature: 3,
    cargos: [{
      id: 4,
      quantity: 44,
      commodity: {
        code: '0390',
        description: 'High Res Jazz'
      },
      description: 'Retina iMac',
      producer: {
        id: 4,
        name: 'Oil Barons Inc'
      }
    }]
  }, {
    id: 2,
    number: 'MR BEAR',
    type: '20SB',
    cargos: []
  }];

  $scope.trucks = [{
    id: 1,
    carrier: {
      name: 'Hoel Transport AS'
    },
    cargos: [{
      id: 4,
      quantity: 100,
      commodity: {
        code: '0390',
        description: 'High Res Jazz'
      },
      description: 'Retina iMac',
      producer: {
        id: 4,
        name: 'Oil Barons Inc'
      }
    }]
  }];
  $scope.truck = {
    cargos: []
  };

  $scope.fn = function() {
    return [
      {name: 'Hoel Transport'}
    ];
  };

  $scope.doSomething = function() {
    console.log('something is done!');
  };

  $scope.addTruck = function() {
    $scope.trucks.push($scope.truck);
    $scope.truck = {
      cargos: []
    };
  };

  $scope.meddle = function() {
    $scope.cargo[0].quantity += 1;
    // $scope.containers[0].cargos[0].quantity = 78;
  };
});
