// TODO: remove once sails supports nested populates

function setProperty(obj, prop, cb) {
  return function (err, result) {
    if (err) return cb(err);

    obj[prop] = result;
    cb();
  };
}

function populateDeep(req, Model, associations, obj, cb) {
  // subscribe when applicable
  if (sails.hooks.pubsub && req.isSocket) {
    Model.subscribe(req, obj);
  }
  // calling toJSON (i.e. toObject) strips populated data it was not expecting, so we
  // call it prior to assigning populated fields and then work with a
  // plain object to prevent properties being stripped by the final res.jsonx call
  obj = obj.toJSON();
  obj = _.cloneDeep(obj);

  if(!_.isPlainObject(associations)) {
    var object = {};

    associations.forEach(function(assoc) {
      var paths = assoc.split('.'),
        current = object;

      paths.forEach(function(path) {
        current[path] = current[path] || {};
        current = current[path];
      });
    });
    associations = object;
  }

  async.each(Object.keys(associations), function (alias, cb) {
    var AssociatedModel;
    console.log(alias);
    var assoc = _.find(Model.associations, {alias: alias});

    if (assoc.type === 'model') {
      if(!obj[alias]) return cb();

      AssociatedModel = sails.models[assoc.model];

      AssociatedModel.findOne(obj[alias]).exec(function (err, item) {
        if (err) return cb(err);
        populateDeep(req, AssociatedModel, associations[alias], item, setProperty(obj, alias, cb));
      });
    }

    if (assoc.type === 'collection') {
      AssociatedModel = sails.models[assoc.collection];

      var options = {};
      options[assoc.via] = obj[Model.primaryKey];
      AssociatedModel.find(options).exec(function (err, items) {
        if (err) return cb(err);

        async.map(items, function (item, cb) {
          populateDeep(req, AssociatedModel, associations[alias], item, cb);
        }, setProperty(obj, alias, cb));
      });
    }
  }, function (err) {
    err ? cb(err) : cb(null, obj);
  });
}

module.exports.populateDeep = populateDeep;
