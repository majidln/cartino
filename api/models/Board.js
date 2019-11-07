/**
 * Board.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  fetchRecordsOnUpdate: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string'
    },

    owner: {
      model: 'user'
    },

    cards: {
      collection: 'card',
      via: 'belong'
    }
  }
};
