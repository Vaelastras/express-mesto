const path = require('path');

const fs = require('fs').promises;

const getAllCards = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/cards.json'))
    .then((data) => res.send(JSON.parse(data)))
    .catch((err) => res.status(500).send({ message: `Ошибка: ${err}` }));
};

module.exports = getAllCards;
