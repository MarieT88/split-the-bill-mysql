const express = require('express');
const app = express.Router();
const { Split, Bill } = require('../db');

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

app.delete('/:id', async(req, res, next) => {
  try{
    const split = await Split.findByPk(req.params.id);
    await split.destroy();
    res.send(204);
  }
  catch(ex){
    next(ex);
  }
});


/*
app.post('/', async (req, res, next) => {
  try {
    const { billId, userId, amount } = req.body;
    const split = await Split.create({ billId, userId, amount });

    // Update the corresponding bill
    const bill = await Bill.findByPk(billId);
    if (bill) {
      const updatedContributedUserIds = [...bill.contributedUserIds, userId];
      const updatedBill = { ...bill, contributedUserIds: updatedContributedUserIds };
      
      // Check if the remaining amount is fully covered
      if (updatedContributedUserIds.length === bill.contributedUserIds.length + 1) {
        updatedBill.isPaid = true;
        updatedBill.paidAmount = bill.amount;
      }

      await bill.update(updatedBill);
    }

    res.status(201).send(split);
  } catch (ex) {
    next(ex);
  }
});*/