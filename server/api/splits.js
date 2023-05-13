const express = require('express');
const app = express.Router();
const { Split } = require('../db');

// route: /api/splits

module.exports = app;

app.get('/', async(req, res, next)=> {
  try {
    const splits = await Split.findAll();
    res.send(splits);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Split.create(req.body));
  } catch (ex) {
    next(ex);
  }
});