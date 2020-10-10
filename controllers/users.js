const path = require('path');
const fs = require('fs').promises;

const getAllUsers = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'))
    .then((file) => res.send(JSON.parse(file)))
    .catch((err) => res.status(500).send({ message: `Ошибка: ${err}` }));
};

const getCurrentUser = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'))
    .then((file) => {
      const user = JSON.parse((file)).find((item) => item._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: `Ошибка: ${err}` });
    });
};

module.exports = {
  getAllUsers,
  getCurrentUser,
};
