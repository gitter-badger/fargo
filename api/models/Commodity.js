/**
* Commodity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var csv = require('csv');
var fs  = require('fs');

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    code:        {index: true, required: true},
    description: {index: true, required: true},
    toJSON: function() {
      var obj = this.toObject();
      obj.displayName = this.code + ' | ' + this.description;
      return obj;
    }
  },

  'import': function(cb) {
    var parser  = csv.parse();
    var tariffs = [];

    parser
      .on('readable', function () {
        var line, codes, length, i;
        while (line = parser.read()) {
          codes  = line[1].split(',');
          length = codes.length;

          for(i = 0; i < length; ++i) {
            tariffs.push({
              description: line[0],
              code: codes[i].trim()
            });
          }
        }
      })
      .on('error', function (err) {
        cb(err.message);
      })
      .on('finish', function() {
        Commodity.create(tariffs, cb);
      });

    fs.createReadStream(__dirname + '/../../csv/commodity-dev.csv').pipe(parser);
  }
};


