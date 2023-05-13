const express = require('express');
const app = express.Router();
const { Bill, Split } = require('../db');
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


/*
//get split bill
app.get('/:billId/splits', async (req, res, next) => {
  try {
    const splits = await Split.findAll({
      where: {
        billId: req.params.billId,
      },
    });
    res.send(splits);
  } catch (ex) {
    next(ex);
  }
});

//post split bill
app.post('/:billId/splits', async (req, res, next) => {
  try {
    const split = await Split.create({
      amount: req.body.amount,
      userId: req.body.userId,
      billId: req.params.billId,
    });
    res.send(split);
  } catch (ex) {
    next(ex);
  }
});
*/
/* update split bill
app.put('/:billId/splits/:splitId', async (req, res, next) => {
  try {
    const { billId, splitId } = req.params;
    const split = await Split.findOne({
      where: {
        id: splitId,
        billId: billId,
      },
    });
    if (!split) {
      return res.status(404).send('Split not found');
    }
    const updatedSplit = await split.update(req.body);
    res.send(updatedSplit);
  } catch (ex) {
    next(ex);
  }
});*/
