var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = function(req, res) {
  var Model = actionUtil.parseModel(req);
  var pk    = actionUtil.requirePk(req);

  var aliasFilter = req.param('populate');

  if (typeof aliasFilter === 'string') {
    aliasFilter = aliasFilter.replace(/\[|\]/g, '');
    aliasFilter = (aliasFilter) ? aliasFilter.split(',') : [];
  }

  Model.findOne(pk).exec(function(err, obj) {
    if (err) return res.serverError(err);
    if(!obj) return res.notFound('No record found with the specified `id`.');

    // determine what requires population
    var associations = aliasFilter && aliasFilter.length ? aliasFilter : Model.associations;

    deepPopulate(Model, associations, obj, function(err, result) {
      res.json(result);
    });
  });

  function deepPopulate(Model, associations, obj, cb) {
    // calling toJSON (i.e. toObject) strips populated data it was not expecting, so we
    // call it prior to assigning populated fields and then work with a
    // plain object to prevent properties being stripped by the final res.json call
    if (sails.hooks.pubsub && req.isSocket) {
      Model.subscribe(req, obj);
    }
    obj = obj.toJSON();
    obj = _.cloneDeep(obj);

    async.each(associations, function(assoc, cb) {
      var associatedModel;
      var alias = assoc.alias;

      if(assoc.type === 'model') {
        associatedModel = sails.models[assoc.model];
        var associations = associatedModel.associations.filter(function(ass) {
          return ass.model !== Model.identity;
        });

        associatedModel.findOne(obj[alias]).exec(function (err, item) {
          if (err) return cb(err);

          deepPopulate(associatedModel, associations, item, setProperty(obj, alias, cb));
        });
      }

      if(assoc.type === 'collection') {
        associatedModel = sails.models[assoc.collection];
        var assocations = associatedModel.associations.filter(function(ass) {
          return !(ass.model && ass.alias === assoc.via);
        });
        var options = {};
        options[assoc.via] = obj[Model.primaryKey];
        associatedModel.find(options).exec(function (err, items) {
          if (err) return cb(err);

          async.map(items, function (item, cb) {
            deepPopulate(associatedModel, assocations, item, cb);
          }, setProperty(obj, alias, cb));
        });
      }
    }, function() {
      cb(null, obj);
    });
  }

  function setProperty(obj, prop, cb) {
    return function(err, result) {
      if(err) return cb(err);

      obj[prop] = result;
      cb();
    };
  }
};
