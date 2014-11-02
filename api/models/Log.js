/**
* Log.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var logTypes = [];

module.exports = {
  schema: true,
  attributes: {
    booking: {model: 'booking', required: true},
    action:  {type: 'string', enum: logTypes, required: true}
  }
};
