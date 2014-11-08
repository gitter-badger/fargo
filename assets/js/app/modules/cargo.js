
angular.module('fargo.cargo', [])

  .controller('CargoLoaderController', function($scope) {

    var ctrl = this, loaders = [], staged = [];
    this.items  = [];

    // internally a copy of the bound items is created so
    // they can be modified in isolation... the watch subsequently calculates
    // the quantities on the loader using any loaders
    $scope.$watch('items', function() {
      angular.copy($scope.items, ctrl.items);
      for(var i = 0, len = loaders.length; i < len; ++i) {
        sync(loaders[i].loaded);
      }
    }, true);

    this.createLoader = function(array) {
      var loader = new Loader(array);
      loaders.push(loader);
      sync(array);
      return loader;
    };

    this.destroyLoader = function(loader) {
      for(var i = 0, len = loader.loaded.length; i < len; ++i) {
        reset(loader.loaded[i]);
      }
      var index = loaders.indexOf(loader);
      loaders.splice(index, 1);
    };

    this.distribute = function() {
      var i, ii, item, target, quantity, excess,
          selected = staged.length,
          targets  = loaders.length;

      for(i = 0; i < selected; ++i) {
        item = staged[i];
        excess = item.quantity % targets;
        quantity = Math.floor(item.quantity/targets);
        for(ii = 0; ii < targets; ++ii) {
          target = loaders[ii].loaded;
          ii === targets - 1 && (quantity += excess);
          assign(item, target, quantity);
        }
      }
      staged = [];
    };

    this.isStaged = function(item) {
      if(item) {
        return pluck(staged, item);
      } else return staged.length;
    };

    this.toggleStaging = function(item) {
      // copy item to be staged so that subsequent operations
      // on its quantity do not influence the original value
      var i, len, dupe = angular.copy(item);

      for(i = 0, len = staged.length; i < len; ++i) {
        if(dupe.id === staged[i].id) {
          return staged.splice(i, 1);
        }
      }
      staged.push(dupe);
    };

    function Loader(array) {
      this.loaded = array;
    }

    Loader.prototype.load = function() {
      for (var i = 0, len = staged.length; i < len; ++i) {
        assign(staged[i], this.loaded);
      }
      staged = [];
    };

    Loader.prototype.loadPartial = function(quantity) {
      assign(staged[0], this.loaded, quantity);
      staged = [];
    };

    Loader.prototype.unload = reset;

    function assign(stagedItem, array, limit) {
      console.log(array);
      var dupe   = angular.copy(stagedItem),
          item   = pluck(ctrl.items, stagedItem),
          exists = pluck(array, item);
      // apply quantity restriction when limit is required
      angular.isDefined(limit) && (dupe.quantity = Math.min(Number(limit) || 0, item.quantity));
      // if the staged item exists in the destination array then they are combined by
      // adding their quantities, otherwise the item is added in its entirety
      exists ? (exists.quantity += dupe.quantity) : array.push(dupe);
      // update the original quantity
      item.quantity -= dupe.quantity;
    }

    function pluck(array, item) {
      for(var i = 0, length = array.length; i < length; ++i) {
        if(item.id === array[i].id) {
          return array[i];
        }
      }
    }

    function reset(dupe, value) {
      var item = pluck(ctrl.items, dupe);
      // a passed value denotes we are applying a partial reset
      value = +value || dupe.quantity;
      item.quantity += value;
      dupe.quantity -= value;
    }

    function sync(array) {
      var i, dupe, item,
        length = array.length;

      for (i = 0; i < length; ++i) {
        dupe = array[i];
        item = pluck(ctrl.items, dupe);
        item.quantity -= dupe.quantity;
      }
    }
  })

  .directive('cargoLoader', function() {
    return {
      restrict: 'E',
      scope: {
        items: '='
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
      $scope.cargo = loaderCtrl.items;
    };

    this.toggleSelected = function(item) {
      loaderCtrl.toggleStaging(item);
    };

    this.isSelected = function(item) {
      return loaderCtrl.isStaged(item);
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
      restrict: 'E',
      scope: {
        cargo: '=item'
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
  });
