const conn = require('./conn');
const User = require('./User');
const Bill = require('./Bill');
const Split = require('./Split');
const { users, bills } = require('./Data');

// relationships between the models
Split.belongsTo(User);
Split.belongsTo(Bill);

const syncAndSeed = async()=> {
  
  await conn.sync({ force: true });
  
  //await Promise.all(users.map((user) => User.create(user)));
  //await Promise.all(bills.map((bill) => Bill.create(bill)));
 // create users and bills
  const createdUsers = await Promise.all(users.map((user) => User.create(user)));
  const createdBills = await Promise.all(bills.map((bill) => Bill.create(bill)));
 
    // create splits
  const splits = [];
  createdUsers.forEach((user) => {
    createdBills.forEach((bill) => {
      splits.push({
        userId: user.id,
        billId: bill.id,
      });
    });
  });
  await Promise.all(splits.map((split) => Split.create(split)));
 const createdSplits = await Split.findAll();
 console.log(createdSplits);
 
 
 
}; 




module.exports = {
  User,
  Bill,
  Split,
  syncAndSeed,
};
