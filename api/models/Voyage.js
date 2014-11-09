/**
* Voyage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    number: {type:  'string',   required: true},
    vessel: {type:  'string',   required: true},
    from:   {model: 'location', required: true},
    to:     {model: 'location', required: true},
    depart: {type:  'date',     required: true},
    arrive: {type:  'date',     required: true}
  }
};

