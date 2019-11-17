/**
 * LightnerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
      const user = req.user;
      const board = req.params.board;

      console.log('user is: ', user);
      console.log('board is: ', board);

      const cards = await Card.find({belong: board});
      res.status(200).send({cards});
  }

};

