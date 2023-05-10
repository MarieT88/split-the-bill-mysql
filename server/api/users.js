const express = require('express');
const app = express.Router();
const { User } = require('../db');
// route: /api/users

module.exports = app;

//fetch
app.get('/', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

// create
app.post('/', async(req, res, next) => {
  try{
    res.status(201).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//update
app.put('/:id', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//delete
app.delete('/:id', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(204);
  }
  catch(ex){
    next(ex);
  }
});
