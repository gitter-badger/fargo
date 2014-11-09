/**
* ShippingRequest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
    carrier: {model: 'client',  required: true},
    booking: {model: 'booking', required: true},
    request: {type:  'json',    required: true}
  }
};
