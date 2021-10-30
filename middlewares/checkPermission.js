const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const checkPermission = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }

      if (`${card.owner}` !== `${req.user.id}`) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      next();
    })
    .catch((err) => next(err));
};

module.exports = { checkPermission };
