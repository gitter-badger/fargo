
angular.module('fargo')

  .factory('socket', function(socketFactory, $timeout) {

    var factory = socketFactory({
      ioSocket: io.socket
    });

    function asyncAngularify(cb) {
      return cb ? function () {
        var args = arguments;
        $timeout(function () {
          cb.apply(io.socket, args);
        }, 0);
      } : angular.noop;
    }

    // add angularified wrappers to sails.io.js custom methods

    ['get', 'post', 'put', 'delete'].forEach(function(method) {
      factory[method] = function(url, data, cb) {
        if (cb === undefined && angular.isFunction(data)) {
          cb = data;
          data = null;
        }
        io.socket[method](url, data, asyncAngularify(cb));
      };
    });

    return factory;
  });
