

angular.module('fargo')

  .factory('User', function(Restangular) {

    var User = Restangular.all('users');

    User.findByTerm = function(term) {
      return this.getList({
        where: {
          or: [
            {firstName: {contains: term}},
            {lastName:  {contains: term}}
          ]
        },
        sort: 'lastName ASC'
      }).then(function(items) {
        return items.map(function(item) {
          return item.plain();
        });
      });
    };

    return User;
  });

