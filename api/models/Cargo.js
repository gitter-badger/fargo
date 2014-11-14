/**
* Cargo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
  schema: true,
  attributes: {
    booking:     {model: 'booking'},
    producer:    {model: 'client'},
    commodity:   {model: 'commodity'},
    type:        {type:  'string',    required: true},
    quantity:    {type:  'integer',   required: true},
    description: {type:  'string',    required: true},
    weight:      {type:  'integer',   required: true},
    minTemp:     {type:  'integer'},
    maxTemp:     {type:  'integer'},
    marking:     {type:  'text'}
  }
};
