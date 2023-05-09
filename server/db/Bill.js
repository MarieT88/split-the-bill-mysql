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
  }
});


module.exports = Bill;