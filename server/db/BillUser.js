const conn = require('./conn');
const User = require('./User');
const Bill = require('./Bill');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;


const BillUser = conn.define('bill_user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  billId: {
    type: UUID,
    references: {
      model: Bill,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  userId: {
    type: UUID,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});


BillUser.createBillUser = async function(billId, userId) {
  try {
    const billUser = await BillUser.create({
      billId,
      userId,
    });
    return billUser;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create bill user association.');
  }
};

module.exports = BillUser;