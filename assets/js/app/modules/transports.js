
angular.module('fargo.transports', ['fargo.cargo', 'ui.bootstrap.typeahead'])

  .constant('containerTypes', [
    '40HC', '40SR', '20NB'
  ])

  .directive('containerForm', function(containerTypes) {
    return {
      restrict: 'EA',
      scope: {
        model:  '=',
        submit: '&',
        cancel: '&',
        submitLabel: '@',
        cancelLabel: '@'
      },
      templateUrl: 'modules/transports/container-form.html',
      link: function(scope) {
        scope.containerTypes = containerTypes;
      }
    };
  })

  .directive('container', function() {
    return {
      restrict: 'EA',
      scope: {
        container: '=model',
        onUpdate:  '&',
        onDestroy: '&'
      },
      templateUrl: 'modules/transports/container.html',
      link: function(scope) {

        scope.update = function() {
          angular.copy(scope.edit, scope.container);
          scope.onUpdate();
          scope.toggleEdit();
        };

        scope.toggleEdit = function() {
          if(scope.edit) {
            delete scope.edit;
          } else {
            scope.edit = angular.copy(scope.container);
          }
        };
      }
    };
  })

  .directive('truckForm', function() {
    return {
      restrict: 'EA',
      scope: {
        model:       '=',
        carriers:    '&',
        submit:      '&',
        submitLabel: '@'
      },
      templateUrl: 'modules/transports/truck-form.html'
    };
  })

  .directive('truck', function() {
    return {
      restrict: 'EA',
      scope: {
        truck:   '=model',
        confirm: '&'
      },
      templateUrl: 'modules/transports/truck.html',
      link: function(scope) {
        var original = angular.copy(scope.truck.cargos);

        scope.$watch('truck.cargos', function(cargos) {
          scope.isDirty = !angular.equals(cargos, original);
        }, true);

        scope.finalize = function() {
          original = angular.copy(scope.truck.cargos);
          scope.confirm();
          scope.isDirty = false;
        };

        scope.revertToLastSaved = function() {
          angular.copy(original, scope.truck.cargos);
        };
      }
    };
  });
