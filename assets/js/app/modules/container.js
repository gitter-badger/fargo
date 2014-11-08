
angular.module('fargo.container', ['fargo.cargo'])

  .constant('containerTypes', [
    '40HC', '40SR', '20NB'
  ])

  .controller('ContainerController', function($scope, containerTypes) {
    var ctrl = this, loader, loaderCtrl;

    this.init = function(_loaderCtrl, _listCtrl) {
      loaderCtrl = _loaderCtrl;
      // enable destroy container functionality
      if(_listCtrl) {
        $scope.destroy = function() {
          loaderCtrl.destroyLoader(loader);
          _listCtrl.destroy($scope.container);
        };
      }
      // tell the loader to factor this container's cargo into
      // its quantity calculations - create a cargo array if not present
      if(!$scope.container.cargos) $scope.container.cargos = [];
      loader = loaderCtrl.createLoader($scope.container.cargos);
    };

    this.toggleSelected = function(item) {
      ctrl.selected = item === ctrl.selected ? undefined : item;
    };

    this.unloadCargo = function(item, value) {
      value = Number(value);
      if(!value || value >= item.quantity) {
        loader.unload(item);
        var index = $scope.container.cargos.indexOf(item);
        $scope.container.cargos.splice(index, 1);
      } else {
        loader.unload(item, value);
      }
    };

    $scope.containerTypes = containerTypes;

    $scope.loadCargo = function() {
      loader.load($scope.container.cargos);
    };

    $scope.loadPartialCargo = function(value) {
      loader.loadPartial($scope.container.cargos, value);
      $scope.toggleSplitAction();
    };

    $scope.toggleEdit = function() {
      if($scope.edit) {
        delete $scope.edit;
      } else {
        $scope.edit = angular.copy($scope.container);
      }
    };

    $scope.toggleSplitAction = function() {
      $scope.showSplitAction = !$scope.showSplitAction;
    };

    $scope.update = function() {
      angular.copy($scope.edit, $scope.container);
      $scope.toggleEdit();
    };

    Object.defineProperty($scope, 'isLoading', {
      get: function() {
        return loaderCtrl.isStaged();
      }
    });
  })

  .controller('ContainerListController', function($scope, containerTypes) {

    var loaderCtrl;

    this.init = function(_loaderCtrl) {
      loaderCtrl = _loaderCtrl;
    };

    $scope.container = {};
    $scope.containerTypes = containerTypes;

    $scope.addContainer = function() {
      $scope.containers.push($scope.container);
      $scope.toggleAddContainer();
    };

    $scope.loadDistributed = function() {
      loaderCtrl.distribute();
    };

    $scope.toggleAddContainer = function() {
      $scope.showContainer = !$scope.showContainer;
      $scope.container = {};
    };


    this.destroy = function(container) {
      var index = $scope.containers.indexOf(container);
      $scope.containers.splice(index, 1);
    };
  })

  .directive('containerList', function() {
    return {
      restrict: 'E',
      require:  ['containerList', '^cargoLoader'],
      controller: 'ContainerListController',
      templateUrl: 'modules/container/container-list.html',
      scope: {
        containers: '=items'
      },
      link: function(scope, elem, attrs, ctrls) {
        var listCtrl = ctrls[0],
            loaderCtrl = ctrls[1];
        listCtrl.init(loaderCtrl);
      }
    };
  })

  .directive('container', function() {
    return {
      restrict: 'E',
      require: ['container', '^cargoLoader', '?^containerList'],
      scope: {
        container: '=item'
      },
      controller: 'ContainerController',
      templateUrl: 'modules/container/container.html',
      link: function(scope, elem, attrs, ctrls) {
        var containerCtrl = ctrls[0],
            loaderCtrl = ctrls[1],
            listCtrl   = ctrls[2];
        containerCtrl.init(loaderCtrl, listCtrl);
      }
    };
  })

  .directive('containerCargo', function() {
    return {
      restrict: 'E',
      scope: {
        cargo: '=item'
      },
      templateUrl: 'modules/container/container-cargo.html',
      require: '^container',
      link: function(scope, elem, attrs, containerCtrl) {

        scope.remove = function() {
          containerCtrl.unloadCargo(scope.cargo);
          scope.showActions = false;
        };

        scope.toggleActions = function() {
          scope.showActions = !scope.showActions;
        };

        scope.toggleTrimAction = function() {
          scope.showTrimAction = !scope.showTrimAction;
          scope.showActions = false;
        };

        scope.trim = function(value) {
          containerCtrl.unloadCargo(scope.cargo, value);
          scope.showTrimAction = false;
        };

        Object.defineProperty(scope, 'isSelected', {
          get: function() {
            return containerCtrl.selected === scope.cargo;
          }
        });
      }
    };
  });
