const router = require('express').Router();
const { checkPermission } = require('../middlewares/checkPermission');
const {
  idValidation,
  cardFieldsValidation,
} = require('../utils/celebrateValidation');

const {
  find,
  findOne,
  create,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/card');

router.get('/', find);

router.post('/', cardFieldsValidation, create);

router.delete('/:cardId', idValidation, checkPermission, deleteCard);

router.put('/:cardId/likes', idValidation, findOne, addLike);

router.delete('/:cardId/likes', idValidation, findOne, deleteLike);

module.exports = router;
