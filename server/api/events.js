const express = require('express');
const app = express.Router();
const { Event } = require('../db');
// route: /api/events

module.exports = app;


app.post('/', async(req, res, next)=> {
  try {
    res.send(await Event.findAll());
  }
  catch(ex){
    next(ex);
  }
});


app.delete('/:id', async(req, res, next) => {
  try{
    const event = await Event.findByPk(req.params.id);
    await event.destroy();
    res.send(204);
  }
  catch(ex){
    next(ex);
  }
});


app.post('/', async(req, res, next) => {
  try{
    res.status(201).send(await Event.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});


app.put('/:id', async(req, res, next) => {
  try{
    const event = await Event.findByPk(req.params.id);
    res.send(await event.update(req.body));
  }
  catch(ex){
    next(ex);
  }
});