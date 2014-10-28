
angular.module('fargo')

  .directive('permission', function(Auth, ngIfDirective) {
    var ngIf = ngIfDirective[0];
    return {
      transclude: ngIf.transclude,
      priority: ngIf.priority,
      terminal: ngIf.terminal,
      restrict: ngIf.restrict,
      link: function(scope, element, attr) {
        var ngIfAttr = attr.ngIf;

        attr.ngIf = function() {
          if(ngIfAttr && !scope.$eval(ngIfAttr)) {
            return false;
          }
          return Auth.authorize(attr.permission);
        };
        ngIf.link.apply(ngIf, arguments);
      }
    };
  });
