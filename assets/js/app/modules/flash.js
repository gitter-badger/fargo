
angular.module('fargo.flash', [])

  .factory('flash', function ($rootScope, $timeout) {

    var flash = {};
    var queue = [];

    $rootScope.alert = null;

    $rootScope.$on("$locationChangeSuccess", function() {
      if(queue.length > 0) {
        var options = queue.shift();
        flash.pop(options);
      } else {
        flash.close();
      }
    });

    flash.close = function() {
      $rootScope.alert = null;
    };

    flash.pop = function(options) {
      angular.extend(options, {
        close: function() {
          flash.close();
        }
      });
      $rootScope.alert = options;
      if(options.timeout) {
        $timeout(function(){
          flash.close();
        }, options.timeout);
      }
    };

    flash.queue = function(options) {
      queue.push(options);
    };

    return flash;
  });
