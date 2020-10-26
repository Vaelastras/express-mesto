const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;
const path = require('path');
const routes = require('./routes/index');

app.use(express.static(path.join(`${__dirname}/public`)));

app.use('/', routes);

app.use((req, res, next) => {
  req.user = {
    _id: '5f953eed59efad2ed0ef0ee1', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
