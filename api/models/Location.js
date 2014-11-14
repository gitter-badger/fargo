/**
* Location.js
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
    name:   {index: true},
    locode: {index: true},
    toJSON: function() {
      var obj = this.toObject();
      obj.displayName = this.locode + ' | ' + this.name + ', ' + this.country;
      return obj;
    }
  },

  'import': function(file, cb) {
    var locations = [];
    var countries = {};
    var locParser = csv.parse();
    var isoParser = csv.parse();

    isoParser
      .on('readable', function () {
        var line;
        while (line = isoParser.read()) {
          countries[line[0]] = line[1];
        }
      })
      .on('error', function (err) {
        cb(err.message);
      })
      .on('finish', function () {
        fs.createReadStream(file).pipe(locParser);
      });

    locParser
      .on('readable', function () {
        var line;
        while (line = locParser.read()) {
          var isocode = line[1],
            place = line[2],
            name  = line[3],
            func  = line[6],
            isPort, isRoad;

          if (!place) return;
          /**
           * function of location (2014)
           *
           * 1 = port, as defined in Rec. 16
           * 2 = rail terminal
           * 3 = road terminal
           * 4 = airport
           * 5 = postal exchange office
           * 6 = reserved for multimodal functions, ICD's, etc.
           * 7 = reserved for fixed transport functions (e.g. oil platform)]
           * B = border crossing
           * 0 = function not known, to be specified
           */
          isPort = func.indexOf('1') > -1;
          isRoad = func.indexOf('3') > -1;

          if (isPort || isRoad) {
            locations.push({
              isocode: isocode,
              locode:  isocode + place,
              name:    name,
              country: countries[isocode],
              port:    isPort,
              road:    isRoad
            });
          }
        }
      })
      .on('error', function (err) {
        cb(err.message);
      })
      .on('finish', function () {
        Location.create(locations, cb);
      });

    fs.createReadStream(__dirname + '/../../csv/iso3166.csv').pipe(isoParser);
  }
};

