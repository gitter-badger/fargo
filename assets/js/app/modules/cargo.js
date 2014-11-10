
angular.module('fargo.cargo', [])

  .controller('CargoLoaderController', function($scope) {

    var ctrl = this, repos = [], staged = [];
    this.models = [];

    // internally a copy of the bound models is created so
    // they can be modified in isolation... the watch subsequently applies
    // the quantities on the loader using any added repos synched with it
    $scope.$watch('models', function() {
      angular.copy($scope.models, ctrl.models);
      repos.forEach(ctrl.syncRepo);
    }, true);

    this.syncRepo = function(repo, oldRepo) {
      var dupe, model, i = repo.length,
          index = repos.indexOf(repo);

      oldRepo && oldRepo !== repo && this.desyncRepo(oldRepo);
      index < 0 && repos.push(repo);
      while(i--) {
        dupe  = repo[i];
        model = pluck(ctrl.models, dupe);
        model.quantity -= dupe.quantity;
      }
    };

    this.desyncRepo = function(repo) {
      var dupe, model, i = repo.length,
          index = repos.indexOf(repo);

      index > -1 && repos.splice(index, 1);
      while(i--) {
        dupe  = repo[i];
        model = pluck(ctrl.models, dupe);
        model.quantity += dupe.quantity;
      }
    };

    this.isStaged = function(model) {
      if(model) {
        return pluck(staged, model);
      } else return staged.length;
    };

    this.toggleStaging = function(model) {
      // copy model to be staged so that subsequent operations
      // on its quantity do not influence the original value
      var i = staged.length, dupe = angular.copy(model);

      while(i--) {
        if(dupe.id === staged[i].id) {
          return staged.splice(i, 1);
        }
      }
      staged.push(dupe);
    };

    this.assignStagedTo = function(repo) {
      var i = staged.length;

      while(i--) {
        assign(staged[i], repo);
      }
      staged = [];
    };

    this.assignStagedPartiallyTo = function(repo, quantity) {
      assign(staged[0], repo, quantity);
      staged = [];
    };

    $scope.distribute = function() {
      var i, ii, model, target, quantity, excess,
        selected = staged.length,
        targets  = repos.length;

      for(i = 0; i < selected; ++i) {
        model = staged[i];
        excess = model.quantity % targets;
        quantity = Math.floor(model.quantity/targets);
        for(ii = 0; ii < targets; ++ii) {
          target = repos[ii].cargos;
          ii === targets - 1 && (quantity += excess);
          assign(model, target, quantity);
        }
      }
      staged = [];
    };

    function assign(stagedModel, dest, limit) {
      var dupe   = angular.copy(stagedModel),
          model  = pluck(ctrl.models, stagedModel),
          exists = pluck(dest, model);
      // apply quantity restriction when limit is required
      angular.isDefined(limit) && (dupe.quantity = Math.min(Number(limit) || 0, model.quantity));
      // if the staged model exists in the destination array then they are combined by
      // adding their quantities, otherwise the model is added in its entirety
      exists ? (exists.quantity += dupe.quantity) : dest.push(dupe);
    }

    function pluck(src, model) {
      for(var i = 0, length = src.length; i < length; ++i) {
        if(model.id === src[i].id) {
          return src[i];
        }
      }
    }
  })

  .directive('cargoLoader', function() {
    return {
      restrict: 'EA',
      scope: {
        models: '='
      },
      transclude: true,
      template: '<div ng-transclude></div>',
      controller: 'CargoLoaderController'
    };
  })

  .controller('CargoListController', function($scope) {
    var loaderCtrl;

    this.init = function(_loaderCtrl) {
      loaderCtrl = _loaderCtrl;
      $scope.cargos = loaderCtrl.models;
    };

    this.toggleSelected = function(model) {
      loaderCtrl.toggleStaging(model);
    };

    this.isSelected = function(model) {
      return loaderCtrl.isStaged(model);
    };
  })

  .directive('cargoList', function() {
    return {
      require: ['cargoList', '^cargoLoader'],
      restrict: 'EA',
      controller: 'CargoListController',
      templateUrl: 'modules/cargo/cargo-list.html',
      link: function (scope, elem, attr, ctrls) {
        var listCtrl = ctrls[0],
          loaderCtrl = ctrls[1];

        listCtrl.init(loaderCtrl);
      }
    };
  })

  .directive('cargo', function() {
    return {
      restrict: 'EA',
      scope: {
        cargo: '=model'
      },
      require: '^cargoList',
      templateUrl: 'modules/cargo/cargo.html',
      link: function(scope, elem, attrs, listCtrl) {

        scope.toggleSelected = function() {
          listCtrl.toggleSelected(scope.cargo);
        };

        Object.defineProperty(scope, 'isSelected', {
          get: function() {
            return listCtrl.isSelected(scope.cargo);
          }
        });
      }
    };
  })

  .controller('CargoRepositoryController', function($scope) {

    var loaderCtrl, unwatch, repo = $scope.cargos;

    this.init = function(_loaderCtrl) {
      loaderCtrl = _loaderCtrl;
      // tell the loader to factor this repo's
      // cargo into its quantity calculations
      unwatch = $scope.$watch('cargos', function(_new, _old) {
        loaderCtrl.syncRepo(_new, _old);
      }, true);
    };

    this.destroy = function() {
      loaderCtrl.desyncRepo(repo);
      unwatch();
    };

    this.unloadCargo = function(model, value) {
      value = +value || model.quantity;

      if(!value || value >= model.quantity) {
        var index = repo.indexOf(model);
        repo.splice(index, 1);
      } else {
        model.quantity -= value;
      }
      afterChange();
    };

    $scope.loadCargo = function() {
      loaderCtrl.assignStagedTo(repo);
      afterChange();
    };

    $scope.loadPartialCargo = function(quantity) {
      loaderCtrl.assignStagedPartiallyTo(repo, quantity);
      afterChange();
      $scope.toggleSplitAction();
    };

    $scope.toggleSplitAction = function() {
      $scope.showSplitAction = !$scope.showSplitAction;
    };

    Object.defineProperty($scope, 'isLoading', {
      enumerable: true,
      get: function () {
        return loaderCtrl.isStaged();
      }
    });

    function afterChange() {
      $scope.onChange && $scope.onChange();
    }
  })

  .directive('cargoRepository', function() {
    return {
      restrict: 'EA',
      require: ['cargoRepository', '^cargoLoader'],
      scope: {
        cargos:   '=models',
        onChange: '&'
      },
      controller:  'CargoRepositoryController',
      templateUrl: 'modules/cargo/repository.html',
      link: function(scope, elem, attrs, ctrls) {
        var repoCtrl   = ctrls[0],
            loaderCtrl = ctrls[1];
        repoCtrl.init(loaderCtrl);

        scope.$on('$destroy', function() {
          repoCtrl.destroy();
        });
      }
    };
  })

  .directive('repositoryCargo', function() {
    return {
      restrict: 'EA',
      scope: {
        cargo: '=model'
      },
      templateUrl: 'modules/cargo/repository-cargo.html',
      require: '^cargoRepository',
      link: function(scope, elem, attrs, repoCtrl) {

        scope.remove = function() {
          repoCtrl.unloadCargo(scope.cargo);
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
          repoCtrl.unloadCargo(scope.cargo, value);
          scope.showTrimAction = false;
        };

        Object.defineProperty(scope, 'isSelected', {
          get: function() {
            return repoCtrl.selected === scope.cargo;
          }
        });
      }
    };
  });
