/**
* Booking.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
  schema: true,
  attributes: {
    reference:        {type: 'string'},
    requestedBy:      {model: 'user',     required: true},
    customer:         {model: 'client',   required: true},
    origin:           {model: 'location', required: true},
    destination:      {model: 'location', required: true},
    departureDate:    {type: 'date',      required: true},
    requestedDate:    {type: 'date'},
    notes:            {type: 'string'},
    customerRef:      {type: 'string'},
    shippingRef:      {type: 'string'},
    instructions:     {type: 'json'},
    cargos:           {collection: 'cargo', via: 'booking'},
    trucks:           {collection: 'truck', via: 'booking'},
    shippingRequests: {collection: 'shippingrequest', via: 'booking'},
    containers:       {collection: 'container', via: 'booking'},
    logs:             {collection: 'log', via: 'booking'}
  }
};
