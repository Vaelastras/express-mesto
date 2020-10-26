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
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Oops, that card-ID doesn\'t exist' });
      }
      return res.send((card));
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
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
