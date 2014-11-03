/**
* Container.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
    booking: {model: 'booking'},
    type:    {model: 'containertype', required: true},
    label:   {type: 'text', required: true},
    cargos:  {collection: 'containercargo', via: 'container'}
  }
};
