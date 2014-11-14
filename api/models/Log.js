/**
* Log.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var logTypes = {
  bookingCreated: 0
};

module.exports = {
  schema: true,
  attributes: {
    booking: {model: 'booking'},
    author:  {model: 'user'},
    action:  {type: 'integer', enum: Object.keys(_.invert(logTypes)), index: true}
  },
  actions: logTypes
};
