/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function(req, res) {
    try {
      const user = req.user;
      const boards = await Board.find({owner: user.id});
      return res.status(200).send(boards);
    } catch(error) {
      return res.status(400);
    }
  },
  item: async function(req, res) {
    try {
      const board = await Board.findOne({id: req.params.id});
      return res.status(200).send(board);
    } catch(error) {
      return res.status(400);
    }
  },
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
