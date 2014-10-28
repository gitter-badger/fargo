
angular.module('fargo')

  .provider('$socket', function() {

    'use strict';

    this.prefix = undefined;

    this.$get = function ($window, $timeout) {

      var socket = $window.io.socket,
          self = this,
          $socket = {},
          listeners = [];

      function angularify(cb) {
        return function () {
          var args = arguments;
          $timeout(function() {
            cb.apply(socket, args);
          });
        };
      }

      // prevent multiple subscriptions to the same event

      $socket.on = function(event, cb) {
        if (listeners.indexOf(event) === -1) {
          listeners.push(event);
          socket.on(event, angularify(cb));
        }
      };

      // add angularified wrappers to sails.io.js custom methods

      ['get', 'post', 'put', 'delete'].forEach(function(method) {
        $socket[method] = function(url, data, cb) {
          self.prefix && (url = self.prefix + url);
          if (cb === undefined && angular.isFunction(data)) {
            cb = data;
            data = null;
          }
          socket[method](url, data, angularify(cb));
        };
      });

      return $socket;
    };
  });
