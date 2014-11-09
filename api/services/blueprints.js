var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = {

  findOne: function (req, res) {
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
        var associations = aliasFilter && aliasFilter.length ? aliasFilter : Model.associations;
        deepPopulate(req, Model, associations, obj, cb);
      }
    ], function(err, result) {
      if (err) return res.serverError(err);
      res.json(result);
    });
  },

  populate: function(req, res) {
    var Model = actionUtil.parseModel(req);
    var relation = req.options.alias;
    if (!relation || !Model) return res.serverError();

    // Allow customizable blacklist for params.
    req.options.criteria = req.options.criteria || {};
    req.options.criteria.blacklist = req.options.criteria.blacklist || ['limit', 'skip', 'sort', 'id', 'parentid'];

    var parentPk = req.param('parentid');

    // Determine whether to populate using a criteria, or the
    // specified primary key of the child record, or with no
    // filter at all.
    var childPk = actionUtil.parsePk(req);
    var where = childPk ? [childPk] : actionUtil.parseCriteria(req);

    Model
      .findOne(parentPk)
      .populate(relation, {
        where: where,
        skip:  actionUtil.parseSkip(req),
        limit: actionUtil.parseLimit(req),
        sort:  actionUtil.parseSort(req)
      })
      .exec(function found(err, matchingRecord) {
        if (err) return res.serverError(err);
        if (!matchingRecord) return res.notFound('No record found with the specified id.');
        if (!matchingRecord[relation]) return res.notFound(util.format('Specified record (%s) is missing relation `%s`', parentPk, relation));

        var association     = _.find(Model.associations, {alias: relation});
        var AssociatedModel = sails.models[association.collection];
        var associations    = filterAssociations(AssociatedModel, association.via);

        async.map(matchingRecord[relation], function(obj, cb) {
          deepPopulate(req, AssociatedModel, associations, obj, cb);
        }, function(err, result) {
          res.json(result);
        });
      });
  }
};


function filterAssociations(Model, ignore) {
  return Model.associations.filter(function (ass) {
    // omit association from parent -> child else we'll cause a loop
    return !(ass.model && ass.alias === ignore);
  });
}


function deepPopulate(req, Model, associations, obj, cb) {
  // calling toJSON (i.e. toObject) strips populated data it was not expecting, so we
  // call it prior to assigning populated fields and then work with a
  // plain object to prevent properties being stripped by the final res.json call
  if (sails.hooks.pubsub && req.isSocket) {
    Model.subscribe(req, obj);
  }
  obj = obj.toJSON();
  obj = _.cloneDeep(obj);

  async.each([].concat(associations), function (assoc, cb) {
    var AssociatedModel, associations;
    var alias = assoc.alias;

    if (assoc.type === 'model') {
      AssociatedModel = sails.models[assoc.model];
      associations = AssociatedModel.associations.filter(function (ass) {
        return ass.model !== Model.identity;
      });

      AssociatedModel.findOne(obj[alias]).exec(function (err, item) {
        if (err) return cb(err);

        deepPopulate(req, AssociatedModel, associations, item, setProperty(obj, alias, cb));
      });
    }

    if (assoc.type === 'collection') {
      AssociatedModel  = sails.models[assoc.collection];
      associations = filterAssociations(AssociatedModel, assoc.via);

      var options = {};
      options[assoc.via] = obj[Model.primaryKey];
      AssociatedModel.find(options).exec(function (err, items) {
        if (err) return cb(err);

        async.map(items, function (item, cb) {
          deepPopulate(req, AssociatedModel, associations, item, cb);
        }, setProperty(obj, alias, cb));
      });
    }
  }, function (err) {
    err ? cb(err) : cb(null, obj);
  });
}

function setProperty(obj, prop, cb) {
  return function (err, result) {
    if (err) return cb(err);

    obj[prop] = result;
    cb();
  };
}
