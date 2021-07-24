
const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');

global.DB = require('./db');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.use('/', require('./routes'));

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if (!err.status || err.status !== 404) {
    console.log(err);
  }
  res.render('error', {
    message: err.message
  });
});


module.exports = app;


//node ./bin/www