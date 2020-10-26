const User = require('../models/user');

// запрос всех юзеров
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Internal Server error: ${err}` }));
};

// запрос 1го юзера по id
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Oops, that user doesn\'t exist' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Oops, that user doesn\'t exist' });
      }
      return res.status(500).send({ message: `Internal Server error: ${err}` });
    });
};

// создание нового пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Validation error. Please type a right data!' });
      }
      return res.status(500).send({ message: `Internal Server error: ${err}` });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
