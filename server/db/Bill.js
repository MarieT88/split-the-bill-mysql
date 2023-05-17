const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, FLOAT, ENUM, DATEONLY, ARRAY } = conn.Sequelize;


const Bill = conn.define('bill', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  amount: {
    type: FLOAT,
    allowNull: false,
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
  paidAmount: {
    type: FLOAT,
    defaultValue: 0,
  },
  remainingAmount: {
    type: FLOAT,
    defaultValue: this.amount,
    get() {
      return this.getDataValue('remainingAmount');
    },
  },
  contributedUserIds: {
    type: ARRAY(UUID),
    defaultValue: [],
  },
});
   

module.exports = Bill;