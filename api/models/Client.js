/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var roles = {
  trucking: 'Trucking',
  shipping: 'Shipping Line',
  producer: 'Producer',
  containerTrucking: 'Container Trucking'
};

module.exports = {
  schema: true,
  attributes: {
    name: {type: 'string', index: true, minLength: 3, maxLength: 50, required: true},
    role: {type: 'string', index: true, enum: Object.keys(roles)}
  }
};
