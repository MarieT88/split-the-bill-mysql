const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, DATEONLY } = conn.Sequelize;


const Event = conn.define('event', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING
  },
  date: {
    type: DATEONLY
  },
  note: {
    type: TEXT
  }
});


module.exports = Event;