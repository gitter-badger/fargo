typeof module === 'undefined' && !window.common && (window.common = {});

(function(exports) {

  var DEFAULT_ROLE = 'guest';
  var roles = {
    guest:  {
      permissions: ['public']
    },
    user: {
      inherit:      'guest',
      label:        'User',
      permissions: ['user']
    },
    admin: {
      inherit:      'user',
      label:        'Administrator',
      permissions: ['admin']
    }
  };

  function findAllPermissions(role) {
    var config = roles[role];
    var all = [].concat(config.permissions);
    if (config.inherit) {
      [].concat(config.inherit).forEach(function (r) {
        if (roles.hasOwnProperty(r)) {
          all = all.concat(findAllPermissions(r));
        } else console.log("Role Inheritance Error: Could not find role '" + r + "' as required by " + role + ".");
      });
    }
    return all;
  }

  Object.keys(roles).forEach(function (role) {
    roles[role].allPermissions = findAllPermissions(role);
  });

  // roles available for assignment to a user
  var userRoles = Object.keys(roles);
  userRoles.splice(userRoles.indexOf(DEFAULT_ROLE), 1);

  exports.roles = userRoles;
  exports.checkAccess = function (role, permission) {
    return roles[role || DEFAULT_ROLE].allPermissions.indexOf(permission) > -1;
  };

})(typeof module !== 'undefined' && module.exports ? module.exports : window.common.authorisation = {});
