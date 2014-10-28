
angular.module('fargo.bootstrap', [])

  .directive('dateInput', function() {
    return {
      restrict: 'E',
      replace:  true,
      scope: {
        model: '=',
        required: '='
      },
      template:
        '<div class="input-group">' +
          '<input class="form-control" type="text" ng-model="model" datepicker-popup is-open="opened" ng-required="required || false">' +
          '<div class="input-group-btn">' +
            '<div class="btn btn-default" ng-click="open($event)"><glyphicon type="calendar"></glyphicon></div>' +
          '</div>' +
        '</div>',
      link: function(scope) {
        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.opened = true;
        };
      }
    };
  })

  .directive('formGroup', function() {
    var i = 0;
    return {
      restrict:   'EA',
      transclude: true,
      scope: {
        label: '@'
      },
      template: '<label class="control-label" ng-bind="label"></label>',
      compile: function(tElem, tAttrs) {
        var id = 'fg-'+(++i);
        var label = angular.element(tElem.children()[0]);
        label.attr('for', id);
        tElem.addClass('form-group');
        tAttrs.hasOwnProperty('srOnly') && label.addClass('sr-only');

        return function(scope, elem, attrs, ctrl, transclude) {
          transclude(scope.$parent, function(clone) {
            elem.append(clone);
            var input = angular.element(elem.children()[1]);
            !input.hasClass('input-group') && input.addClass('form-control');
            input.attr('id', id);
          });
        };
      }
    };
  })

  .directive('glyphicon', function() {
    return {
      restrict: 'EA',
      transclude: true,
      template: '<span class="glyphicon glyphicon-{{type || glyphicon}}"></span><span ng-transclude></span>',
      scope: {
        type: '@',
        glyphicon: '@'
      }
    };
  });
