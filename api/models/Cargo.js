/**
* Cargo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
    type:        {type: 'string',  required: true},
    quantity:    {type: 'integer', required: true},
    description: {type: 'string',  required: true},
    hsCode:      {type: 'string',  required: true},
    estWeight:   {type: 'integer', required: true}
  }
};

