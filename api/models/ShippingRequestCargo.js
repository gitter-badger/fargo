/**
* ShippingRequestCargo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    container: {type: 'string', required: true},
    quantity:  {type: 'integer', required: true},
    transfer:  {model: 'shippingrequest', required: true},
    cargo:     {model: 'cargo', required: true}
  }
};
