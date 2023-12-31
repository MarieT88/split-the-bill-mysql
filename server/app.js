const express = require('express');
const app = express();
const path = require('path');
app.use(express.json({limit: '50mb'}));


app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));

app.use('/api/auth', require('./api/auth'));
app.use('/api/bills', require('./api/bills'));
app.use('/api/users', require('./api/users'));
app.use('/api/splits', require('./api/splits'));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err });
});


module.exports = app;
