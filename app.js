const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');

const routes = require('./routes/index');

app.use(express.static(path.join(`${__dirname}/public`)));

app.use('/', routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
