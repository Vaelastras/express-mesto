const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f953eed59efad2ed0ef0ee1', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/', routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
