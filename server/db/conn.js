const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.JAWSDB_URL || 'mysql://marie:password@localhost:3306/split-the-bill?authPlugins=mysql_native_password', {
  dialect: 'mysql',
});


module.exports = conn;

