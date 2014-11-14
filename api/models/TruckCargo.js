/**
* TruckCargo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
    truck:    {model: 'truck'},
    cargo:    {model: 'cargo'},
    quantity: {type: 'integer', required: true},
    weight:   {type: 'integer', required: true}
  }
};

