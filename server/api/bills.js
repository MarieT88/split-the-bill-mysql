const express = require('express');
const app = express.Router();
const { Bill, BillUser, User } = require('../db');
const { isLoggedIn } = require('./middleware');
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
/*
app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { name, amount, dueDate, note } = req.body;
    console.log(req.body);
    const userId = req.user.id; 
    console.log(userId);
    const bill = await Bill.create({ name, amount, dueDate, note, userId });
    // create the association between the bill and the current user
    await BillUser.create({ billId: bill.id, userId: req.user.id });
    res.status(201).send(bill);
  } catch (err) {
    next(err);
  }
});
*/
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
