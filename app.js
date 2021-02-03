const path = require('path');
const express = require("express");

const videos = require('./src/videos');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

function notFoundHandler(req, res, next) {
  const title = 'Fannst ekki';
  const message = 'Ó nei, efnið finnst ekki';
  res.status(404).render('error', { title, message });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const title = 'Villa kom upp';
  const message = err.toString();
  res.status(500).render('error', { title, message });
}

app.use('/', videos);

app.use(notFoundHandler);
app.use(errorHandler);

const port = 3000;

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);