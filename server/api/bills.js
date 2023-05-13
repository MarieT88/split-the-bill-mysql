const express = require('express');
const app = express.Router();
const { Bill } = require('../db');
// route: /api/bills

module.exports = app;

//fetch
app.get('/', async(req, res, next)=> {
  try {
    res.send(await Bill.findAll());
  }
  catch(ex){
    next(ex);
  } 
});

//create
app.post('/', async(req, res, next) => {
  try{
    res.status(201).send(await Bill.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//update
app.put('/:id', async(req, res, next) => {
  try{
    const bill = await Bill.findByPk(req.params.id);
    res.send(await bill.update(req.body));
  }
  catch(ex){
    next(ex);
  }
});

//delete
app.delete('/:id', async(req, res, next) => {
  try{
    const bill = await Bill.findByPk(req.params.id);
    await bill.destroy();
    res.send(204);
  }
  catch(ex){
    next(ex);
  }
});


