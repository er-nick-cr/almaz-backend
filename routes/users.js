const router = require('express').Router();
const {
  idValidation,
  userFieldsValidation,
} = require('../utils/celebrateValidation');

const {
  find,
  findOne,
  findCurrentUser,
  update,
  updateAvatar,
} = require('../controllers/user');

router.get('/', find);

router.get('/me', findCurrentUser);

router.get('/:id', idValidation, findOne);

router.patch('/me', userFieldsValidation, update);

router.patch('/me/avatar', userFieldsValidation, updateAvatar);

module.exports = router;
