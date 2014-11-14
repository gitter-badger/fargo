// modifies blueprint to include headers for pagination

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = function findRecords (req, res) {
  // Look up the model
  var Model    = actionUtil.parseModel(req);
  var criteria = actionUtil.parseCriteria(req);
  var limit    = actionUtil.parseLimit(req);
  var skip     = actionUtil.parseSkip(req);
  // If an `id` param was specified, use the findOne blueprint action
  // to grab the particular instance with its primary key === the value
  // of the `id` param.   (mainly here for compatibility for 0.9, where
  // there was no separate `findOne` action)
  if ( actionUtil.parsePk(req) ) {
    return require('./findOne')(req,res);
  }

  // Lookup for records that match the specified criteria
  var query = Model.find()
    .where(criteria)
    .limit(limit)
    .skip(skip)
    .sort( actionUtil.parseSort(req) );
  // TODO: .populateEach(req.options);
  query = actionUtil.populateEach(query, req);
  query.exec(function found(err, matchingRecords) {
    if (err) return res.serverError(err);

    Model.count(criteria).exec(function(err, count) {
      res.setHeader('X-Pagination-Count', count);
      res.setHeader('X-Pagination-Pages', Math.ceil(count / limit));
      res.setHeader('X-Pagination-Current', (skip / limit) + 1);
      // Only `.watch()` for new instances of the model if
      // `autoWatch` is enabled.
      if (req._sails.hooks.pubsub && req.isSocket) {
        Model.subscribe(req, matchingRecords);
        if (req.options.autoWatch) { Model.watch(req); }
        // Also subscribe to instances of all associated models
        _.each(matchingRecords, function (record) {
          actionUtil.subscribeDeep(req, record);
        });
      }

      res.ok(matchingRecords);
    });
  });
};
