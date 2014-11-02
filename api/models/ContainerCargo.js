/**
* ContainerCargo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
    container: {model: 'container', required: true},
    quantity:  {type: 'integer', required: true},
    cargo:     {model: 'cargo', required: true}
  }
};

