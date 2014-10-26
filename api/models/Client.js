/**
* Client.js
*
*/

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      minLength: 3,
      maxLength: 50
    }
  }
};

