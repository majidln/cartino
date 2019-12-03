/**
 * CardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: function (req, res) {
        console.log('card controller', req.body);
        req.body.owner = req.user.id;
        Board.findOne({ id: req.body.belong }, (err, board) => {
            console.log('error is', err)
            if (err) {
                return res.status(400).send({ err: 'an error occured' });
            } else if (board.owner !== req.user.id) {
                return res.status(401).send({ err: 'you are not the owner of this board' });
            }
            Card.create(req.body, (err, card) => {
                if (err) {
                    return res.status(400).send(({ err: 'create card an error occured' }))
                }
                return res.status(200).send(card)
            })
        });
    }
};

