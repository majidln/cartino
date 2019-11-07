/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function(req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res
        .status(401)
        .send({ err: 'Format is Authorization: Bearer [token]' });
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.status(401).send({ err: 'No Authorization header was found' });
  }

  jwToken.verify(token, (err, token) => {
    if (err) {
      return res.status(401).send({ err: 'Invalid Token!' });
    }
    req.token = token; // This is the decrypted token or the payload you provided
    console.log('token is', token);
    User.findOne({ id: token.id }).exec(function findOneCB(err, found) {
      if (err) {
        res.status(401).send({ err: 'Can not fetch user' });
      }
      req.user = found;
      next();
    });
  });
};
