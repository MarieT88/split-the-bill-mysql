const conn = require('./conn');
//const { INTEGER, UUID, UUIDV4, BOOLEAN, FLOAT } = conn.Sequelize;
const { Sequelize, DataTypes } = require('sequelize');
const { UUID, UUIDV4,  BOOLEAN, FLOAT, INTEGER } = DataTypes;

const Split = conn.define('split', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	userId: {
		type: UUID,
		allowNull: false,
	},
	billId: {
		type: UUID,
		allowNull: false,
	},
	amount: {
    type: FLOAT,
    allowNull: true,
  },

},
{ tableName: 'splits' }
);


Split.beforeCreate(async (split, options) => {
  const Bill = conn.models.bill;
  const bill = await Bill.findByPk(split.billId);
  if (bill.isPaid) {
    throw new Error('Cannot add contribution to a paid bill');
  }
});

Split.afterCreate(async (split, options) => {
  const Bill = conn.models.bill;
  const bill = await Bill.findByPk(split.billId);
  const totalAmount = await Split.sum('amount', { where: { billId: bill.id } });
  if (totalAmount === bill.amount) {
    await bill.update({ isPaid: true });
  }
});


module.exports = Split;