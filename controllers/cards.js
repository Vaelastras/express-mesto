// При создании карточки сервис возвращает ошибку
// со статус-кодом 500. Это связано с тем что мидлвару где вы проставляете пользователя
// вы подключаете после маршрута пользователей.
// После внесения исправления создание карточки начинает падать на ошибке валидации.
// Включение отладочного логгирования поможет вам разобраться в причинах :)

// Денис, я перенес мидлвару, но ошибка валидации воспроизводится
// только если я указываю слишком короткое имя - в остальном все ок.
// Возможно мы говорим о разных вещах? Пожалуйста проверьте еще раз, все должно работать корректно

const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Internal Server error: ${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send((card)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Validation error. Please type a right data!' });
      }
      return res.status(500).send({ message: `Internal Server error: ${err}` });
    });
};

const cardDeleteById = (req, res) => {
  console.log(req.params);
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null || undefined) {
        return res.status(404).send({ message: 'Oops, that card-ID doesn\'t exist' });
      }
      return res.send((card));
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Validation error. Please type a right data!' });
      }
      return res.status(500).send({ message: `Internal Server error: ${err}` });
    });
};

module.exports = {
  getAllCards,
  createCard,
  cardDeleteById,
};
