const conn = require('./conn');
const User = require('./User');
const Event = require('./Event');
const Bill = require('./Bill');
const { users, bills, events } = require('./Data')

// relationships between the models
User.belongsToMany(Bill, { through: 'UserBill' });
Bill.belongsToMany(User, { through: 'UserBill' });
Bill.belongsTo(Event);
Event.hasMany(Bill);
Event.belongsToMany(User, { through: 'UserEvent' });
User.belongsToMany(Event, { through: 'UserEvent' });
Event.belongsTo(User, { as: 'organizer' });



const syncAndSeed = async()=> {
  
  await conn.sync({ force: true });
  
  //await Promise.all(users.map((user) => User.create(user)));
  await Promise.all(bills.map((bill) => Bill.create(bill)));
  await Promise.all(events.map((event) => Event.create(event)));
  
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
  Event,
  Bill,
  syncAndSeed,
};
