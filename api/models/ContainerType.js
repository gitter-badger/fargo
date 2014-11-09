/**
* ContainerType.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var csv = require('csv');
var fs  = require('fs');

module.exports = {
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    code:        {type: 'string', required: true},
    description: {type: 'string', required: true},
    conditions:  {type: 'json'}
  },

  'import': function(file, cb) {
    var parser = csv.parse();
    var types  = [];

    parser
      .on('readable', function () {
        var line;
        while (line = parser.read()) {
          types.push({
            code: line[0],
            description: line[1]
          });
        }
      })
      .on('error', function (err) {
        cb(err.message);
      })
      .on('finish', function() {
        ContainerType.create(types, cb);
      });

    fs.createReadStream(file).pipe(parser);
  }
};

