const express = require('express');
const app = express();
const {PORT = 3000} = process.env;
const path = require('path');
const getUsers = require('./routes/users');
const getCards = require('./routes/cards');

app.use(express.static(path.join(`${__dirname}/public`)));
app.use('/', getUsers);
app.use('/', getCards);
app.use((req, res) => {
  res.status(404).send({ message: 'Упс, запрашиваемый адрес не существует' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));