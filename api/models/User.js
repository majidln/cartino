/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    }
  },
  beforeCreate: function(values, proceed) {
    console.log('beforeCreate', values);
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log('genSalt err', err);
        return proceed(err);
      }
      console.log('salt is', salt, values.password);
      bcrypt.hash(values.password, salt, (err, hash) => {
        if (err) {
          console.log('hash err', err);
          return proceed(err);
        }
        console.log('hash hash', hash);
        values.password = hash;
        console.log('final values', values);
        return proceed();
      });
    });
  },
  comparePassword: function(password, user, cb) {
    console.log('comparePassword', password, user.password);
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return cb(err);
      }
      if (match) {
        console.log('compare matched', err, match);
        return cb(null, true);
      } else {
        return cb(err);
      }
    });
  }
};
