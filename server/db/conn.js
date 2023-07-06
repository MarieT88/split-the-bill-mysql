const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'mysql://root:mt246@!25Q876:@localhost:3306/split-the-bill');

/*const conn = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  // Other configuration options
});*/

module.exports = conn;

