/**
 * ContainerController
 *
 * @description :: Server-side logic for managing containers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  find: function(req, res, next) {
    res.jsonx(['one', 'two']);
  }
};

