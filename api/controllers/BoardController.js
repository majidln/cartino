/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    console.log('req is', req.user);
    req.body.owner = req.user.id;
    Board.create(req.body, (err, board) => {
      if (err) {
        return res.status(400).send({ err: 'an error occured' });
      }
      console.log('fetch', err, board);
      return res.status(200).send(board);
    });
  }
};
