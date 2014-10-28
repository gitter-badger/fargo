/**
* Label.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var labels = {
  trucker: 'Trucking Company',
  shipper: 'Shipping Line'
};


module.exports = {
  schema: true,
  attributes: {
    label:  {type: 'string',  enum: Object.keys(labels), required: true},
    client: {type: 'integer', model: 'client', columnName: 'clientId', required: true}
  }
};
