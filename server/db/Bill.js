const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, FLOAT, ENUM, DATEONLY } = conn.Sequelize;


const Bill = conn.define('bill', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING
  },
  amount: {
    type: FLOAT
  },
  dueDate: {
    type: DATEONLY,
  },
  note: {
    type: TEXT
  },
  	isPaid: {
    type: BOOLEAN,
    defaultValue: false,
  },
});
   
   
Bill.createBill = async function({ name, amount, dueDate, note }, userId) {
  try {
    const bill = await Bill.create({
      name,
      amount,
      dueDate,
      note,
      userId,
    });

    return bill;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create bill.');
  }
};


module.exports = Bill;