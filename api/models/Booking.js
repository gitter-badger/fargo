/**
* Booking.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
  schema: true,
  attributes: {
    id:              {type: 'integer', primaryKey: true, autoIncrement: true},
    customer:        {type: 'integer', model: 'client', columnNAme: 'customerId', required: true},
    departureDate:   {type: 'date', required: true},
    departurePort:   {type: 'json', required: true},
    destinationPort: {type: 'json', required: true},
    requestedDate:   {type: 'date'},
    requestedBy:     {type: 'integer', model: 'user', columnName: 'requestedById', required: true},
    notes:           {type: 'string'},
    cargo:           {collection: 'cargo', via: 'booking'}
  }
};
