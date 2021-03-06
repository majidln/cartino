/**
 * Card.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    front: {
      type: 'string',
      required: true
    },

    back: {
      type: 'string'
    },

    box: {
      type: 'number',
    },

    belong: {
      model: 'board'
    },

    leitner: {
      collection:'leitner',
      via: 'card'
    }
  }
};
