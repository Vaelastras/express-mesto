const router = require('express').Router();
const { getAllCards, createCard, cardDeleteById } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', cardDeleteById);

module.exports = router;
