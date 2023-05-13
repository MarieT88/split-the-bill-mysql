const conn = require('./conn');
const { INTEGER, UUID, UUIDV4, BOOLEAN, FLOAT } = conn.Sequelize;

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

});


module.exports = Split;