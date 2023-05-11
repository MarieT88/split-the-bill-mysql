const conn = require('./conn');
const User = require('./User');
const Bill = require('./Bill');
//const BillUser = require('./BillUser');
const { users, bills } = require('./Data');

// relationships between the models
//Bill.belongsToMany(User);
//User.belongsToMany(Bill);
User.hasMany(Bill);
Bill.hasMany(User);


const syncAndSeed = async()=> {
  
  await conn.sync({ force: true });
  
  //await Promise.all(users.map((user) => User.create(user)));
  await Promise.all(bills.map((bill) => Bill.create(bill)));
 
  
await Promise.all(users.map(async (user) => {
  const dbUser = await User.create(user);
  if (user.bills) {
    await Promise.all(user.bills.map(async (bill) => {
      await Bill.create({ ...bill, userId: dbUser.id });
    }));
  }
}));
  

};


module.exports = {
  User,
  Bill,
  //BillUser,
  syncAndSeed,
};
