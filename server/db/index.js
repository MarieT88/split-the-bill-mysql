const conn = require('./conn');
const User = require('./User');
const Bill = require('./Bill');
const Split = require('./Split');
const { users, bills } = require('./Data');
const { DataTypes } = require('sequelize');

// relationships between the models
Split.belongsTo(User);
Split.belongsTo(Bill);
//Bill.hasMany(Split, { onDelete: 'CASCADE' });

const syncAndSeed = async()=> {
  
  await conn.sync({ force: true });

  await Promise.all(users.map((user) => User.create(user)));
  await Promise.all(bills.map((bill) => Bill.create(bill)));
}; 


module.exports = {
  User,
  Bill,
  Split,
  syncAndSeed,
};
