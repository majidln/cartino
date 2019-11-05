/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: function(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ err: 'email and password required' });
    }

    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(401).send({ err: 'an fatal error occured' });
      }
      if (!user) {
        return res.status(401).send({ err: 'invalid email or password' });
      }

      User.comparePassword(password, user, (err, valid) => {
        console.log('return comparePassword', err, valid);
        if (err) {
          return res.status(403).send({ err: 'forbidden' });
        }

        if (!valid) {
          return res.status(401).send({ err: 'invalid email or password' });
        } else {
          res.send({
            user: user,
            token: jwToken.issue({ id: user.id })
          });
        }
      });
    });
  }
};
