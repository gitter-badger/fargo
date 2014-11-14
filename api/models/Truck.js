/**
 * Truck.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    carrier:   {model: 'client'},
    container: {model: 'container'}, // for FCL
    booking:   {model: 'booking'},
    cargos:    {collection: 'truckcargo', owner: 'truck'},
    sent:      {type: 'json'}
  }
};
