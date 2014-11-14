// TODO: remove this blueprint once sails supports deep population

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var populateDeep = require('../services/populateUtil').populateDeep;

module.exports = function findOneRecordWith(populate) {

  return function findOneRecord (req, res) {
    var Model = actionUtil.parseModel(req);
    var pk = actionUtil.requirePk(req);
    var aliasFilter = req.param('populate');

    if (typeof aliasFilter === 'string') {
      aliasFilter = aliasFilter.replace(/\[|\]/g, '');
      aliasFilter = (aliasFilter) ? aliasFilter.split(',') : [];
    }

    async.waterfall([
      function(cb) {
        Model.findOne(pk).exec(cb);
      },
      function(obj, cb) {
        if (!obj) return res.notFound('No record found with the specified `id`.');
        // determine what requires population

        var associations = aliasFilter && aliasFilter.length ? aliasFilter : populate;
        populateDeep(req, Model, associations, obj, cb);
      }
    ], function(err, result) {
      if (err) return res.serverError(err);
      res.ok(result);
    });
  };
};
